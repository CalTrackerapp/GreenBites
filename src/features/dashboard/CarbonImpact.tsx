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
  );
}

