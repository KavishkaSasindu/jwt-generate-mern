import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const Form = () => {
  const [getData, setData] = useState({
    username: "",
    password: "",
  });

  const changeValue = (e) => {
    setData({
      ...getData,
      [e.target.name]: e.target.value,
    });
  };

  const handleData = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:3000/signUp", getData);
    console.log(getData);
  };

  return (
    <>
      <div className="w-full h-screen flex justify-center m-auto items-center">
        <div className="w-[60%] h-[500px]  flex justify-center items-center">
          <div className="w-full h-full flex justify-center items-center  shadow-lg ">
            <form
              onSubmit={handleData}
              method="post"
              className="space-y-5 w-full h-full flex justify-center items-center"
            >
              <div className="space-y-5">
                <div className="text-center text-2xl">SignUp Here</div>
                <div>
                  <div>
                    <label htmlFor="username :">Username :</label>
                  </div>
                  <input
                    type="text"
                    name="username"
                    required
                    className="border rounded-lg w-[400px] py-2"
                    onChange={changeValue}
                  />
                </div>
                <div>
                  <div>
                    <label htmlFor="username :">Password :</label>
                  </div>
                  <input
                    type="password"
                    name="password"
                    required
                    className="border rounded-lg w-[400px] py-2 "
                    onChange={changeValue}
                  />
                </div>
                <div>
                  <button className="border-none rounded-md px-2 py-2 bg-blue-600 text-white">
                    SignUp
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
