import { useEffect, useState } from "react";
import CustomPieChart from "../Charts/CustomPieChart";

const COLORS = ["#875CF5", "#FA2C37", "#FF6900", "#4f39f6"];

export default function RecentIncomeWithChart ({ data, totalIncome }) {

    const [charData, setCharData] = useState([]);

    const prepareCharData = () => {
        const dataArr = data?.map((item) => ({
            name: item?.source,
            amount: item?.amount,
        }));

        setCharData(dataArr);
    }


    useEffect(() => {
        prepareCharData();

        return () => {};
    }, [data]);
    
    return (
        <div className="card">
            <div className="flex items-center justify-center">
                <h5 className="text-lg">Last 60 Days Income</h5>
            </div>
            <CustomPieChart
                data={charData}
                label="Total Income"
                totalAmount={`$${totalIncome}`}
                showTextAnchor
                colors={COLORS}
            />
        </div>
    )
}