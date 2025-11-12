import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type CarbonData = {
  day: string;
  carbonFootprint: number;
};

type CarbonImpactProps = {
  todayCarbonFootprint: number;
  totalCarbonFootprint: number;
  carbonTrendData: CarbonData[];
};

export default function CarbonImpact({
  todayCarbonFootprint,
  totalCarbonFootprint,
  carbonTrendData,
}: CarbonImpactProps) {
  // Calculate low-carbon streak (consecutive days under 4.5 kg)
  const calculateStreak = () => {
    if (carbonTrendData.length === 0) return 0;

    // Sort by date (most recent first)
    const sortedData = [...carbonTrendData].sort(
      (a, b) => new Date(b.day).getTime() - new Date(a.day).getTime()
    );

    let streak = 0;
    for (const entry of sortedData) {
      if (entry.carbonFootprint <= 4.5) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  const streak = calculateStreak();
  const averageDailyFootprint =
    carbonTrendData.length > 0
      ? carbonTrendData.reduce((sum, entry) => sum + entry.carbonFootprint, 0) /
        carbonTrendData.length
      : 0;

  // What-if calculations
  const weeklySavings10Percent = (averageDailyFootprint * 0.1 * 7).toFixed(1);
  const yearlyProjection = ((averageDailyFootprint * 365) / 1000).toFixed(2);
  const yearlyProjectionReduced = (
    (averageDailyFootprint * 0.9 * 365) /
    1000
  ).toFixed(2);

  // Real-world equivalents
  const carKmEquivalent = (todayCarbonFootprint * 3).toFixed(0);
  const treesEquivalent = Math.round(averageDailyFootprint * 2.2); // Rough estimate: 1 kg CO₂ ≈ 2.2 trees for a day

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
              <linearGradient id="carbonGradient" x1="0" y1="0" x2="0" y2="1">
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
                width: `${Math.min((todayCarbonFootprint / 4.5) * 100, 100)}%`,
              }}
            ></div>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Recommended daily limit: 4.5kg CO₂
          </p>

          {/* Real-World Equivalent */}
          <p className="text-xs text-slate-500 mt-3 italic">
            🚗 Equivalent to driving ~{carKmEquivalent} km by car today
          </p>

          {/* What-If Visualization */}
          <div className="mt-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-3 border border-blue-100">
            <p className="text-xs text-slate-600 font-medium mb-1">
              💡 What-If Impact
            </p>
            <p className="text-xs text-slate-500">
              Reducing your footprint by just 10% daily would save{" "}
              <span className="font-semibold text-blue-600">
                {weeklySavings10Percent} kg CO₂
              </span>{" "}
              this week.
            </p>
            <p className="text-xs text-slate-500 mt-1">
              📊 Your estimated yearly impact at this rate:{" "}
              <span className="font-semibold">{yearlyProjection} tons CO₂</span>
              {parseFloat(yearlyProjection) > 0 && (
                <span className="text-emerald-600">
                  {" "}
                  (or {yearlyProjectionReduced} tons with 10% reduction)
                </span>
              )}
            </p>
          </div>
        </div>
      </div>

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
                <p className="text-xs text-slate-500 mt-2 italic">
                  🚗 ~{carKmEquivalent} km by car
                </p>
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
                {carbonTrendData.length >= 7 && (
                  <p className="text-xs text-slate-500 mt-2 italic">
                    🌳 This week's impact = {treesEquivalent} trees absorbing
                    CO₂ for a day
                  </p>
                )}
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

        {/* Eco Goals / Streaks */}
        {streak > 0 && (
          <div className="mt-6 bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-4 border border-emerald-200">
            <div className="flex items-center space-x-2">
              <span className="text-lg">🌱</span>
              <span className="text-sm font-semibold text-emerald-700">
                {streak}-Day Low-Carbon Streak!
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-1">
              {averageDailyFootprint > 4.5
                ? `You're saving ~${(
                    streak *
                    (averageDailyFootprint - 4.5)
                  ).toFixed(1)} kg CO₂ compared to average. Keep it up! 🎉`
                : `Excellent! You're maintaining a low-carbon lifestyle. Keep it up! 🎉`}
            </p>
          </div>
        )}

        <div className="mt-6 bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl p-4 border border-slate-200">
          <div className="flex items-center space-x-3">
            <div
              className={`w-3 h-3 rounded-full animate-pulse ${
                todayCarbonFootprint <= 4.5 ? "bg-green-500" : "bg-orange-500"
              }`}
            ></div>
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

        {/* Personalized Reduction Suggestions */}
        {todayCarbonFootprint > 4.5 && (
          <div className="mt-4 bg-green-50 border border-green-200 rounded-2xl p-4">
            <h3 className="text-green-700 font-semibold mb-2 text-sm">
              💡 Tips to Lower Tomorrow's Impact
            </h3>
            <ul className="text-xs text-slate-600 list-disc pl-4 space-y-1">
              <li>
                Swap one meat-based meal for a vegetarian option (−1.2 kg CO₂).
              </li>
              <li>Walk or bike short trips under 2 miles (−0.5 kg CO₂).</li>
              <li>Avoid single-use plastics today (−0.3 kg CO₂).</li>
              <li>Choose locally-sourced foods when possible (−0.4 kg CO₂).</li>
            </ul>
            <p className="text-xs text-green-600 font-medium mt-2">
              Total potential savings: ~2.4 kg CO₂ per day
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
