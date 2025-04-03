import { Col, Divider, Row, Statistic } from "antd";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { useEffect, useState } from "react";
import { Line, Pie } from "react-chartjs-2";
import { getDashBoard } from "../api/api";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);
const Dashboard = () => {
  const [quantity, setQuantity] = useState({});

  useEffect(() => {
    dashBoard();
  }, []);

  const dashBoard = async () => {
    let res = await getDashBoard();

    if (res && res.statusCode === 200) {
      setQuantity(res.data);
    }
  };

  const dataOrders = {
    labels: [
      `Rejected(${quantity.numberOfRejectedOrders})`,
      `Completed(${quantity.numberOfCompletedOrders})`,
      `Pending(${quantity.numberOfPendingOrders})`,
      `Billed(${quantity.numberOfSoldOrders})`,
    ],
    datasets: [
      {
        label: "Orders",
        data: [
          quantity.numberOfRejectedOrders,
          quantity.numberOfCompletedOrders,
          quantity.numberOfPendingOrders,
          quantity.numberOfSoldOrders,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(54, 162, 235, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(54, 162, 235, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const dataCustomersNOrders = {
    labels: [
      "11 Feb",
      "12 Feb",
      "13 Feb",
      "14 Feb",
      "15 Feb",
      "16 Feb",
      "17 Feb",
      "18 Feb",
    ],
    datasets: [
      {
        label: "Customer",
        data: [10, 20, 30, 15, 18, 22, 25, 16],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderWidth: 2,
        pointBackgroundColor: "red",
        pointBorderColor: "white",
        pointRadius: 5,
        pointHoverRadius: 7,
      },
      {
        label: "Order",
        data: [12, 35, 25, 14, 23, 30, 33, 20],
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderWidth: 2,
        pointBackgroundColor: "blue",
        pointBorderColor: "white",
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
        grid: { color: "#ddd" },
      },
    },
  };
  return (
    <div>
      <Row gutter={[20, 20]}>
        <Col span={14} className="gutter-row">
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              gap: "20px",
            }}
          >
            <div
              style={{
                border: "1px solid transparent",
                borderRadius: "5px",
                backgroundColor: "#FEFEFE",
                padding: "50px 10px",
                width: "500px",
              }}
            >
              <Statistic
                title="Total Customers"
                value={quantity.numberOfCustomers}
              />
            </div>

            <div
              style={{
                border: "1px solid transparent",
                borderRadius: "5px",
                backgroundColor: "#FEFEFE",
                padding: "50px 10px",
                width: "500px",
              }}
            >
              <Statistic title="Total Orders" value={quantity.numberOfOrders} />
            </div>

            <div
              style={{
                border: "1px solid transparent",
                borderRadius: "5px",
                backgroundColor: "#FEFEFE",
                padding: "50px 10px",
                width: "500px",
              }}
            >
              <Statistic title="Total Sales" value={quantity.numberOfBills} />
            </div>
          </div>

          <div
            style={{
              width: "100%",
              height: "400px",
              padding: "10px",
              border: "1px solid transparent",
              borderRadius: "5px",
              backgroundColor: "#FEFEFE",
              marginTop: "20px",
            }}
          >
            <h2>Orders Statistics</h2>
            <Line data={dataCustomersNOrders} options={options} />
          </div>
        </Col>
        <Col span={10} className="gutter-row">
          <div
            style={{
              padding: "20px",
              backgroundColor: "#FEFEFE",
              border: "1px solid transparent",
              borderRadius: "5px",
            }}
          >
            <h2>Orders Summary</h2>
            <Divider></Divider>
            <Pie data={dataOrders} />
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default Dashboard;
