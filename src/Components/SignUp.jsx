import { Box, Button, FormControl } from "@mui/material";
import React, { useState } from "react";
import deer from "../assets/deer.png";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { collection, doc, setDoc } from "firebase/firestore";
import { loginUserDetails, toStoreUserData } from "../redux/action";
import { useDispatch } from "react-redux";
import "../App.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const dispatch = useDispatch();

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const usercred = {
          email: email,
          uid: user.uid,
          username: fullname,
          profile_path: "https://xsgames.co/randomusers/avatar.php?g=male",
        };
        const addref = doc(db, "users", user.uid);
        setDoc(addref, usercred);
        dispatch(loginUserDetails(usercred));
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
        <h1>CINEMA ELK</h1>
        <FormControl className="formDiv">
          <div className="inputDiv">
            <input
              disableUnderline={true}
              type="email"
              id="email"
              placeholder="Enter Email address"
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
            <input
              disableUnderline={true}
              type="text"
              id="password"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
          </div>

          <input
            disableUnderline={true}
            type="text"
            id="fullname"
            placeholder="Enter Full Name"
            className="fullName"
            onChange={(e) => setFullname(e.currentTarget.value)}
          />
          <Button className="loginBtn" onClick={handleSignUp}>
            Login Now
          </Button>
          <p>
            Join the club, <a>Click here!</a>
          </p>
        </FormControl>
      </Box>
    </div>
  );
};

export default SignUp;
