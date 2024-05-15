import React, { useEffect, useState } from "react";
import "../App.css";
import { Box, Button, FormControl, Input } from "@mui/material";
import deer from "../assets/deer.png";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { loginUserDetails } from "../redux/action";
const Login = () => {
  const usersLogin = useSelector((state) => state.usersLogin);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        const currentUser = response.user;
        const getMyReviewsRef = collection(db, "users");
        const q = query(getMyReviewsRef, where("uid", "==", currentUser.uid));
        getDocs(q).then((response) => {
          response.forEach((data) => {
            dispatch(loginUserDetails(data.data()));
          });
        }, []);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="loginPage">
      <Box className="loginLeftBox">
        <img src={deer} />
      </Box>
      <Box className="loginRightBox">
        <h1 style={{ marginBottom: "3rem" }}>CINEMA ELK</h1>
        <div className="formDiv">
          <div className="inputDiv">
            <Input
              disableUnderline={true}
              type="email"
              id="email"
              placeholder="Enter Email address"
              onChange={(e) => setEmail(e.currentTarget.value)}
              required={true}
            />
            <Input
              disableUnderline={true}
              type="text"
              id="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.currentTarget.value)}
              required={true}
            />
          </div>
          <Button className="loginBtn" onClick={handleLogin}>
            Login Now
          </Button>
          <p>
            Join the club,{" "}
            <a onClick={() => navigate("/signup")}>Click here!</a>
          </p>
        </div>
      </Box>
    </div>
  );
};

export default Login;
