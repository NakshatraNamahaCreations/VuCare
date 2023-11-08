import React, { useState, PureComponent, useEffect } from "react";
import Header from "./Header";
import Sidenav from "./Sidenav";
import Chart from "react-apexcharts";

import { useContext } from "react";
import { CreateToggle } from "./TogglerProvider";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#03b162",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function Dashboard() {
  const { light } = useContext(CreateToggle);

  const [state, setState] = useState({
    options: {
      colors: ["#03b162", "#fff"],
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Aprl",
          "May",
          "Jun",
          "July",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
    },
    series: [
      {
        // name: "People Born",
        data: [30, 40, 45, 50, 49, 60, 70, 91, 101, 111, 121, 131],
      },
    ],
  });

  const [userdata, setuserdata] = useState([]);
  const [Servicedata, setServicedata] = useState([]);

  useEffect(() => {
    getappcustomer();
    getservicemanagement();
  }, []);

  const getappcustomer = async () => {
    let res = await axios.get("http://localhost:8008/api/userapp/getuser");
    if ((res.status = 200)) {
      setuserdata(res.data?.userdata);
    }
  };

  const getservicemanagement = async () => {
    let res = await axios.get("http://localhost:8008/api/userapp/getservices");
    if ((res.status = 200)) {
      setServicedata(res.data?.service);
    }
  };
  return (
    <div className={light ? "row black container_box" : "row "}>
      <div className="col-md-2 ">
        <Sidenav />
      </div>
      <div className="col-md-10 ">
        <Header />
        <div className="row ">
          <div className="col-6">
            <div className="row m-auto  mt-3">
              <div className="col-md-6 ">
                <div className="card home-col shadow p-3 mb-5  rounded">
                  <div className="card-body">
                    <img src="rupee.png" width="50px" />
                    <div className="home-content">Earnings</div>
                    <div className="home-desc">2500</div>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card home-col shadow p-3 mb-5  rounded">
                  <div className="card-body">
                    <img src="service.png" width="50px" />
                    <div className="home-content">Services</div>
                    <div className="home-desc">{Servicedata?.length}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row m-auto  mt-3">
              <div className="col-md-6">
                <div className="card home-col shadow p-3 mb-5  rounded">
                  <div className="card-body">
                    <img src="rating.png" width="50px" />

                    <div className="home-content">Customer</div>
                    <div className="home-desc">{userdata?.length}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div style={{ textAlign: "center" }}>
              <h3>Payment Reports</h3>
            </div>
            <Chart
              options={state.options}
              series={state.series}
              type="bar"
              width="100%"
            />
          </div>
        </div>
        <div>
          <div style={{}}>
            <h3>Recent Transctions List</h3>
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Transcation ID</StyledTableCell>
                  <StyledTableCell align="right">Customer Name</StyledTableCell>
                  <StyledTableCell align="right">Date</StyledTableCell>
                  <StyledTableCell align="right">Amount</StyledTableCell>
                  <StyledTableCell align="right">Status</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    #T12023912312391283
                  </StyledTableCell>
                  <StyledTableCell align="right">Yogesh</StyledTableCell>
                  <StyledTableCell align="right">12/08/2023</StyledTableCell>
                  <StyledTableCell align="right">230</StyledTableCell>
                  <StyledTableCell align="right">Paid</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    #T12023912312391283
                  </StyledTableCell>
                  <StyledTableCell align="right">Arun</StyledTableCell>
                  <StyledTableCell align="right">14/08/2023</StyledTableCell>
                  <StyledTableCell align="right">450</StyledTableCell>
                  <StyledTableCell align="right">Paid</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    #T12023912312391283
                  </StyledTableCell>
                  <StyledTableCell align="right">Sudeep</StyledTableCell>
                  <StyledTableCell align="right">15/08/2023</StyledTableCell>
                  <StyledTableCell align="right">300</StyledTableCell>
                  <StyledTableCell align="right">Paid</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    #T12023912312391283
                  </StyledTableCell>
                  <StyledTableCell align="right">Chethan</StyledTableCell>
                  <StyledTableCell align="right">18/08/2023</StyledTableCell>
                  <StyledTableCell align="right">1500</StyledTableCell>
                  <StyledTableCell align="right">Paid</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    #T12023912312391283
                  </StyledTableCell>
                  <StyledTableCell align="right">Lakshmi</StyledTableCell>
                  <StyledTableCell align="right">20/08/2023</StyledTableCell>
                  <StyledTableCell align="right">3400</StyledTableCell>
                  <StyledTableCell align="right">Paid</StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
