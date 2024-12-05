import React, {Fragment, useEffect, useState } from "react";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Chart = () => {
    const [chartData, setChartData] = useState(null);
   
    const themeStyles = useSelector((state) => state.theme.themeStyles);
    const isDarkMode =useSelector((state)=>state.theme.isDarkMode)
   
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`https://expensetracker-ebe3e-default-rtdb.firebaseio.com/users.json`);
                const data = await response.json();

                const formattedData = Object.values(data).map(item => ({
                    username: item.username.trim(),
                    totalExpense: item.totalexpenseamount
                }));

                setChartData(formattedData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchUserData();
    }, []);

    const chartcolor=isDarkMode?{
          color:'white',
          backgroundColor:'blue',
          borderColor:'white',
          gridcolor:"rgba(200, 200, 200, 0.3)"
    }:{
      color:'black',
      backgroundColor:'pink',
      borderColor:'black',
      gridcolor:"rgba(200, 200, 200, 0.5)",
    }
             

    const data = {
        labels: chartData ? chartData.map(item => item.username) : [],
        datasets: [
            {
                label: "Total Expenses",
                data: chartData ? chartData.map(item => item.totalExpense) : [],
                backgroundColor: chartcolor.backgroundColor,
                borderColor: chartcolor.borderColor,
                color:chartcolor.color,
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
          legend: {
              display: true,
              labels: {
                  color: chartcolor.color
              },
          },
      },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                  color: chartcolor.color
              },
              grid: {
                color: chartcolor.gridcolor, 
                lineWidth: 1,                     
            },
             
        },
        x: {
          ticks: {
            color: chartcolor.color
        },
        grid: {
          color: chartcolor.gridcolor, 
          lineWidth: 1,                     
      },
  },
    }
  }

    return (
      <Fragment>
        <h4 style={{marginTop:'60px'}}>Aggregate Spending Across All Users</h4>
        <center>
        <div style={{width:'800px',height:'200px',padding:'20px'}}> 
            
            {chartData ? (
                <Bar data={data} options={options}  />
            ) : (
                <p>Loading data...</p>
            )}
        </div></center>
        </Fragment>
    );
};

export default Chart;
