import { useEffect, useState } from "react"
import { prepareExpenseBarChartData } from "../../utlis/helper";
import CustomBarChart from "../Charts/CustomBarChart";

export default function Previous30DaysTransactions ({ data }){
    
    const [charData, setCharData] = useState([]);

    useEffect(() => {
        const result = prepareExpenseBarChartData(data);
        setCharData(result);
    }, [data])
    
    return (
        <div className="card col-span-1">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Last 30 Days Expenses</h5>
            </div>
            <CustomBarChart data={charData} />
        </div>
    )
}