// components/LoginForm.js
import React from "react";
import logo from "../../assets/images/logo-dark.png";
const LoginForm = ({ toggleForms }) => {
  return (
    <div class="col-xxl-7">
      <div class="row justify-content-center h-100">
        <div class="col-lg-6 py-lg-5">
          <div class="d-flex flex-column h-100 justify-content-center">
            <div class="auth-logo mb-4">
              <a href="index.html" class="logo-dark">
                <img src={logo} height="24" alt="logo dark" />
              </a>

              <a href="index.html" class="logo-light">
                <img src={logo} height="24" alt="logo light" />
              </a>
            </div>

            <h2 class="fw-bold fs-24">Sign In</h2>

            <p class="text-muted mt-1 mb-4">
              Enter your email address and password to access admin panel.
            </p>

            <div class="mb-5">
              <form
                action="https://techzaa.getappui.com/larkon/admin/index.html"
                class="authentication-form"
              >
                <div class="mb-3">
                  <label class="form-label" for="example-email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="example-email"
                    name="example-email"
                    class="form-control bg-"
                    placeholder="Enter your email"
                  />
                </div>
                <div class="mb-3">
                  <a
                    href="auth-password.html"
                    class="float-end text-muted text-unline-dashed ms-1"
                  >
                    Reset password
                  </a>
                  <label class="form-label" for="example-password">
                    Password
                  </label>
                  <input
                    type="text"
                    id="example-password"
                    class="form-control"
                    placeholder="Enter your password"
                  />
                </div>
                <div class="mb-3">
                  <div class="form-check">
                    <input
                      type="checkbox"
                      class="form-check-input"
                      id="checkbox-signin"
                    />
                    <label class="form-check-label" for="checkbox-signin">
                      Remember me
                    </label>
                  </div>
                </div>

                <div class="mb-1 text-center d-grid">
                  <button class="btn btn-soft-primary" type="submit">
                    Sign In
                  </button>
                </div>
              </form>

              {/* <p class="mt-3 fw-semibold no-span">OR sign with</p>

              <div class="d-grid gap-2">
                <a href="javascript:void(0);" class="btn btn-soft-dark">
                  <i class="bx bxl-google fs-20 me-1"></i> Sign in with Google
                </a>
                <a href="javascript:void(0);" class="btn btn-soft-primary">
                  <i class="bx bxl-facebook fs-20 me-1"></i> Sign in with
                  Facebook
                </a>
              </div> */}
            </div>

            <p class="text-danger text-center">
              Don't have an account?{" "}
              <a href="auth-signup.html" class="text-dark fw-bold ms-1">
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
