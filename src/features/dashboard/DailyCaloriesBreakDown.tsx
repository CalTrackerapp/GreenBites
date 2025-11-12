import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";

type DailyCaloriesBreakDownProps = {
  caloriesToday: number;
  calorieGoal: number;
  caloriePercentage: number;
};

export default function DailyCaloriesBreakDown({
  caloriesToday,
  calorieGoal,
  caloriePercentage,
}: DailyCaloriesBreakDownProps) {
  return (
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
  );
}
