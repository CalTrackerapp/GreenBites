import { useUserContext } from "../../context/user-context";
import DashboardHeader from "./DashboardHeader";
import QuickStats from "./QuickStats";
import DailyCaloriesBreakDown from "./DailyCaloriesBreakDown";
import MacroNutrientsBreakdown from "./MacroNutrientsBreakdown";
import SodiumBreakdown from "./SodiumBreakdown";
import WeeklyCaloriesTrend from "./WeeklyCaloriesTrend";
import CarbonImpact from "./CarbonImpact";

function Dashboard() {
  const user = useUserContext();
  const caloriesToday = user.calorieHistory[user.calorieHistory.length - 1]
    ? user.calorieHistory[user.calorieHistory.length - 1].caloriesToday
    : 0;

  const macroData = [
    { name: "Fat", value: user?.totalFats || 0, color: "#ef4444" },
    { name: "Protein", value: user?.totalProtein || 0, color: "#3b82f6" },
    { name: "Carbs", value: user?.totalCarbs || 0, color: "#10b981" },
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
      ?.carbonFootPrintToday || 0;
  const totalCarbonFootprint = user?.totalCarbonFootPrint || 0;

  // Get today's sodium
  const todaySodium =
    user?.calorieHistory[user.calorieHistory.length - 1]?.sodiumToday || 0;

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
      carbonFootprint: entry.carbonFootPrintToday,
    })) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br  from-emerald-500 via-emerald-800 to-indigo-600 relative overflow-hidden ">
      {/*   <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
      </div> */}

      <DashboardHeader username={user?.username || ""} />

      <div className="relative max-w-7xl mx-auto px-6 py-8">
        <QuickStats
          caloriesToday={caloriesToday}
          calorieGoal={calorieGoal}
          caloriePercentage={caloriePercentage}
          totalProtein={user?.totalProtein || 0}
          todayCarbonFootprint={todayCarbonFootprint}
          remainingCalories={remainingCalories}
          todaySodium={todaySodium}
        />

        {/* Charts Grid */}
        <div className="grid grid-cols-1  gap-8 mb-8">
          <DailyCaloriesBreakDown
            caloriesToday={caloriesToday}
            calorieGoal={calorieGoal}
            caloriePercentage={caloriePercentage}
          />

          <MacroNutrientsBreakdown macroData={macroData} />

          <SodiumBreakdown
            todaySodium={todaySodium}
            sodiumTrendData={sodiumTrendData}
          />

          <WeeklyCaloriesTrend weeklyCalories={weeklyCalories} />
        </div>

        <CarbonImpact
          todayCarbonFootprint={todayCarbonFootprint}
          totalCarbonFootprint={totalCarbonFootprint}
          carbonTrendData={carbonTrendData}
        />
      </div>
    </div>
  );
}

export default Dashboard;
