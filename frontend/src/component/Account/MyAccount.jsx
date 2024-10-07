import React from "react";
import AccountNav from "./AccountNav";

const MyAccount = () => {
  return (
    <section class="flat-spacing-11">
      <div class="container">
        <div class="row">
          <AccountNav />
          <div class="col-lg-9">
            <div class="my-account-content account-dashboard">
              <div class="mb_60">
                <h5 class="fw-5 mb_20">Hello Themesflat</h5>
                <p>
                  From your account dashboard you can view your{" "}
                  <a class="text_primary" href="my-account-orders.html">
                    recent orders
                  </a>
                  , manage your{" "}
                  <a class="text_primary" href="my-account-address.html">
                    shipping and billing address
                  </a>
                  , and{" "}
                  <a class="text_primary" href="my-account-edit.html">
                    edit your password and account details
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyAccount;
