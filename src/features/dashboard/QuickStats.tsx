type QuickStatsProps = {
  caloriesToday: number;
  calorieGoal: number;
  caloriePercentage: number;
  proteinToday: number;
  todayCarbonFootprint: number;
  remainingCalories: number;
  todaySodium: number;
};

export default function QuickStats({
  caloriesToday,
  calorieGoal,
  caloriePercentage,
  proteinToday,
  todayCarbonFootprint,
  remainingCalories,
  todaySodium,
}: QuickStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
      <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-3xl p-6 text-white shadow-xl border border-blue-400/20">
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
                style={{
                  width: `${Math.min(caloriePercentage, 100)}%`,
                  backgroundColor: "cyan",
                }}
              ></div>
            </div>
          </div>
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <span className="text-3xl">🍽️</span>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-yellow-500 via-yellow-600 to-yellow-700 rounded-3xl p-6 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-yellow-100 text-sm font-semibold uppercase ">
              Protein
            </p>
            <p className="text-4xl font-bold">{proteinToday}g</p>
            <p className="text-yellow-100 text-sm">grams today</p>
            <div className="flex items-center text-sm">
              <span>🔥 Muscle Building</span>
            </div>
          </div>
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <span className="text-3xl">💪</span>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 rounded-3xl p-6 text-white shadow-xl border border-purple-400/20">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-purple-100 text-sm font-semibold uppercase tracking-wide">
              Carbon Footprint
            </p>
            <p className="text-4xl font-bold">{todayCarbonFootprint}</p>
            <p className="text-purple-200 text-sm">kg CO₂ today</p>
            <div className="flex items-center space-x-1">
              <span className="text-xs">🌍 Eco Score</span>
            </div>
          </div>
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <span className="text-3xl">🌱</span>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 rounded-3xl p-6 text-white shadow-xl  border border-orange-400/20">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-orange-100 text-sm font-semibold uppercase tracking-wide">
              Remaining
            </p>
            <p className="text-4xl font-bold">{remainingCalories}</p>
            <p className="text-orange-200 text-sm">calories left</p>
            <div className="flex items-center space-x-1">
              <span className="text-xs">⚡ Energy</span>
            </div>
          </div>
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <span className="text-3xl">⚡</span>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-3xl p-6 text-white shadow-xl  border border-red-400/20">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-red-100 text-sm font-semibold uppercase tracking-wide">
              Sodium
            </p>
            <p className="text-4xl font-bold">{todaySodium}</p>
            <p className="text-red-200 text-sm">mg today</p>
            <div className="flex items-center space-x-1">
              <span className="text-xs">🧂 Salt</span>
            </div>
          </div>
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <span className="text-3xl">🧂</span>
          </div>
        </div>
      </div>
    </div>
  );
}
