import { useState, useEffect } from 'react';
import { useUserContext } from '../../context/user-context';
import { Search, Plus, Trash2, Clock, Utensils } from 'lucide-react';

type NutritionItem = {
  name: string;
  calories: number;
  serving_size_g: number;
  fat_total_g: number;
  protein_g: number;
  carbohydrates_total_g: number;
  fiber_g: number;
  sugar_g: number;
};

type SearchResult = {
  items: NutritionItem[];
};

type MealEntry = {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  servingSize: number;
  timestamp: string;
};

const API_BASE_URL = 'http://localhost:3000/api';

export default function AddMeal() {
  const { addCalorieEntry } = useUserContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<NutritionItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedFoods, setSelectedFoods] = useState<NutritionItem[]>([]);
  const [servingSizes, setServingSizes] = useState<{ [key: string]: number }>({});
  const [pastLogs, setPastLogs] = useState<MealEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Search for nutrition data
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    try {
      const response = await fetch(`${API_BASE_URL}/foods/search?query=${encodeURIComponent(searchQuery)}`);
      const data: SearchResult = await response.json();
      setSearchResults(data.items || []);
    } catch (error) {
      console.error('Search failed:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Add food to selected foods
  const addFoodToSelection = (food: NutritionItem) => {
    if (!selectedFoods.find(f => f.name === food.name)) {
      setSelectedFoods([...selectedFoods, food]);
      setServingSizes({ ...servingSizes, [food.name]: 1 });
    }
  };

  // Remove food from selection
  const removeFoodFromSelection = (foodName: string) => {
    setSelectedFoods(selectedFoods.filter(f => f.name !== foodName));
    const newServingSizes = { ...servingSizes };
    delete newServingSizes[foodName];
    setServingSizes(newServingSizes);
  };

  // Update serving size
  const updateServingSize = (foodName: string, size: number) => {
    setServingSizes({ ...servingSizes, [foodName]: size });
  };

  // Calculate totals for selected foods
  const calculateTotals = () => {
    return selectedFoods.reduce((totals, food) => {
      const multiplier = servingSizes[food.name] || 1;
      return {
        calories: totals.calories + (food.calories * multiplier),
        protein: totals.protein + (food.protein_g * multiplier),
        carbs: totals.carbs + (food.carbohydrates_total_g * multiplier),
        fats: totals.fats + (food.fat_total_g * multiplier),
      };
    }, { calories: 0, protein: 0, carbs: 0, fats: 0 });
  };

  // Log the meal
  const logMeal = async () => {
    if (selectedFoods.length === 0) return;

    setIsLoading(true);
    const totals = calculateTotals();
    const today = new Date().toISOString().split('T')[0];

    try {
      // Add to Context API (for Dashboard updates)
      addCalorieEntry({
        date: today,
        calories: Math.round(totals.calories),
        protein: Math.round(totals.protein),
        carbs: Math.round(totals.carbs),
        fats: Math.round(totals.fats),
        carbonFootPrintValue: Math.round(totals.calories * 0.1), // Placeholder carbon calculation
      });

      // Save to database
      const username = 'TestUser'; // This should come from your auth system
      
      // Create a food entry for each selected food
      for (const food of selectedFoods) {
        const servingSize = servingSizes[food.name] || 1;
        
        // First, create the food in the database if it doesn't exist
        const foodResponse = await fetch(`${API_BASE_URL}/foods/from-nutrition`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nutritionData: food,
            userID: username,
          }),
        });

        if (foodResponse.ok) {
          const foodData = await foodResponse.json();
          
          // Then create the food log entry
          const logResponse = await fetch(`${API_BASE_URL}/users/${username}/foodLogs`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              logID: Date.now(), // Generate unique ID
              userID: username,
              foodID: foodData.foodID,
              servingSize: servingSize,
            }),
          });

          if (!logResponse.ok) {
            console.error('Failed to save food log entry');
          }
        }
      }

      // Add to past logs for immediate display
      const newMealEntry: MealEntry = {
        id: Date.now().toString(),
        name: selectedFoods.map(f => f.name).join(', '),
        calories: Math.round(totals.calories),
        protein: Math.round(totals.protein),
        carbs: Math.round(totals.carbs),
        fats: Math.round(totals.fats),
        servingSize: Object.values(servingSizes).reduce((sum, size) => sum + size, 0),
        timestamp: new Date().toLocaleTimeString(),
      };

      setPastLogs([newMealEntry, ...pastLogs]);
      
      // Clear selection
      setSelectedFoods([]);
      setServingSizes({});
      setSearchQuery('');
      setSearchResults([]);

      alert('Meal logged successfully!');
    } catch (error) {
      console.error('Failed to log meal:', error);
      alert('Failed to log meal. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Load past logs from database
  useEffect(() => {
    loadPastLogs();
  }, []);

  const loadPastLogs = async () => {
    try {
      // For now, we'll use mock data since we don't have user authentication set up yet
      // In a real app, you'd get the username from the logged-in user
      const username = 'TestUser'; // This should come from your auth system
      
      const response = await fetch(`${API_BASE_URL}/users/${username}/foodLogs`);
      if (response.ok) {
        const logs = await response.json();
        // Convert database logs to our format
        const formattedLogs = logs.map((log: any) => ({
          id: log.logID.toString(),
          name: log.foodName || 'Unknown Food',
          calories: log.calories || 0,
          protein: log.protein || 0,
          carbs: log.carbs || 0,
          fats: log.fats || 0,
          servingSize: log.servingSize || 1,
          timestamp: new Date(log.loggedAt).toLocaleTimeString(),
        }));
        setPastLogs(formattedLogs);
      } else {
        // Fallback to mock data if API fails
        const mockPastLogs: MealEntry[] = [
          {
            id: '1',
            name: 'Chicken Breast, Rice',
            calories: 450,
            protein: 35,
            carbs: 25,
            fats: 12,
            servingSize: 1,
            timestamp: '2:30 PM',
          },
          {
            id: '2',
            name: 'Greek Yogurt',
            calories: 120,
            protein: 15,
            carbs: 8,
            fats: 2,
            servingSize: 1,
            timestamp: '10:00 AM',
          },
        ];
        setPastLogs(mockPastLogs);
      }
    } catch (error) {
      console.error('Failed to load past logs:', error);
      // Keep existing mock data on error
    }
  };

  const totals = calculateTotals();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
          <Utensils className="mr-3 text-blue-600" />
          Add Meal
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Search and Selection */}
          <div className="space-y-6">
            {/* Food Search */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Search className="mr-2 text-blue-600" />
                Search Food
              </h2>
              
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g., 1lb chicken breast, 2 cups rice"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center"
                >
                  {isSearching ? 'Searching...' : 'Search'}
                </button>
              </div>

              {/* Search Results */}
              {searchResults.length > 0 && (
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {searchResults.map((food, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{food.name}</h3>
                        <p className="text-sm text-gray-600">
                          {Math.round(food.calories)} cal • {Math.round(food.protein_g)}g protein • {Math.round(food.carbohydrates_total_g)}g carbs
                        </p>
                      </div>
                      <button
                        onClick={() => addFoodToSelection(food)}
                        className="ml-3 p-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Selected Foods */}
            {selectedFoods.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Selected Foods</h2>
                <div className="space-y-3">
                  {selectedFoods.map((food) => (
                    <div key={food.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{food.name}</h3>
                        <div className="flex items-center gap-4 mt-1">
                          <input
                            type="number"
                            value={servingSizes[food.name] || 1}
                            onChange={(e) => updateServingSize(food.name, parseFloat(e.target.value) || 1)}
                            min="0.1"
                            step="0.1"
                            className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                          />
                          <span className="text-sm text-gray-600">servings</span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFoodFromSelection(food.name)}
                        className="ml-3 p-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Meal Totals</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Calories:</span>
                      <span className="ml-2 font-medium">{Math.round(totals.calories)}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Protein:</span>
                      <span className="ml-2 font-medium">{Math.round(totals.protein)}g</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Carbs:</span>
                      <span className="ml-2 font-medium">{Math.round(totals.carbs)}g</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Fats:</span>
                      <span className="ml-2 font-medium">{Math.round(totals.fats)}g</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={logMeal}
                  disabled={isLoading}
                  className="w-full mt-4 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 font-medium"
                >
                  {isLoading ? 'Logging Meal...' : 'Log This Meal'}
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Past Logs */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Clock className="mr-2 text-blue-600" />
              Today's Meals
            </h2>
            
            {pastLogs.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No meals logged today</p>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {pastLogs.map((log) => (
                  <div key={log.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-gray-900">{log.name}</h3>
                      <span className="text-sm text-gray-500">{log.timestamp}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-600">Calories:</span>
                        <span className="ml-1 font-medium">{log.calories}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Protein:</span>
                        <span className="ml-1 font-medium">{log.protein}g</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Carbs:</span>
                        <span className="ml-1 font-medium">{log.carbs}g</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Fats:</span>
                        <span className="ml-1 font-medium">{log.fats}g</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
