import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type SodiumData = {
  day: string;
  sodium: number;
};

type SodiumBreakdownProps = {
  todaySodium: number;
  sodiumTrendData: SodiumData[];
};

export default function SodiumBreakdown({
  todaySodium,
  sodiumTrendData,
}: SodiumBreakdownProps) {
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border-solid border-4 border-red-600 p-8 hover:shadow-2xl transition-all duration-300">
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
          <div className="text-sm text-slate-600 font-medium">mg today</div>
          <div className="text-xs text-slate-500 mt-1">
            Recommended: 2,300mg
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={sodiumTrendData}>
          <defs>
            <linearGradient id="sodiumGradient" x1="0" y1="0" x2="0" y2="1">
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
  );
}
