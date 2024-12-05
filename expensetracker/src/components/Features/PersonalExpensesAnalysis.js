import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";

ChartJS.register(ArcElement,Tooltip, Legend);

const PersonalExpChart = () => {
    const [userdata, setUserData] = useState(null);
    const userId = useSelector((state) => state.auth.userId);
    const {themeStyles}=useSelector((state)=>state.theme)

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(
                    `https://expensetracker-ebe3e-default-rtdb.firebaseio.com/users/${userId}/expenses.json`
                );
                const data = await response.json();
                if (response.ok && data) {
                    const aggregatedData = Object.values(data).reduce((acc, item) => {
                        if (!acc[item.category]) {
                            acc[item.category] = { category: item.category, amount: 0 };
                        }
                        acc[item.category].amount += item.amount;
                        return acc;
                    }, {});

                    const result = Object.values(aggregatedData);
                    setUserData(result);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchUserData();
    }, [userId]);

    const chartColors = {
        backgroundColor: ['green','yellow','blue','red','purple','orange','pink','grey'],
        borderColor: ['green','yellow','blue','red','purple','orange','pink','grey'],
    };

    const data = {
        labels: userdata ? userdata.map((item) => item.category) : [],
        datasets: [
            {
                data: userdata ? userdata.map((item) => item.amount) : [],
                backgroundColor: chartColors.backgroundColor,
                borderColor: chartColors.borderColor,
                borderWidth: 1,
            },
        ],
    };

    return (
        <div style={themeStyles}>
            <h1 style={{marginTop:'40px'}}>Welcome</h1>
            <center>
            <div style={{width:400,height:400}}>
            {userdata && userdata.length > 0 ? (
                <Pie data={data} />
            ) : (
                <p>Loading data or no expenses available...</p>
            )}
            </div>
            </center>
        </div>
    );
};

export default PersonalExpChart;
