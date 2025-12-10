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
  LineChart,
  Line,
  BarChart,
  Bar,
} from "recharts";
import { useUserContext } from "../../context/user-context";

//import { useSelector } from "react-redux";
//import type { RootState } from "../../store/store";

const MACRO_COLORS = ["#ef4444", "#3b82f6", "#10b981"];

function Dashboard() {
  const user = useUserContext();
  
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];
  
  // Find today's entry in calorie history
  const todayEntry = user?.calorieHistory?.find(entry => entry.date === today);
  
  const caloriesToday = todayEntry?.caloriesToday || 0;

  console.log(user);

  // const user = useSelector((state: RootState) => state.user.user);
  // Use today's values for macros, not cumulative totals
  const macroData = [
    { name: "Fat", value: todayEntry?.fatsToday || 0, color: "#ef4444" },
    { name: "Protein", value: todayEntry?.proteinToday || 0, color: "#3b82f6" },
    { name: "Carbs", value: todayEntry?.carbsToday || 0, color: "#10b981" },
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
  const todayCarbonFootprint = todayEntry?.carbonFootPrintValueToday || 0;
  const totalCarbonFootprint = user?.totalCarbonFootPrint || 0;

  // Get today's sodium
  const todaySodium = todayEntry?.sodiumToday || 0;

  // Calculate remaining calories
  const remainingCalories = Math.max(0, calorieGoal - caloriesToday);

  // Prepare sodium trend data
  const sodiumTrendData =
    user?.calorieHistory.map((entry) => ({
      day: entry.date,
      sodium: entry.sodiumToday,
    })) || [];

  // Prepare carbon footprint trend data
  const carbonTrendData =
    user?.calorieHistory.map((entry) => ({
      day: entry.date,
      carbonFootprint: entry.carbonFootPrintValueToday,
    })) || [];

  // Get current date for greeting
  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12
      ? "Good morning"
      : currentHour < 18
      ? "Good afternoon"
      : "Good evening";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
      </div>

      {/*  <div className="fixed top-6 right-6 z-50">
        <button
          onClick={() =>
            addCalorieEntry({
              name: "Test Meal",
              date: "2025-10-21",
              calories: 500,
              protein: 40,
              carbs: 45,
              fats: 12,
              sodium: 700,
              carbonFootPrintValue: 3,
            })
          }
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-semibold flex items-center space-x-2"
        >
          <span>🍽️</span>
          <span>Add Meal</span>
        </button>
      </div> */}

      <div className="relative bg-white/90 backdrop-blur-md border-b border-white/30 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-800 via-green-700 to-teal-700 bg-clip-text text-transparent hover:animate-none transition-all duration-300 hover:scale-105 drop-shadow-lg">
                {greeting}, {user?.username}! 👋
              </h1>
              <p className="text-slate-600 text-lg font-medium">
                Track your nutrition and environmental impact
              </p>
              <div className="flex items-center space-x-4 mt-3">
                <div className="flex items-center space-x-2 bg-green-100 px-3 py-1 rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-700 text-sm font-medium">
                    Live Tracking
                  </span>
                </div>
                <div className="flex items-center space-x-2 bg-blue-100 px-3 py-1 rounded-full">
                  <span className="text-blue-700 text-sm font-medium">
                    🌱 Eco-Friendly
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right space-y-2">
              <div className="text-sm text-slate-500 font-medium">
                Today's Date
              </div>
              <div className="text-xl font-bold text-slate-700 bg-white/50 px-4 py-2 rounded-xl">
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
      <div className="relative max-w-7xl mx-auto px-6 py-8">
        {/* Quick Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-3xl p-6 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-blue-400/20">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-blue-100 text-sm font-semibold uppercase tracking-wide">
                  Calories Today
                </p>
                <p className="text-4xl font-bold">{caloriesToday}</p>
                <p className="text-blue-200 text-sm">of {calorieGoal} goal</p>
                <div className="w-full bg-blue-400/30 rounded-full h-2">
                  <div
                    className="bg-white h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(caloriePercentage, 100)}%` }}
                  ></div>
                </div>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <span className="text-3xl">🔥</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700 rounded-3xl p-6 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-emerald-400/20">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-emerald-100 text-sm font-semibold uppercase tracking-wide">
                  Protein
                </p>
                <p className="text-4xl font-bold">{todayEntry?.proteinToday || 0}g</p>
                <p className="text-emerald-200 text-sm">muscle building</p>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-emerald-300 rounded-full"></div>
                  <div className="w-2 h-2 bg-emerald-300 rounded-full"></div>
                  <div className="w-2 h-2 bg-emerald-300 rounded-full"></div>
                </div>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <span className="text-3xl">💪</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 rounded-3xl p-6 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-purple-400/20">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-purple-100 text-sm font-semibold uppercase tracking-wide">
                  Carbon Footprint
                </p>
                <p className="text-4xl font-bold">{todayCarbonFootprint}</p>
                <p className="text-purple-200 text-sm">kg CO₂ today</p>
                <div className="flex items-center space-x-1">
                  <span className="text-xs">🌍</span>
                  <span className="text-xs">Eco Score</span>
                </div>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <span className="text-3xl">🌱</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 rounded-3xl p-6 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-orange-400/20">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-orange-100 text-sm font-semibold uppercase tracking-wide">
                  Remaining
                </p>
                <p className="text-4xl font-bold">{remainingCalories}</p>
                <p className="text-orange-200 text-sm">calories left</p>
                <div className="flex items-center space-x-1">
                  <span className="text-xs">⚡</span>
                  <span className="text-xs">Energy</span>
                </div>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <span className="text-3xl">⚡</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-3xl p-6 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-red-400/20">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-red-100 text-sm font-semibold uppercase tracking-wide">
                  Sodium
                </p>
                <p className="text-4xl font-bold">{todaySodium}</p>
                <p className="text-red-200 text-sm">mg today</p>
                <div className="flex items-center space-x-1">
                  <span className="text-xs">🧂</span>
                  <span className="text-xs">Salt</span>
                </div>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <span className="text-3xl">🧂</span>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-8">
          {/* Calorie Progress */}
          <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/30 p-8 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Daily Calorie Progress
              </h2>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-xl">📊</span>
              </div>
            </div>

            <div className="relative">
              <ResponsiveContainer width="100%" height={300}>
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
                    cornerRadius={12}
                    fill="url(#calorieGradient)"
                    stroke="#fff"
                    strokeWidth={3}
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
                  <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                    {caloriePercentage || 0}%
                  </div>
                  <div className="text-sm text-slate-600 mt-2 font-medium">
                    {caloriesToday} / {calorieGoal} kcal
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-100">
              <div className="flex justify-between text-sm font-semibold">
                <span className="text-slate-600">Progress</span>
                <span className="text-slate-800">{caloriePercentage}%</span>
              </div>
              <div className="mt-3 bg-slate-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-700"
                  style={{ width: `${Math.min(caloriePercentage, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Macronutrient Breakdown */}
          <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/30 p-8 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">
                Macronutrient Breakdown
              </h2>
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-xl">🥗</span>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={macroData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={130}
                  dataKey="value"
                  stroke="#fff"
                  strokeWidth={3}
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
                    borderRadius: "16px",
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={40}
                  formatter={(value) => (
                    <span className="text-slate-700 font-semibold text-sm">
                      {value}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="mt-6 space-y-4">
              {macroData.map((macro, index) => (
                <div
                  key={macro.name}
                  className="flex items-center justify-between bg-gradient-to-r from-slate-50 to-slate-100 p-3 rounded-xl"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-5 h-5 rounded-full shadow-sm"
                      style={{ backgroundColor: MACRO_COLORS[index] }}
                    ></div>
                    <span className="text-slate-700 font-semibold">
                      {macro.name}
                    </span>
                  </div>
                  <span className="text-slate-800 font-bold text-lg">
                    {macro.value}g
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Sodium Tracking Chart */}
          <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/30 p-8 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
                Sodium Tracking
              </h2>
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-xl">🧂</span>
              </div>
            </div>

            <div className="mb-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-red-600 mb-2">
                  {todaySodium}
                </div>
                <div className="text-sm text-slate-600 font-medium">
                  mg today
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  Recommended: 2,300mg
                </div>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={sodiumTrendData}>
                <defs>
                  <linearGradient
                    id="sodiumGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="day"
                  stroke="#64748b"
                  fontSize={11}
                  tickFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                      weekday: "short",
                    })
                  }
                />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip
                  formatter={(value: number) => [`${value} mg`, "Sodium"]}
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
                    borderRadius: "16px",
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="sodium"
                  stroke="#ef4444"
                  strokeWidth={3}
                  dot={{ fill: "#ef4444", strokeWidth: 2, r: 5 }}
                  activeDot={{ r: 7, stroke: "#ef4444", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>

            <div className="mt-6 bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-4 border border-red-100">
              <div className="flex items-center justify-between text-sm font-semibold">
                <span className="text-slate-600">Daily Progress</span>
                <span className="text-slate-800">
                  {Math.round((todaySodium / 2300) * 100)}%
                </span>
              </div>
              <div className="mt-3 bg-slate-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-red-500 to-red-600 h-3 rounded-full transition-all duration-700"
                  style={{
                    width: `${Math.min((todaySodium / 2300) * 100, 100)}%`,
                  }}
                ></div>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Recommended daily limit: 2,300mg
              </p>
            </div>
          </div>

          {/* Weekly Calorie Trend */}
          <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/30 p-8 hover:shadow-2xl transition-all duration-300 lg:col-span-2 xl:col-span-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                Weekly Trend
              </h2>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-xl">📈</span>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={weeklyCalories}>
                <defs>
                  <linearGradient
                    id="calorieTrendGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
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
                    borderRadius: "16px",
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="calories"
                  stroke="#8b5cf6"
                  strokeWidth={4}
                  fill="url(#calorieTrendGradient)"
                  dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 5 }}
                  activeDot={{ r: 7, stroke: "#8b5cf6", strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Enhanced Carbon Footprint Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Carbon Footprint Chart */}
          <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/30 p-8 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                Carbon Footprint Trend
              </h2>
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-xl">🌱</span>
              </div>
            </div>

            <div className="mb-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">
                  {todayCarbonFootprint}
                </div>
                <div className="text-sm text-slate-600 font-medium">
                  kg CO₂ today
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  Recommended: 4.5kg CO₂
                </div>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={carbonTrendData}>
                <defs>
                  <linearGradient
                    id="carbonGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.3} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="day"
                  stroke="#64748b"
                  fontSize={11}
                  tickFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                      weekday: "short",
                    })
                  }
                />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip
                  formatter={(value: number) => [
                    `${value} kg CO₂`,
                    "Carbon Footprint",
                  ]}
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
                    borderRadius: "16px",
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
                  }}
                />
                <Bar
                  dataKey="carbonFootprint"
                  fill="url(#carbonGradient)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>

            <div className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-100">
              <div className="flex items-center justify-between text-sm font-semibold">
                <span className="text-slate-600">Daily Progress</span>
                <span className="text-slate-800">
                  {Math.round((todayCarbonFootprint / 4.5) * 100)}%
                </span>
              </div>
              <div className="mt-3 bg-slate-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full transition-all duration-700"
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

          {/* Environmental Impact Summary */}
          <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/30 p-8 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">
                Environmental Impact
              </h2>
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-xl">🌍</span>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-green-600 mb-1">
                      {todayCarbonFootprint}
                    </div>
                    <div className="text-sm text-slate-600 font-medium">
                      kg CO₂ Today
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      Current daily impact
                    </div>
                  </div>
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                    <span className="text-2xl">📊</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-blue-600 mb-1">
                      {totalCarbonFootprint}
                    </div>
                    <div className="text-sm text-slate-600 font-medium">
                      kg CO₂ Total
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      Cumulative impact
                    </div>
                  </div>
                  <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <span className="text-2xl">📈</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-purple-600 mb-1">
                      {Math.round((todayCarbonFootprint / 4.5) * 100)}%
                    </div>
                    <div className="text-sm text-slate-600 font-medium">
                      of Daily Limit
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      Environmental goal
                    </div>
                  </div>
                  <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🎯</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl p-4 border border-slate-200">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-slate-700">
                  Eco-Friendly Status
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                {todayCarbonFootprint <= 4.5
                  ? "Great job! You're within the recommended daily carbon footprint limit."
                  : "Consider choosing more sustainable food options to reduce your environmental impact."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
