import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { NavLink, useNavigate } from "react-router-dom";
import Login from "./Login";
import axios from 'axios'
import { toast } from "react-toastify";
const RegistrationForm = () => {

  let navigate = useNavigate()

  const [registervalue, setRegister] = useState({
    email: '',
    username: '',
    password: '',
    role: ''
  });

  const handleChangeLogin = (e) => {
    const { name, value } = e.target;

    setRegister({ ...registervalue, [name]: value });
  };

  let register = (e) => {
    e.preventDefault()

    if (!registervalue.email || !registervalue.username || !registervalue.password || !registervalue.role) {
      alert("Complete all the fields!!!")
      return
    }
    axios.post(`http://localhost:8000/api/v1/auth/register`, registervalue).then(function (response) {
      toast.success('Registration Successful',{autoClose:2000})
    }).catch(function (error) {
      toast.error(error.message,{autoClose:2000})
    });
    navigate('/')
  }

  return (
    <>
      <div className=" container-fluid">
        <div className="row h-100 mt-5">
          <div className=" col-sm-12 my-auto shadow">
            <h1 className=" text-center">Registration Form</h1>
            <form class="row g-3" onSubmit={register}>
              <div class="col-md-4">
                <label for="validationDefault01" class="form-label">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  value={registervalue.email}
                  class="form-control"
                  id="validationDefault01"
                  required
                  onChange={handleChangeLogin}
                />
              </div>
              <div class="col-md-4">
                <label for="validationDefaultUsername" class="form-label">
                  Username
                </label>
                <div class="input-group">
                  <span class="input-group-text" id="inputGroupPrepend2">
                    @
                  </span>
                  <input
                    name="username"
                    value={registervalue.username}
                    type="text"
                    class="form-control"
                    id="validationDefaultUsername"
                    aria-describedby="inputGroupPrepend2"
                    required
                    onChange={handleChangeLogin}
                  />
                </div>
              </div>
              <div class="col-md-6">
                <label for="validationDefault03" class="form-label">
                  Password
                </label>
                <input
                  name="password"
                  value={registervalue.password}
                  type="password"
                  class="form-control"
                  id="validationDefault03"
                  required
                  onChange={handleChangeLogin}
                />
              </div>
              <div class="col-md-3">
                <label for="validationDefault04" class="form-label">
                  Roles
                </label>
                <select class="form-select" id="validationDefault04" required onChange={handleChangeLogin} name="role" value={registervalue.role}>
                  <option selected disabled value="">
                    Choose...
                  </option>
                  <option>CREATOR</option>
                  <option>VIEWER</option>
                  <option>VIEW_ALL</option>
                </select>
              </div>
              <div class="col-12">
                <button class="btn btn-primary mb-5" type="submit">
                  Submit form
                </button>
              </div>
              <br />
              <div class="col-12">
                <NavLink to="/"> Login to continue </NavLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegistrationForm;
