import React from "react";

const PersonalDetails = () => {
  return (
    <div class="row">
      <div class="col-lg-3">
        <h4 class="card-title">Personal Details</h4>
      </div>
      <div class="col-lg-9">
        <div class="row">
          <div class="col-lg-6">
            <form>
              <div class="mb-3">
                <label for="first-name" class="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  id="first-name"
                  class="form-control"
                  placeholder="First name"
                />
              </div>
            </form>
          </div>
          <div class="col-lg-6">
            <form>
              <div class="mb-3">
                <label for="last-name" class="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  id="last-name"
                  class="form-control"
                  placeholder="Last name"
                />
              </div>
            </form>
          </div>
          <div class="col-lg-6">
            <form>
              <div class="mb-3">
                <label for="your-email" class="form-label">
                  Your Email
                </label>
                <input
                  type="email"
                  id="your-email"
                  class="form-control"
                  placeholder="Email"
                />
              </div>
            </form>
          </div>
          <div class="col-lg-6">
            <form>
              <div class="mb-3">
                <label for="your-number" class="form-label">
                  Phone number
                </label>
                <input
                  type="number"
                  id="your-number"
                  name="your-number"
                  class="form-control"
                  placeholder="Number"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;