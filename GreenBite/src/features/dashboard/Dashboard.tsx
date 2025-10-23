import {
  RadialBarChart,
  RadialBar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import { useUserContext } from "../../context/user-context";

//import { useSelector } from "react-redux";
//import type { RootState } from "../../store/store";

const MACRO_COLORS = ["#ef4444", "#3b82f6", "#10b981"];

function Dashboard() {
  const user = useUserContext();
  const { addCalorieEntry } = user;
  const caloriesToday =
    user?.calorieHistory[user.calorieHistory.length - 1].caloriesToday;

  console.log(user);

  // const user = useSelector((state: RootState) => state.user.user);
  const macroData = [
    { name: "Fat", value: user?.totalFats, color: "#ef4444" },
    { name: "Protein", value: user?.totalProtein, color: "#3b82f6" },
    { name: "Carbs", value: user?.totalCarbs, color: "#10b981" },
  ];

  const weeklyCalories: { day: string; calories: number }[] = [];

  if (user?.calorieHistory) {
    for (let i = 0; i < user.calorieHistory.length; i++) {
      weeklyCalories.push({
        day: user.calorieHistory[i].date,
        calories: user.calorieHistory[i].caloriesToday,
      });
    }
  }

  const calorieGoal = user?.calorieGoal || 0;
  const caloriePercentage = Math.round((caloriesToday / calorieGoal) * 100);

  // Get today's carbon footprint
  const todayCarbonFootprint =
    user?.calorieHistory[user.calorieHistory.length - 1]
      ?.carbonFootPrintValueToday || 0;
  const totalCarbonFootprint = user?.totalCarbonFootPrint || 0;

  // Calculate remaining calories
  const remainingCalories = Math.max(0, calorieGoal - caloriesToday);

  // Get current date for greeting
  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12
      ? "Good morning"
      : currentHour < 18
      ? "Good afternoon"
      : "Good evening";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <button
        onClick={() =>
          addCalorieEntry({
            name: "Surrac was guui",
            date: "2025-10-21", // change date to test new entries
            calories: 500,
            protein: 40,
            carbs: 45,
            fats: 12,
            sodium: 700,
            carbonFootPrintValue: 3,
          })
        }
      >
        Add Meal
      </button>
      {/* Header Section */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                {greeting}, {user?.username}! 👋
              </h1>
              <p className="text-slate-600 mt-1">
                Track your nutrition and environmental impact
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-slate-500">Today's Date</div>
              <div className="text-lg font-semibold text-slate-700">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Quick Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">
                  Calories Today
                </p>
                <p className="text-3xl font-bold">{caloriesToday}</p>
                <p className="text-blue-200 text-sm">of {calorieGoal} goal</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">🔥</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-sm font-medium">Protein</p>
                <p className="text-3xl font-bold">{user?.totalProtein}g</p>
                <p className="text-emerald-200 text-sm">muscle building</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">💪</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">
                  Carbon Footprint
                </p>
                <p className="text-3xl font-bold">{todayCarbonFootprint}</p>
                <p className="text-purple-200 text-sm">kg CO₂ today</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">🌱</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Remaining</p>
                <p className="text-3xl font-bold">{remainingCalories}</p>
                <p className="text-orange-200 text-sm">calories left</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">⚡</span>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {/* Calorie Progress */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-800">
                Daily Calorie Progress
              </h2>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-lg">📊</span>
              </div>
            </div>

            <div className="relative">
              <ResponsiveContainer width="100%" height={280}>
                <RadialBarChart
                  cx="50%"
                  cy="50%"
                  innerRadius="60%"
                  outerRadius="90%"
                  data={[
                    {
                      name: "Calories",
                      value: caloriesToday,
                      fill: "#3b82f6",
                    },
                  ]}
                  startAngle={90}
                  endAngle={-270}
                >
                  <RadialBar
                    dataKey="value"
                    cornerRadius={8}
                    fill="url(#calorieGradient)"
                    stroke="#fff"
                    strokeWidth={2}
                  />
                  <defs>
                    <linearGradient
                      id="calorieGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#1d4ed8" />
                    </linearGradient>
                  </defs>
                </RadialBarChart>
              </ResponsiveContainer>

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-slate-800">
                    {caloriePercentage}%
                  </div>
                  <div className="text-sm text-slate-600 mt-1">
                    {caloriesToday} / {calorieGoal} kcal
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Progress</span>
                <span className="font-semibold text-slate-800">
                  {caloriePercentage}%
                </span>
              </div>
              <div className="mt-2 bg-slate-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(caloriePercentage, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Macronutrient Breakdown */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-800">
                Macronutrient Breakdown
              </h2>
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center">
                <span className="text-white text-lg">🥗</span>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={macroData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  dataKey="value"
                  stroke="#fff"
                  strokeWidth={2}
                >
                  {macroData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={MACRO_COLORS[index % MACRO_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => [`${value}g`, "Amount"]}
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    border: "none",
                    borderRadius: "12px",
                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  formatter={(value) => (
                    <span className="text-slate-700 font-medium">{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="mt-6 space-y-3">
              {macroData.map((macro, index) => (
                <div
                  key={macro.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: MACRO_COLORS[index] }}
                    ></div>
                    <span className="text-slate-700 font-medium">
                      {macro.name}
                    </span>
                  </div>
                  <span className="text-slate-800 font-semibold">
                    {macro.value}g
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Calorie Trend */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 lg:col-span-2 xl:col-span-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-800">Weekly Trend</h2>
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-lg">📈</span>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={weeklyCalories}>
                <defs>
                  <linearGradient
                    id="calorieTrendGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="day"
                  stroke="#64748b"
                  fontSize={12}
                  tickFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                      weekday: "short",
                    })
                  }
                />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip
                  formatter={(value: number) => [`${value} kcal`, "Calories"]}
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "short",
                      day: "numeric",
                    })
                  }
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    border: "none",
                    borderRadius: "12px",
                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="calories"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  fill="url(#calorieTrendGradient)"
                  dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: "#8b5cf6", strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Carbon Footprint Tracking */}
        <div className="mt-8 bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-800">
              Environmental Impact
            </h2>
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
              <span className="text-white text-lg">🌍</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {todayCarbonFootprint}
              </div>
              <div className="text-sm text-slate-600 mt-1">kg CO₂ Today</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">
                {totalCarbonFootprint}
              </div>
              <div className="text-sm text-slate-600 mt-1">kg CO₂ Total</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">
                {Math.round((todayCarbonFootprint / 4.5) * 100)}%
              </div>
              <div className="text-sm text-slate-600 mt-1">of Daily Limit</div>
            </div>
          </div>

          <div className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">
                Daily Carbon Footprint Progress
              </span>
              <span className="font-semibold text-slate-800">
                {Math.round((todayCarbonFootprint / 4.5) * 100)}%
              </span>
            </div>
            <div className="mt-2 bg-slate-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(
                    (todayCarbonFootprint / 4.5) * 100,
                    100
                  )}%`,
                }}
              ></div>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Recommended daily limit: 4.5kg CO₂
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
