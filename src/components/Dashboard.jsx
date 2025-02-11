import { LikeOutlined } from "@ant-design/icons";
import { Col, Row, Statistic } from "antd";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Doughnut, Line } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const Dashboard = () => {
  const data = {
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
        <Col span={8} className="gutter-row">
          <div
            style={{
              border: "1px solid transparent",
              borderRadius: "5px",
              backgroundColor: "#FEFEFE",
              padding: "50px 10px",
            }}
          >
            <Statistic title="Total Customers" value={1128} />
          </div>
        </Col>
        <Col span={8} className="gutter-row">
          <div
            style={{
              border: "1px solid transparent",
              borderRadius: "5px",
              backgroundColor: "#FEFEFE",
              padding: "50px 10px",
            }}
          >
            <Statistic title="Total Orders" value={1128} />
          </div>
        </Col>
        <Col span={8} className="gutter-row">
          <div
            style={{
              border: "1px solid transparent",
              borderRadius: "5px",
              backgroundColor: "#FEFEFE",
              padding: "50px 10px",
            }}
          >
            <Statistic title="Total Sales" value={93} />
          </div>
        </Col>
      </Row>
      <div style={{ margin: "10px 0" }}></div>
      <Row>
        <Col span={24}>
          <div
            style={{
              width: "100%",
              height: "400px",
              padding: "10px",
              border: "1px solid transparent",
              borderRadius: "5px",
              backgroundColor: "#FEFEFE",
            }}
          >
            <h2>Orders Statistics</h2>
            <Line data={data} options={options} />
          </div>
        </Col>
      </Row>
      <div style={{ margin: "10px 0" }}></div>
      {/* <Row gutter={[20, 20]}>
        <Col span={12}>
          <div
            style={{
              border: "1px solid transparent",
              borderRadius: "5px",
              backgroundColor: "#FEFEFE",
            }}
          >
            <h2>Sales Statistics</h2>
            <div>
              <Line
                data={{
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
                      data: [10, 20, 30, 15, 18, 22, 25, 19],
                      borderColor: "rgb(220, 20, 60)",
                      backgroundColor: "rgba(220, 20, 60, 0.2)",
                      pointBackgroundColor: "rgb(220, 20, 60)",
                      fill: true,
                      tension: 0.4,
                    },
                    {
                      label: "Order",
                      data: [12, 35, 28, 10, 25, 30, 35, 26],
                      borderColor: "rgb(0, 0, 255)",
                      backgroundColor: "rgba(0, 0, 255, 0.2)",
                      pointBackgroundColor: "rgb(0, 0, 255)",
                      fill: true,
                      tension: 0.4,
                    },
                  ],
                }}
              />
            </div>
          </div>
        </Col>
        <Col span={12}>
          <div
            style={{
              border: "1px solid transparent",
              borderRadius: "5px",
              backgroundColor: "#FEFEFE",
            }}
          >
            <h2>Orders</h2>
            <div>
              <Doughnut
                style={{ fontSize: "100px" }}
                data={{
                  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                  datasets: [
                    {
                      label: "Sales",
                      data: [120, 190, 300, 450, 600, 800],
                    },
                  ],
                }}
              />
            </div>
          </div>
        </Col>
      </Row> */}
    </div>
  );
};
export default Dashboard;
