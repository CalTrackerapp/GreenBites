import { useUserContext } from "../../context/use-user-context";
import DashboardHeader from "./DashboardHeader";
import QuickStats from "./QuickStats";
import DailyCaloriesBreakDown from "./DailyCaloriesBreakDown";
import MacroNutrientsBreakdown from "./MacroNutrientsBreakdown";
import SodiumBreakdown from "./SodiumBreakdown";
import WeeklyCaloriesTrend from "./WeeklyCaloriesTrend";
import CarbonImpact from "./CarbonImpact";
import { useUser } from "@clerk/clerk-react";

function Dashboard() {
  const user = useUserContext();
  const firstName = useUser().user?.firstName || "User";
  const caloriesToday = user.calorieHistory[user.calorieHistory.length - 1]
    ? user.calorieHistory[user.calorieHistory.length - 1].caloriesToday
    : 0;
  const macroData = [
    { name: "Fat", value: user?.totalFats || 0, color: "#ef4444" },
    { name: "Protein", value: user?.totalProtein || 0, color: "#3b82f6" },
    { name: "Carbs", value: user?.totalCarbs || 0, color: "#10b981" },
  ];

  const weeklyCalories: { day: string; calories: number }[] = [];

  if (user.calorieHistory.length > 0) {
    for (let i = user.calorieHistory.length - 1; i >= 0; i--) {
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

  const todayProtein =
    user?.calorieHistory[user.calorieHistory.length - 1]?.proteinToday || 0;

  const totalCarbonFootprint = user?.totalCarbonFootPrint || 0;

  // Get today's sodium
  const todaySodium =
    user?.calorieHistory[user.calorieHistory.length - 1]?.sodiumToday || 0;

  // Calculate remaining calories
  const remainingCalories = Math.max(0, calorieGoal - caloriesToday);

  // Prepare sodium trend data
  const sodiumTrendData: { day: string; sodium: number }[] = [];

  if (user.calorieHistory.length > 0) {
    for (let i = user.calorieHistory.length - 1; i >= 0; i--) {
      sodiumTrendData.push({
        day: user.calorieHistory[i].date,
        sodium: user.calorieHistory[i].sodiumToday,
      });
    }
  }

  // Prepare carbon footprint trend data
  const carbonTrendData: { day: string; carbonFootprint: number }[] = [];
  if (user.calorieHistory.length > 0) {
    for (let i = user.calorieHistory.length - 1; i >= 0; i--) {
      carbonTrendData.push({
        day: user.calorieHistory[i].date,
        carbonFootprint: user.calorieHistory[i].carbonFootPrintToday,
      });
    }
  }

  return (
    <main className=" bg-gradient-to-br  from-green-700 via-indigo-800 to-green-400 ">
      {/*   <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
      </div> */}

      <DashboardHeader username={firstName || ""} />

      <div className="relative max-w-7xl mx-auto px-6 py-8">
        <section className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
            <h2 className="text-3xl font-bold text-white drop-shadow-lg flex items-center gap-3">
              <span className="text-4xl">📊</span>
              <span className="bg-gradient-to-r from-white via-blue-100 to-green-100 bg-clip-text text-transparent">
                Quick Stats
              </span>
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
          </div>

          <QuickStats
            caloriesToday={caloriesToday}
            calorieGoal={calorieGoal}
            caloriePercentage={caloriePercentage}
            proteinToday={todayProtein}
            todayCarbonFootprint={todayCarbonFootprint}
            remainingCalories={remainingCalories}
            todaySodium={todaySodium}
          />
        </section>

        <section className="mt-16 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
            <h2 className="text-3xl font-bold text-white drop-shadow-lg flex items-center gap-3">
              <span className="text-4xl">📈</span>
              <span className="bg-gradient-to-r from-white via-blue-100 to-green-100 bg-clip-text text-transparent">
                Analytics & Trends
              </span>
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
          </div>

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
        </section>

        <section className="mt-16 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
            <h2 className="text-3xl font-bold text-white drop-shadow-lg flex items-center gap-3">
              <span className="text-4xl">🌱</span>
              <span className="bg-gradient-to-r from-white via-green-100 to-emerald-100 bg-clip-text text-transparent">
                Carbon Impact
              </span>
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
          </div>

          <CarbonImpact
            todayCarbonFootprint={todayCarbonFootprint}
            totalCarbonFootprint={totalCarbonFootprint}
            carbonTrendData={carbonTrendData}
          />
        </section>
      </div>
    </main>
  );
}

export default Dashboard;
