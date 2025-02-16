
import React from 'react';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import ReviewsIcon from '@mui/icons-material/Reviews';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, defaults } from 'chart.js';
import { Line } from "react-chartjs-2";










const Achievement = () => {

    const users = {
        title: "Total Users",
        icons: <AccountCircleIcon />,
        number: 277,
        rate: 25,
        trending: <TrendingUpIcon sx={{ fontSize: "190px", fontWeight: "bolder" }} />


    }

    const Orders = {
        title: "Total Orders",
        icons: <ShoppingCartIcon />,
        number: 277,
        rate: 25,
        trending: <TrendingDownIcon sx={{ fontSize: "190px", fontWeight: "bolder" }} />

    }
    const Products = {
        title: "Total Orders",
        icons: <ShoppingBagIcon />,
        number: 277,
        rate: 25,
        trending: <TrendingDownIcon sx={{ fontSize: "190px", fontWeight: "bolder" }} />

    }

    const Reviews = {
        title: "Total Reviews",
        icons: <ReviewsIcon />,
        number: 277,
        rate: 25,
        trending: <TrendingUpIcon sx={{ fontSize: "190px", fontWeight: "bolder" }} />
    }

    


    return (
        <div className={`middle-main-component mt-5 p-4`}>
            <div className='mid-bar ' >
                <MidBox color={["#1da256", "#48d483"]} data={users} />
                <MidBox color={["#c012e2", "#eb64fe"]} data={Orders} />
                <MidBox color={["#1a50b5", "#2a6ff7"]} rowExpand={"span 2"} />
                <MidBox color={["#2c78e5", "#60aff5"]} data={Products} />
                <MidBox color={["#e1950e", "#f3cd29"]} data={Reviews} />

            </div>




        </div>

    )
}



export const MidBox = ({ color, rowExpand, data }) => {
    return (
        <>
            <div className={rowExpand ? rowExpand : 'Mid-box'} style={{ backgroundImage: ` linear-gradient(to right,${color?.[0]}, ${color?.[1]} )`, borderRadius: "10px", gridRow: rowExpand }}>
                {
                    !rowExpand && <div className="items flex justify-between h-full p-3" style={{ position: "relative" }}>

                        <div className='flex flex-col justify-between p-1' style={{ height: "100%" }}>
                            <div className='flex flex-col'>
                                <span style={{ fontSize: "19px", color: "#fff ", fontWeight: "600" }}>{data?.title}</span>
                                <span style={{ fontSize: "33px ", color: "#fff ", fontWeight: "bold" }}>{data?.number}</span>
                            </div>

                            <div className="flex items-center gap-x-2" style={{ color: "#fff" }}>
                                <span style={{ padding: "4px 10px", fontSize: "12px", background: "#0004", borderRadius: "3px" }}>+{data?.rate}%</span>
                                <span>Last Month</span>
                            </div>

                        </div>

                        <div className='flex flex-col justify-around items-end gap'>
                            <p className='p-3' style={{ backgroundColor: "#0002", borderRadius: "6px", color: "#fff8" }}>{data?.icons}</p>
                            <MoreVertIcon sx={{ fontSize: "30px", color: "#fff7" }} />
                        </div>

                        <p style={{ position: "absolute", top: "10px", left: "5px", height: "155px", color: "#0001" }}>
                            {
                                data?.trending
                            }
                        </p>
                    </div>
                }


                {
                    rowExpand && <div className='flex flex-col gap-y-1 p-5 w-[100%]'>
                        <div className='flex justify-between items-center gap-x-1'>
                            <p style={{ color: "#fff", fontSize: "14px !important", fontWeight: "bold" }}>Total Sales</p>
                            <MoreVertIcon sx={{ color: "#fff" }} />
                        </div>
                        <div className='flex gap-x-1 items-end mt-2'>
                            <span style={{ fontSize: "33px", color: "#fff", fontWeight: "bold" }}>$3895624</span>
                            <span style={{ fontSize: "14px", color: "white", opacity: "0.8", fontWeight: "bold", }}>40.63%</span>
                            <TrendingUpIcon sx={{ color: "#fff", fontSize: "18px", fontWeight: "bold" }} />
                        </div>
                        <div>
                            <span style={{ fontSize: "13px", color: "#fff9", }}>$35879 in last month</span>
                        </div>

                        <div className='mt-10'>
                            <ChartComponent />
                        </div>


                    </div>
                }


            </div>

        </>
    )
}




export const ChartComponent = () => {

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );

    defaults.maintainAspectRatio = false;
    defaults.responsive = true;



    const chartData = [
        {
            label: "Jan",
            revenue: 64854,
            cost: 32652
        },
        {
            label: "feb",
            revenue: 54628,
            cost: 32393,
        },
        {
            label: "Mar",
            revenue: 54628,
            cost: 12345,
        },
        {
            label: "Apr",
            revenue: 82830,
            cost: 64731,
        },
        {
            label: "May",
            revenue: 45236,
            cost: 32562,
        },
        {
            label: "June",
            revenue: 68952,
            cost: 14852,
        },
        {
            label: "July",
            revenue: 78541,
            cost: 14731,
        },
        {
            label: "Aug",
            revenue: 58693,
            cost: 25863,
        },
        {
            label: "Sep",
            revenue: 78459,
            cost: 59632,
        },

    ]


    return (
        <>
            <div className="lineChart" >
                <Line
                    data={{
                        labels: chartData.map((data) => data.label),
                        datasets: [
                            {
                                label: "Revenue",
                                data: chartData.map((data) => data.revenue),

                                backgroundColor: "#064ff0",
                                pointRadius: 0,
                                pointHoverRadius: 6,
                                borderColor: "#fff1",


                            },
                            {
                                label: "Cost",
                                data: chartData.map((data) => data.cost),
                                backgroundColor: "#063455",
                                pointRadius: 0,
                                borderColor: "#fff1",

                            },

                        ]
                    }}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: {
                                display: false,
                            },

                            tooltip: {
                                enabled: true,
                                callbacks: {
                                    label: (context) => {
                                        const value = context.raw;
                                        return `Revenue : ${value}`
                                    }
                                }
                            }



                        },

                        hover: {
                            mode: "nearest",
                            intersect: true,
                        },

                        scales: {
                            x: {
                                ticks: {
                                    display: false,
                                },
                                grid: {
                                    display: false,
                                }


                            },

                            y: {
                                ticks: {
                                    display: false,
                                },
                                grid: {
                                    display: false,
                                }

                            }
                        },

                        elements: {
                            line: {
                                tension: 0.3,
                            }
                        }


                    }}

                />
            </div>



        </>
    )
}


export default Achievement