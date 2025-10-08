import {
  RadialBarChart,
  RadialBar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

const COLORS = ["#3b82f6", "#10b981", "#facc15"];

function Dashboard() {
  const user = useSelector((state: RootState) => state.user.user);
  const macroData = [
    { name: "Fat", value: user?.totalFats },
    { name: "Protein", value: user?.totalProtein },
    { name: "Carbs", value: user?.totalCarb },
  ];

  const weeklyCalories = [
    { day: user?.calorieHistory[0].date, calories: 2300 },
    { day: user?.calorieHistory[1].date, calories: 1950 },
    { day: user?.calorieHistory[2].date, calories: 2100 },
    { day: user?.calorieHistory[3].date, calories: 2500 },
    { day: user?.calorieHistory[4].date, calories: 2200 },
    { day: user?.calorieHistory[5].date, calories: 2700 },
    { day: user?.calorieHistory[6].date, calories: 2000 },
  ];
  const calorieGoal = user?.calorieGoal || 0;
  const calorieData = [
    {
      name: "Calories",
      value:
        user?.calorieHistory[user.calorieHistory.length - 1].caloriesToday || 0,
      fill: COLORS[0],
    },
  ];

  if (user) {
    console.log("User:", user);
  }

  const caloriePercentage = Math.round(
    (calorieData[0].value / calorieGoal) * 100
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-6 bg-gray-100 min-h-screen">
      {/* Calorie Progress */}
      <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-center">
        <h2 className="text-lg font-semibold mb-2">Daily Calorie Progress</h2>
        <ResponsiveContainer width="100%" height={250}>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="50%"
            outerRadius="100%"
            data={calorieData}
            startAngle={90}
            endAngle={-270}
          >
            <RadialBar dataKey="value" cornerRadius={10} fill="#3b82f6" />
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-gray-700 text-xl font-semibold"
            >
              {caloriePercentage}%
            </text>
          </RadialBarChart>
        </ResponsiveContainer>

        <p className="text-gray-600 text-sm mt-2">
          {calorieData[0].value} / {calorieGoal} kcal
        </p>
      </div>

      {/* Macronutrient Breakdown */}
      <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center">
        <h2 className="text-lg font-semibold mb-4">Macronutrient Breakdown</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={macroData}
              cx="50%"
              cy="50%"
              outerRadius={90}
              dataKey="value"
              /* label={({ name, value }) => `${name}: ${value}g`} */
            >
              {macroData.map((_entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Weekly Calorie Trend */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">Weekly Calorie Trend</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={weeklyCalories}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="day" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="calories"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Dashboard;
