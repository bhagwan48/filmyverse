import React, { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { addDoc } from "firebase/firestore";
import { usersRef } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import bcrypt from 'bcryptjs';

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      uploadData();
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=process.env.REACT_APP_API_KEY",
        {
          method: "POST",
          body: JSON.stringify(form),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      console.log(data);

      swal({
        text: "Sucessfully Registered",
        icon: "success",
        buttons: false,
        timer: 3000,
      });
      navigate('/login')
      setLoading(false);
    } catch (error) {
        console.log(error);
    }
  }

  const uploadData = async () => {
    try {
      const salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(form.password, salt);
      await addDoc(usersRef, {
        name: form.name,
        password: hash,
        email: form.email
      });
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <div className="w-full flex flex-col mt-8 items-center">
      <h1 className="text-xl font-bold">Sign up</h1>
      <>
        <div className="p-2 w-full md:w-1/3">
          <div className="relative">
            <label for="name" className="leading-7 text-sm text-gray-300">
              Name
            </label>
            <input 
              id="name"
              name="name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="p-2 w-full md:w-1/3">
          <div className="relative">
            <label for="email" className="leading-7 text-sm text-gray-300">
              Email
            </label>
            <input 
              type={'email'}
              id="email"
              name="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="p-2 w-full md:w-1/3">
          <div className="relative">
            <label for="password" className="leading-7 text-sm text-gray-300">
              Password
            </label>
            <input 
              type={'password'}
              id="password"
              name="password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="p-2 w-full">
          <button onClick={onSubmit} className="flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg">
            {loading ? <TailSpin height={25} color="white" /> : "Sign Up"}
          </button>
        </div>
      </>
      
      <div>
        <p>Already have an account <Link to={'/login'}><span className="text-blue-500">Login</span></Link></p>
      </div>
    </div>
  );
};

export default Signup;