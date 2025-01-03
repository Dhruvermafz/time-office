import React from "react";

const PaymentMethods = () => {
  return (
    <div class="tab-pane" id="basictab3" role="tabpanel">
      <h4 class="fs-16 fw-semibold mb-1">Payment Methods</h4>
      <p class="text-muted">Fill your Payment Methods</p>

      <div class="row">
        <div class="col-lg-9">
          <div class="card border-0">
            <div class="accordion" id="accordionExample">
              <div class="card">
                <div class="card-header p-0" id="pay-pal">
                  <h2 class="mb-0">
                    <button
                      class="btn btn-light w-100 collapsed rounded-0 border-bottom rounded-top-1"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      <div class="d-flex align-items-center justify-content-between">
                        <span class="fs-5">Paypal</span>
                        <img
                          src="assets/images/card/paypal.svg"
                          alt=""
                          class="avatar-sm"
                        />
                      </div>
                    </button>
                  </h2>
                  <p class="p-3 mb-0">
                    Safe Payment Online Credit card needed. PayPal account is
                    not necessary
                  </p>
                </div>
                <div
                  id="collapseTwo"
                  class="collapse"
                  aria-labelledby="pay-pal"
                  data-bs-parent="#accordionExample"
                >
                  <div class="card-body">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Paypal email"
                    />
                  </div>
                </div>
              </div>
              <div class="card mb-0">
                <div class="card-header p-0">
                  <h2 class="mb-0">
                    <button
                      class="btn btn-light w-100 collapsed rounded-0 border-bottom rounded-top-1"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      <div class="d-flex align-items-center justify-content-between">
                        <span class="fs-5">Credit card</span>
                        <div class="icons text-end">
                          <img
                            src="assets/images/card/mastercard.svg"
                            alt=""
                            class="avatar-sm"
                          />
                          <img
                            src="assets/images/card/stripe.svg"
                            alt=""
                            class="avatar-sm"
                          />
                          <img
                            src="assets/images/card/visa.svg"
                            alt=""
                            class="avatar-sm"
                          />
                        </div>
                      </div>
                    </button>
                  </h2>
                  <p class="p-3 mb-0">
                    Safe Money Transfer using your bank account. Visa , Master
                    Card ,Discover , American Express
                  </p>
                </div>
                <div
                  id="collapseOne"
                  class="collapse show"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div class="p-3">
                    <form>
                      <div class="mb-3">
                        <label for="card-number" class="form-label">
                          Card Number
                        </label>
                        <input
                          type="number"
                          id="card-number"
                          name="card-number"
                          class="form-control"
                          placeholder="0000 0000 0000 0000"
                          max="16"
                          maxlength="16"
                          required
                        />
                      </div>
                    </form>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="mb-3">
                          <label for="ex-date" class="form-label">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            id="ex-date"
                            class="form-control flatpickr-input"
                            placeholder="dd-mm-yyyy"
                            required
                          />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="mb-3">
                          <label for="card-cvv" class="form-label">
                            CVC/CVV
                          </label>
                          <input
                            type="number"
                            id="card-cvv"
                            name="card-cvv"
                            class="form-control"
                            placeholder="000"
                            min="0"
                            max="3"
                            maxlength="3"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      class="alert alert-success mb-0 d-flex align-items-center gap-2"
                      role="alert"
                    >
                      <iconify-icon
                        icon="solar:shield-check-bold"
                        class="fs-28 align-middle"
                      ></iconify-icon>
                      We adhere entirely to the data security standards of the
                      payment card industry.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;
