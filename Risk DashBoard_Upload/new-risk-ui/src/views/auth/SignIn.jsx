import React from "react";
import RiskManagement from "./../../assets/images/login-img.jpg";
import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <div>
      <div className="login-wrapper py-5">
        <div className="container h-100">
          <div className="card-container h-100">
            <div className="row h-100 align-items-center">
              <div className="col-12 col-md-6">
                <div className="login-container">
                  <div className="card">
                    <h5 className="mb-4">LOGIN</h5>
                    <div className="form-group">
                      <label for="emailID">Email Address</label>
                      <input type="email" className="form-control" id="emailID" aria-describedby="emailHelp"
                        placeholder="your@email.com" />
                    </div>
                    <div className="form-group">
                      <div className="d-flex justify-content-between">
                        <label for="inputPassword">Password</label>
                        <a href="#" className="hyper-link">Forgot Password?</a>
                      </div>
                      <input type="password" className="form-control" id="inputPassword"
                        placeholder="Enter 8 characters or more" />
                    </div>
                    <div className="form-group form-check">
                      <input type="checkbox" className="form-check-input" id="checkbox" />
                      <label className="form-check-label" for="checkbox">Remember me</label>
                    </div>
                    <Link className="btn btn-primary" to={{ pathname: '/admin/dashboard' }}>Login</Link>
                    {/* <button type="submit" className="btn btn-primary" onClick={() => {

                      history.push("/app/dashboard");
                    }}>Login</button> */}
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="h-100 login-img">
                  <img src={RiskManagement} alt="risk image" width={400} style={{ paddingLeft: 30 }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn; 