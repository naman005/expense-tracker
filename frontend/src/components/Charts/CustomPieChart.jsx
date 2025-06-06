import CustomTooltip from "./CustomTooltip";
import CustomLegend from "./CustomLegend";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

export default function CustomPieChart({
    data,
    label,
    totalAmount,
    color,
    showTextAnchor
}) {
    // Define an array of colors if it's not provided
    const colors = color || ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6666'];

    return (
        <ResponsiveContainer width="100%" height={380}>
            <PieChart>
                <Pie
                    data={data}
                    dataKey="amount"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={130}
                    innerRadius={100}
                    labelLine={false}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                </Pie>
                <Tooltip content={CustomTooltip} />
                <Legend content={CustomLegend} />

                {showTextAnchor && (
                    <>
                        <text
                            x="50%"
                            y="50%"
                            dy={-25}
                            textAnchor="middle"
                            fill="#666"
                            fontSize="14px"
                        >
                            {label}
                        </text>
                        <text
                            x="50%"
                            y="50%"
                            dy={8}
                            textAnchor="middle"
                            fill="#333"
                            fontSize="24px"
                            fontWeight="semi-bold"
                        >
                            {totalAmount}
                        </text>
                    </>
                )}
            </PieChart>
        </ResponsiveContainer>
    );
}
