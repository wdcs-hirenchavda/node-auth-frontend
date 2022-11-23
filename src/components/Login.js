import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import Button from "react-bootstrap/Button";
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);
  const [timer, setTimer] = useState(false);
  const [otp, setOtp] = useState();
  useEffect(() => {
    if (localStorage.user) {
      navigate("/product");
    }
  }, []);

  const countDown = () => {
    var seconds = 59;
    function tick() {
      var counters = document.getElementById("counter1");
      seconds--;
      counters.innerHTML =
        " Your OTP expired in 0:" + (seconds < 10 ? "0" : "") + String(seconds);
      if (seconds > 0) {
        setTimeout(tick, 1000);
      } else {
        document.getElementById("counter").innerHTML = "";
      }
      if (seconds === 1) {
        setTimer(true);
      }
    }
    tick();
  };

  const login = async (event) => {
    event.preventDefault();
    if (!password || !{ email }) {
      setError(true);
      return false;
    } else {
      try {
        let userData = await axios.post(`http://localhost:5002/login`, {
          username: email,
          email: email,
          password: password,
        });
        let data = await userData.data;

        if (data.isActive === true && data.role === "user") {
          if (data.isOtpSend === true) {
            setShow(true);
            countDown();
          } else {
            navigate("/product");
            localStorage.setItem("user", JSON.stringify(data));
          }
        } else {
          if (data.message) {
            alert(data.message);
          } else {
            alert(
              "Your account has been blocked by admin, please contact admin or check email and password again"
            );
          }
        }
      } catch (error) {
        if (error) {
          // if(error.response.data.errors.email!==''){

          //   alert(error.response.data.errors.email);
          // }
          // alert(error.response.data.errors.password);
          console.log(error);
        }
      }
    }
  };

  const OTPVerification = async () => {
    if (!otp) {
      setError(true);
    } else {
      let verifyOTP = await axios.post(
        "http://localhost:5002/OTPverification",
        {
          email: email,
          otp: otp,
        }
      );

      if (verifyOTP.data === "OTP is invalid") {
        alert("OTP is invalid");
      } else {
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Your verification has been successfull",
          showConfirmButton: false,
          timer: 2000,
        });
        navigate("/product");
        localStorage.setItem("user", JSON.stringify(verifyOTP.data));
      }
    }
  };

  const resendOTP = async () => {
    let resendOTP = await axios.post(`http://localhost:5002/resendOTP`, {
      email: email,
    });
    if (resendOTP) {
      alert("OTP sent successfully");
      countDown();
    }
  };

  return (
    <div className="login-sign ">
      
      <div className="my-2 ">
        <form>
          {/* <input
            type="email"
            placeholder="Enter email or username "
            className="inputBox"
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && !email && (
            <span className="invalid-input">Enter email</span>
          )}
          <input
            type="password"
            placeholder="Enter password"
            className="inputBox"
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && !password && (
            <span className="invalid-input">Enter password</span>
          )}
          <button type="submit" className="appButton" onClick={login}>
            Login
          </button>
        </form>
        <button
          type="submit"
          className="appButton "
          onClick={() => navigate("/setNewPassword")}>
          forget password
        </button> */}
        {show ? (
          <>
            <div>
              <h1>Enter Your OTP</h1>
              <input
                type="text"
                placeholder="Enter your OTP"
                onChange={(e) => setOtp(e.target.value)}
              ></input>
              {error && !otp && (
                <span className="invalid-input">Enter OTP</span>
              )}
              <br />
              {!timer ? (
                <>
                  <Button className="confirm" onClick={() => OTPVerification()}>
                    Confirm
                  </Button>
                </>
              ) : (
                <>
                  <Button className="confirm mx-4" onClick={() => resendOTP()}>
                    Resend OTP
                  </Button>
                </>
              )}
            </div>
          </>
        ) : (
          <>
          <form>
          <h1>Login here</h1>
           <input
            type="email"
            placeholder="Enter email or username "
            className="inputBox"
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && !email && (
            <span className="invalid-input">Enter email</span>
          )}
          <input
            type="password"
            placeholder="Enter password"
            className="inputBox"
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && !password && (
            <span className="invalid-input">Enter password</span>
          )}
          <button type="submit" className="appButton" onClick={login}>
            Login
          </button>
        <button
          type="submit"
          className="appButton "
          onClick={() => navigate("/setNewPassword")}>
          forget password
        </button>
        </form>
        </>
        )}
          </form>
      </div>
    </div>
  );
}

export default Login;
