import React from "react";
import Header from "./Header";
import Sidenav from "./Sidenav";
import Button from "react-bootstrap/Button";

function ServiceBooking() {
  return (
    <div className="row">
      <div className="col-md-2">
        <Sidenav />
      </div>
      <div className="col-md-10">
        <Header />

        <div className="row m-auto">
          <table class="table table-hover table-bordered mt-5">
            <thead className="text-align-center">
              <tr className="table-secondary ">
                <th className="table-head" scope="col">
                  S.No
                </th>
                <th className="table-head" scope="col">
                  User Name
                </th>
                <th className="table-head" scope="col">
                  User Email
                </th>
                <th className="table-head" scope="col">
                  User Address
                </th>
                <th className="table-head" scope="col">
                  User Contact No.
                </th>
                <th className="table-head" scope="col">
                  Service Name
                </th>
                <th className="table-head" scope="col">
                  Service Price
                </th>
                <th className="table-head" scope="col">
                  Service Image
                </th>
                <th className="table-head" scope="col">
                  Discount Percentage(%)
                </th>
                <th className="table-head" scope="col">
                  Service booked date
                </th>

                <th className="table-head" scope="col">
                  Service validity date
                </th>
                <th className="table-head" scope="col">
                  Service delivery address
                </th>

                <th className="table-head" scope="col">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="justify-content-center">
              <tr className="user-tbale-body text-center">
                <td>1</td>
                <td>Vu Care</td>
                <td>thevucare@gmail.ocm</td>
                <td>Banglore jp nagar</td>
                <td>9328452913</td>
                <td>cleaning Bathroom</td>
                <td>3400</td>

                <td>
                  <img
                    src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRs26eXltFe1PsOeue7eM2ZquYKXKfbke5PijrBwVDevlIdzbkj"
                    width={"30px"}
                    height={"30px"}
                  />
                </td>
                <td>5%</td>
                <td>02-06-2023</td>
                <td>04-08-2023</td>
                <td>Bengaluru</td>
                <td>
                  {" "}
                  <span>Completed </span>
                  <Button variant="success">Edit</Button>{" "}
                </td>
              </tr>
            </tbody>
          </table>{" "}
        </div>
      </div>
    </div>
  );
}

export default ServiceBooking;
