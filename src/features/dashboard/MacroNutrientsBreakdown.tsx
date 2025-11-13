import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const MACRO_COLORS = ["#ef4444", "#3b82f6", "#10b981"];

type MacroData = {
  name: string;
  value: number;
  color: string;
};

type MacroNutrientsBreakdownProps = {
  macroData: MacroData[];
};

export default function MacroNutrientsBreakdown({
  macroData,
}: MacroNutrientsBreakdownProps) {
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border-solid border-4 border-green-700 p-8 hover:shadow-2xl transition-all duration-300">
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
            stroke="white/80"
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
              <span className="text-slate-700 font-semibold">{macro.name}</span>
            </div>
            <span className="text-slate-800 font-bold text-lg">
              {macro.value}g
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
