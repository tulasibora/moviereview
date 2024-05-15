import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Input } from "@mui/base";
import { useSelector } from "react-redux";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import "../App.css";

export const RatingPopUp = ({ movieData }) => {
  const [open, setOpen] = React.useState(true);
  const [textContent, settextContent] = React.useState("");
  const [rating, setRating] = React.useState(0);
  const navigate = useNavigate();
  const usersLogin = useSelector((state) => state.usersLogin);
  const random = Math.floor(Math.random(1000) * 1000);
  const uniquId = random.toString();
  const handleCancel = () => {
    setOpen(false);
  };
  const handleOnClickSubmit = () => {
    if (textContent !== "" && rating !== "") {
      const payload = {
        poster_path: movieData.poster_path,
        username: usersLogin.username,
        email: usersLogin.email,
        user_image: usersLogin.profile_path,
        id: movieData.id,
        original_title: movieData.original_title,
        content: textContent,
        rating: rating,
        uniquId: uniquId,
      };
      const addReviewRefrence = doc(db, "reviews", uniquId);

      setDoc(addReviewRefrence, payload)
        .then((res) => {
          setOpen(false);
          settextContent("");
          setRating("");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Dialog open={open}>
      <div className="DiloguBox">
        <DialogTitle></DialogTitle>
        <DialogContent>
          <textarea
            className="textArea"
            placeholder="Enter Review Here"
            onChange={(e) => settextContent(e.target.value)}
          />
          <div className="InputDiv">
            <p> Rating </p>{" "}
            <Input
              type="text"
              name="rating"
              onChange={(e) => setRating(e.target.value)}
            />
            <p> Out of 5</p>{" "}
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
