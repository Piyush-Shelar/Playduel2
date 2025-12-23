import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

/* ================= CUSTOM PIE TOOLTIP ================= */
const CustomPieTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#020617] border border-white/10 rounded-lg px-4 py-2 shadow-xl">
        <p className="text-white font-semibold">
          {payload[0].name}
        </p>
        <p className="text-[#1f5cff] text-sm">
          Questions: {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

export default function Analytics() {
  /* ================= MOCK DATA (NO PROPS) ================= */
  const categoryData = [
    { name: "AI & ML", questions: 12 },
    { name: "Cyber Security", questions: 8 },
    { name: "Space Tech", questions: 6 },
    { name: "General Knowledge", questions: 14 },
  ];

  const pieColors = [
    "#1f5cff",
    "#00bcd4",
    "#22c55e",
    "#facc15",
    "#f97316",
  ];

  return (
    <div className="w-full space-y-10">
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-3xl font-extrabold text-white">
          Analytics Dashboard
        </h1>
        <p className="text-white/60 mt-1">
          Track quiz content performance and distribution
        </p>
      </div>

      {/* ================= GRID ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* ================= BAR CHART ================= */}
        <div className="bg-[#0d1528] p-6 rounded-2xl border border-white/10">
          <h3 className="font-bold mb-4 text-white">
            Questions per Category
          </h3>

          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={categoryData}
                margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
              >
                <XAxis
                  dataKey="name"
                  stroke="#ffffff80"
                  tick={{ fontSize: 12 }}
                />
                <YAxis
                  stroke="#ffffff80"
                  allowDecimals={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#020617",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
                <Bar
                  dataKey="questions"
                  fill="#1f5cff"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ================= PIE CHART ================= */}
        <div className="bg-[#0d1528] p-6 rounded-2xl border border-white/10">
          <h3 className="font-bold mb-4 text-white">
            Category Distribution
          </h3>

          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="questions"
                  nameKey="name"
                  innerRadius={45}
                  outerRadius={90}
                  paddingAngle={4}
                  label={({ name }) => name}
                >
                  {categoryData.map((_, i) => (
                    <Cell
                      key={i}
                      fill={pieColors[i % pieColors.length]}
                    />
                  ))}
                </Pie>

                {/* 🔥 FIXED TOOLTIP */}
                <Tooltip content={<CustomPieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}
