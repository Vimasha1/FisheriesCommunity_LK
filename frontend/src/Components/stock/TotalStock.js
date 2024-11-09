import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Header from "../../Header";
import Footer from "../../Footer";
import SideNav from "../../SideNav";
import StockNavbar from "./StockNavbar.js";
import tunaIcon from "../../assests/1.png";
import indianMackerelIcon from "../../assests/2.png";
import sailFishIcon from "../../assests/3.png";
import redMulletIcon from "../../assests/4.png";
import crabIcon from "../../assests/5.png";
import prawnIcon from "../../assests/6.png";
import cuttleFishIcon from "../../assests/7.png";
import barramundiIcon from "../../assests/8.png";
import defaultFishIcon from "../../assests/fisherman.png";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const fishIcons = {
  TUNA: tunaIcon,
  BARRAMUNDI: barramundiIcon,
  CRAB: crabIcon,
  "RED MULLET": redMulletIcon,
  "INDIAN MACKERE": indianMackerelIcon,
  "CUTTLE FISH": cuttleFishIcon,
  PRAWN: prawnIcon,
  "SAIL FISH": sailFishIcon,
};

const URL = "http://localhost:5005/users";

function TotalStock() {
  const [fishData, setFishData] = useState([]);
  const [averagePricePerType, setAveragePricePerType] = useState({});
  const [totalFishQuantity, setTotalFishQuantity] = useState(0);
  const [totalStock, setTotalStock] = useState({}); // New state for total stock

  useEffect(() => {
    const fetchFishData = async () => {
      try {
        const response = await axios.get(URL);
        setFishData(response.data.users);
      } catch (error) {
        console.error("Error fetching fish data:", error);
      }
    };

    fetchFishData();
  }, []);

  // Function to calculate total stock for each fish type and grade
  const calculateTotalStock = () => {
    const totalStock = {};
    let totalQuantity = 0;

    fishData.forEach((user) => {
      const { FishType, Quantity, FishGrade } = user;

      if (!totalStock[FishType]) {
        totalStock[FishType] = {
          totalQuantity: 0,
          sizes: {
            ExtraLarge: 0,
            Large: 0,
            Small: 0,
          },
        };
      }

      totalStock[FishType].totalQuantity += Number(Quantity);
      totalQuantity += Number(Quantity);

      if (FishGrade === "Extra large") {
        totalStock[FishType].sizes.ExtraLarge += Number(Quantity);
      } else if (FishGrade === "Large") {
        totalStock[FishType].sizes.Large += Number(Quantity);
      } else if (FishGrade === "Small") {
        totalStock[FishType].sizes.Small += Number(Quantity);
      }
    });

    setTotalFishQuantity(totalQuantity);
    return totalStock;
  };

  const calculateAveragePricePerType = () => {
    const priceData = {};
    fishData.forEach((user) => {
      const { FishType, Price, Quantity } = user;

      if (!priceData[FishType]) {
        priceData[FishType] = { totalQuantity: 0, totalPrice: 0 };
      }

      priceData[FishType].totalQuantity += Number(Quantity);
      priceData[FishType].totalPrice += Number(Price) * Number(Quantity);
    });

    const averagePriceData = {};
    Object.keys(priceData).forEach((type) => {
      averagePriceData[type] = (
        priceData[type].totalPrice / priceData[type].totalQuantity
      ).toFixed(2);
    });

    setAveragePricePerType(averagePriceData);
  };

  useEffect(() => {
    if (fishData.length > 0) {
      setTotalStock(calculateTotalStock()); // Calculate total stock
      calculateAveragePricePerType();
    }
  }, [fishData]);

  // Prepare data for the stock chart
  const chartData = {
    labels: Object.keys(totalStock),
    datasets: [
      {
        label: "Total Quantity (kg)",
        data: Object.values(totalStock).map((stock) => stock.totalQuantity),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Extra Large (kg)",
        data: Object.values(totalStock).map((stock) => stock.sizes.ExtraLarge),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
      {
        label: "Large (kg)",
        data: Object.values(totalStock).map((stock) => stock.sizes.Large),
        backgroundColor: "rgba(144, 238, 144, 1)",
      },
      {
        label: "Small (kg)",
        data: Object.values(totalStock).map((stock) => stock.sizes.Small),
        backgroundColor: "rgba(255, 206, 86, 0.6)",
      },
    ],
  };

  // Prepare data for the average price chart
  const averagePriceChartData = {
    labels: Object.keys(averagePricePerType),
    datasets: [
      {
        label: "Average Price (LKR)",
        data: Object.values(averagePricePerType),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
    ],
  };

  return (
    <div className="flex">
      <SideNav />
      <div className="ml-56 flex-grow flex flex-col min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
        <Header />
        <StockNavbar />
        <div className="p-8">
          <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
            Total Stock & Price Analysis
          </h1>
          {/* Box for defaultFishIcon */}
          <div className="bg-blue-100 border border-black p-6 rounded-lg shadow-lg mb-8 w-96 mx-auto flex items-center">
          <img
              src={defaultFishIcon}
              alt="Fisherman Icon"
              className="mx-auto w-32 h-42 mb-4"
            />
            <h2 className="text-2xl font-semibold mr-5">
              Total Fish Stock Available Now
            </h2>
            <p className="text-2xl font-extrabold text-blue-800 ml-2 mr-5">{totalFishQuantity} kg</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.keys(totalStock).map((fishType) => (
              <div
                key={fishType}
                className="border border-gray-300 p-4 rounded-lg shadow-lg flex items-center"
              >
                <img
                  src={fishIcons[fishType] || defaultFishIcon}
                  alt={`${fishType} icon`}
                  className="w-32 h-32 mr-4"
                />
                <div>
                  <h2 className="text-xl font-semibold">{fishType}</h2>
                  <p className="text-gray-700">
                    Total Quantity: {totalStock[fishType].totalQuantity} kg
                  </p>
                  <p className="text-gray-700">
                    Extra Large: {totalStock[fishType].sizes.ExtraLarge} kg
                  </p>
                  <p className="text-gray-700">
                    Large: {totalStock[fishType].sizes.Large} kg
                  </p>
                  <p className="text-gray-700">
                    Small: {totalStock[fishType].sizes.Small} kg
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Bar
              data={chartData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "top",
                  },
                  title: {
                    display: true,
                    text: "Fish Stock Overview",
                  },
                },
              }}
            />
          </div>
          <div className="mt-12">
            <h2 className="text-xl font-semibold text-center mb-4">
              Average Price per Fish Type
            </h2>
            <Bar
              data={averagePriceChartData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "top",
                  },
                  title: {
                    display: true,
                    text: "Average Price per Fish Type (LKR)",
                  },
                },
              }}
            />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default TotalStock;
