import React from "react";
import AccountNav from "./AccountNav";

const Orders = () => {
  return (
    <section class="flat-spacing-11">
      <div class="container">
        <div class="row">
          <AccountNav />
          <div class="col-lg-9">
            <div class="my-account-content account-order">
              <div class="wrap-account-order">
                <table>
                  <thead>
                    <tr>
                      <th class="fw-6">Order</th>
                      <th class="fw-6">Date</th>
                      <th class="fw-6">Status</th>
                      <th class="fw-6">Total</th>
                      <th class="fw-6">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="tf-order-item">
                      <td>#123</td>
                      <td>August 1, 2024</td>
                      <td>On hold</td>
                      <td>$200.0 for 1 items</td>
                      <td>
                        <a
                          href="my-account-orders-details.html"
                          class="tf-btn btn-fill animate-hover-btn rounded-0 justify-content-center"
                        >
                          <span>View</span>
                        </a>
                      </td>
                    </tr>
                    <tr class="tf-order-item">
                      <td>#345</td>
                      <td>August 2, 2024</td>
                      <td>On hold</td>
                      <td>$300.0 for 1 items</td>
                      <td>
                        <a
                          href="my-account-orders-details.html"
                          class="tf-btn btn-fill animate-hover-btn rounded-0 justify-content-center"
                        >
                          <span>View</span>
                        </a>
                      </td>
                    </tr>
                    <tr class="tf-order-item">
                      <td>#567</td>
                      <td>August 3, 2024</td>
                      <td>On hold</td>
                      <td>$400.0 for 1 items</td>
                      <td>
                        <a
                          href="my-account-orders-details.html"
                          class="tf-btn btn-fill animate-hover-btn rounded-0 justify-content-center"
                        >
                          <span>View</span>
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Orders;
