import express from 'express';
const app = express();

app.use(express.json());

// Add CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Nutrition API integration
const NUTRITION_API_KEY = '3E9YfbcWaIFwspwgXs5oVg==vyJeVpWtQfKfjOkZ';
const NUTRITION_API_URL = 'https://api.calorieninjas.com/v1/nutrition';

// Simple test route
app.get('/api/foods/search', async (req, res) => {
  console.log('Search query:', req.query.query);
  
  try {
    // Call the real nutrition API
    const response = await fetch(`${NUTRITION_API_URL}?query=${encodeURIComponent(req.query.query)}`, {
      headers: {
        'X-Api-Key': NUTRITION_API_KEY
      }
    });
    
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Nutrition API response:', data);
    res.json(data);
  } catch (error) {
    console.error('Nutrition API error:', error);
    res.status(500).json({ error: 'Failed to fetch nutrition data' });
  }
});

// Create food from nutrition data
app.post('/api/foods/from-nutrition', (req, res) => {
  const { nutritionData, userID } = req.body;
  console.log('Creating food from nutrition data:', nutritionData.name);
  
  // Generate a unique foodID
  const foodID = `${nutritionData.name.toLowerCase().replace(/\s+/g, '_')}_${Date.now()}`;
  
  // Mock response - in real app, this would save to database
  const foodData = {
    foodID,
    name: nutritionData.name,
    calories: Math.round(nutritionData.calories),
    fatInGrams: Math.round(nutritionData.fat_total_g),
    proteinInGrams: Math.round(nutritionData.protein_g),
    carbsInGrams: Math.round(nutritionData.carbohydrates_total_g),
    CO2Expense: Math.round(nutritionData.calories * 0.1), // Placeholder
  };
  
  res.json(foodData);
});

// Get user's food logs
app.get('/api/users/:username/foodLogs', (req, res) => {
  const { username } = req.params;
  console.log('Getting food logs for user:', username);
  
  // Mock response - in real app, this would query the database
  const mockLogs = [
    {
      logID: 1,
      userID: username,
      foodID: 'chicken_breast_123',
      foodName: 'Chicken Breast',
      calories: 450,
      protein: 35,
      carbs: 25,
      fats: 12,
      servingSize: 1,
      loggedAt: new Date().toISOString(),
    },
    {
      logID: 2,
      userID: username,
      foodID: 'greek_yogurt_456',
      foodName: 'Greek Yogurt',
      calories: 120,
      protein: 15,
      carbs: 8,
      fats: 2,
      servingSize: 1,
      loggedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
    },
  ];
  
  res.json(mockLogs);
});

// Create food log entry
app.post('/api/users/:username/foodLogs', (req, res) => {
  const { username } = req.params;
  const { logID, userID, foodID, servingSize } = req.body;
  console.log('Creating food log entry:', { username, logID, foodID, servingSize });
  
  // Mock response - in real app, this would save to database
  const newLog = {
    logID,
    userID,
    foodID,
    servingSize,
    loggedAt: new Date().toISOString(),
  };
  
  res.json(newLog);
});

app.get('/', (req, res) => {
  res.send('Test server is running!');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Test server listening on port ${PORT}`);
  console.log(`Try: http://localhost:${PORT}/api/foods/search?query=chicken`);
});
