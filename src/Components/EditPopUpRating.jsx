import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Input } from "@mui/base";
import { useDispatch, useSelector } from "react-redux";
import { addDoc, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { toEditTheReviewData } from "../redux/action";
import { useState } from "react";
import "../App.css";

export const EditPopUpRating = ({ movieData }) => {
  const [open, setOpen] = React.useState(true);
  const [textContent, settextContent] = useState(movieData.content);
  const [rating, setRating] = useState(movieData.rating);
  const navigate = useNavigate();
  const usersLogin = useSelector((state) => state.usersLogin);
  const dispatch = useDispatch();
  const handleCancel = () => {
    setOpen(false);
    settextContent("");
    setRating(0);
  };
  const handleOnClickSubmit = async () => {
    // let content = textContent;
    // if ( content === 0 )
    // {
    //   content = movieData.
    // }
    const payload = {
      poster_path: movieData.poster_path,
      username: usersLogin.username,
      user_image: usersLogin.profile_path,
      id: movieData.id,
      original_title: movieData.original_title,
      content: textContent,
      rating: rating,
      uniquId: movieData.uniquId,
      email: usersLogin.email,
    };

    const reviewData = doc(db, "reviews", movieData.uniquId);
    await updateDoc(reviewData, payload).then((res) => {
      navigate("/review");
    });

    dispatch(toEditTheReviewData(payload));
  };

  return (
    <Dialog open={open}>
      <div className="DiloguBox">
        <DialogTitle></DialogTitle>
        <DialogContent>
          <textarea
            defaultValue={movieData.content}
            className="textArea"
            placeholder="Enter Review Here"
            onChange={(e) => settextContent(e.target.value)}
          />
          <div className="InputDiv">
            <p> Rating </p>
            <Input
              defaultValue={movieData.rating}
              type="text"
              name="rating"
              onChange={(e) => setRating(e.target.value)}
            />
            <p> Out of 5</p>
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCancel} variant="outlined">
            Cancel
          </Button>
          <Button
            autoFocus
            variant="contained"
            onClick={() => handleOnClickSubmit()}
          >
            Submit
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
};
