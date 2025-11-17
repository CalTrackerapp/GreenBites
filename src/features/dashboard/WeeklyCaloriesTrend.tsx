import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type WeeklyCalorieData = {
  day: string;
  calories: number;
};

type WeeklyCaloriesTrendProps = {
  weeklyCalories: WeeklyCalorieData[];
};

export default function WeeklyCaloriesTrend({
  weeklyCalories,
}: WeeklyCaloriesTrendProps) {
  return (
    /*   lg:col-span-2 xl:col-span-1 */
    <div className="bg-white/80 rounded-3xl border-solid border-4 border-purple-600 p-8 ">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
          Weekly Trend
        </h2>
        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
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
  );
}
