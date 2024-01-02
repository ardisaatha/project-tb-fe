import React, { useState } from "react";
import bgHero from "../assets/bg-hero.png";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../store/actions/auth";

const Login = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // const {accessToken} = useSelector((state) => state.authReducers)
  // console.log(accessToken)

  const usernameHandler = (e) => {
    setUsername(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const loginForm = async (e) => {
    e.preventDefault();

    const data = {
      username,
      password,
    };
    const res = await dispatch(login(data, history))
      .then((response) => ({ response }))
      .catch((error) => ({ error }));

    // console.log(res);

    if (res.error) {
      setError(res.error.response.data.message);
      // setErrorMessage(res.error.response.data.message);
    }
    // if (res){
    //   console.log(res)
    //   navigate("/dashboard")
    // }
  };

  return (
    <>
      <div className="flex h-screen bg-[#F6F6F6] text-black">
        <div className="md:w-1/2 flex md:items-center justify-center">
          {/* Konten form login */}
          <div className="md:w-96 min-[240px]:w-screen p-8 md:bg-white md:shadow-lg rounded-lg">
            <div
              className="md:hidden text-4xl mb-10 text-[#213555] font-bold leading-none"
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              SDKPT
            </div>
            <h2 className="text-2xl font-semibold mb-6">Selamat Datang!</h2>
            <form className="flex flex-col" method="POST" onSubmit={loginForm}>
              <div className="mb-4">
                <label htmlFor="username" className="block font-regular mb-2">
                  Username
                </label>
                <input
                  type="username"
                  id="username"
                  placeholder="John Doe"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                  value={username}
                  onChange={usernameHandler}
                  autoComplete="off"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block font-regular mb-2">
                  Password
                </label>
                <input
                  aria-hidden
                  type="password"
                  id="password"
                  placeholder="6+ Karakter"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white"
                  value={password}
                  onChange={passwordHandler}
                  autoComplete="off"
                  required
                />
              </div>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <button
                type="submit"
                className="w-full bg-[#213555] text-white font-semibold py-2 px-4 rounded-md"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
        <div className="w-1/2 relative min-[240px]:hidden md:flex">
          <img
            src={bgHero}
            alt=""
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-3/4 text-white">
            <div
              className="text-[56px] w-[577px] font-bold leading-none"
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              Sistem Distribusi Kerentanan Penyakit Tuberkulosis
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
