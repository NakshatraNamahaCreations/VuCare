import React, { useState } from "react";
import Header from "./Header";
import Sidenav from "./Sidenav";
import Button from "react-bootstrap/Button";
import { RadialBarChart, RadialBar, Legend, Tooltip } from "recharts";

function Wallets() {
  const data = [
    {
      name: "today",
      Qty: 26,
      amount: 49800,
      fill: "#8884d8",
    },
    // {
    //   name: "today",
    //   uv: 26.69,
    //   pv: 4567,
    //   fill: "#83a6ed",
    // },
    // {
    //   name: "today",
    //   uv: -15.69,
    //   pv: 1398,
    //   fill: "#8dd1e1",
    // },
    // {
    //   name: "today",
    //   uv: 8.22,
    //   pv: 9800,
    //   fill: "#82ca9d",
    // },
    // {
    //   name: "yesterday",
    //   uv: -8.63,
    //   pv: 3908,
    //   fill: "#a4de6c",
    // },
    // {
    //   name: "yesterday",
    //   uv: -2.63,
    //   pv: 4800,
    //   fill: "#d0ed57",
    // },
    {
      name: "yeterday",
      Qty: 21,
      amount: 4800,
      fill: "#ffc658",
    },
  ];
  const [selected, setSelected] = useState(0);
  const handleClick = (divNum) => () => {
    setSelected(divNum);
  };
  return (
    <div div className="row">
      <div className="col-md-2">
        <Sidenav />
      </div>
      <div className="col-md-10">
        <Header />

        <div className="row">
          <div className="col-md-8">
            <h2>Your Balance</h2>
            <p>$85.250.000</p>
          </div>
          <div className="col-md-4 d-flex ">
            <div className="m-auto">
              <Button variant="danger">
                <i class="fa-solid fa-money-bill-transfer"></i>
              </Button>
              <br />
              transfer
            </div>
            <div className="m-auto">
              <Button variant="success">
                <i class="fa-solid fa-download"></i>
              </Button>
              <br />
              Top-up
            </div>
            <div className="m-auto">
              <Button variant="warning">
                <i class="fa-solid fa-money-bill"></i>
              </Button>
              <br />
              Bill
            </div>
          </div>
        </div>

        <div className="row">
          <h1>Daily Sales</h1>
          <RadialBarChart
            width={930}
            height={550}
            innerRadius="15%"
            outerRadius="80%"
            data={data}
            startAngle={180}
            endAngle={0}
          >
            <RadialBar
              minAngle={15}
              label={{ fill: "#666", position: "insideStart" }}
              background
              clockWise={true}
              dataKey="Qty"
            />
            <Legend
              iconSize={15}
              width={120}
              height={250}
              layout="vertical"
              verticalAlign="middle"
              align="right"
            />
            <Tooltip />
          </RadialBarChart>
        </div>

        <div className="row">
          <h2>Latest Transaction</h2>
          <div className="container col-md-12">
            <div className="col-md-12 d_box">
              <div>
                <img
                  src="https://lh3.googleusercontent.com/pLK1tp1T0Hb-15Z9c49XgXD87KW2Ieq8Kn5SA9pNsExDe6k4Z5M74hoNRvXcUDSR4rjey-8VzwyLQVs5UM3vyiBfuyk0=w900-rw"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "100%",
                  }}
                />
              </div>
              <p>Entertainment</p>
              <p>8 nov</p>
              <p>Football game</p>
              <p>300</p>
            </div>
          </div>
          <div className="col-md-12 d_box ">
            <div>
              <img
                src="https://lh3.googleusercontent.com/pLK1tp1T0Hb-15Z9c49XgXD87KW2Ieq8Kn5SA9pNsExDe6k4Z5M74hoNRvXcUDSR4rjey-8VzwyLQVs5UM3vyiBfuyk0=w900-rw"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "100%",
                }}
              />
            </div>
            <p>Entertainment</p>
            <p>9 nov</p>
            <p>Football game</p>
            <p>9000</p>
          </div>
          <div className="col-md-12 d_box">
            <div>
              <img
                src="https://lh3.googleusercontent.com/pLK1tp1T0Hb-15Z9c49XgXD87KW2Ieq8Kn5SA9pNsExDe6k4Z5M74hoNRvXcUDSR4rjey-8VzwyLQVs5UM3vyiBfuyk0=w900-rw"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "100%",
                }}
              />
            </div>
            <p>Entertainment</p>
            <p>10 nov</p>
            <p>Football game</p>
            <p>3090</p>
          </div>
          <div className="col-md-12 d_box">
            <div>
              <img
                src="https://lh3.googleusercontent.com/pLK1tp1T0Hb-15Z9c49XgXD87KW2Ieq8Kn5SA9pNsExDe6k4Z5M74hoNRvXcUDSR4rjey-8VzwyLQVs5UM3vyiBfuyk0=w900-rw"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "100%",
                }}
              />
            </div>
            <p>Entertainment</p>
            <p>12 nov</p>
            <p>Football game</p>
            <p>300</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wallets;
