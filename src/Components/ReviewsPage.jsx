import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import React, { useEffect } from "react";
import { getReviewsFromDataBase } from "../redux/action";
import { useDispatch, useSelector } from "react-redux";
import { auth, db } from "../firebase";
import axios from "axios";
import { Box, Button, Divider, Paper, Rating } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import { useNavigate } from "react-router-dom";
import CommonComponent from "./CommonComponent";
import "../App.css";
const ReviewsPage = () => {
  const navigate = useNavigate();
  const data = useSelector((state) => state.reviewsdb);
  const Storedata = useSelector((state) => state);
  const movieURL = "https://image.tmdb.org/t/p/w500";
  const dispatch = useDispatch();
  useEffect(() => {
    const getReviewRef = collection(db, "reviews");
    getDocs(getReviewRef).then((res) => {
      res.forEach((resp) => {
        let element = resp.data();
        const existingIndex = data.findIndex((item) => item.id === element.id);
        if (existingIndex === -1) {
          dispatch(getReviewsFromDataBase(resp.data()));
        }
      });
    });
  }, []);

  return (
    <div>
      <CommonComponent />
      <main className="content">
        <div className="mainReviewDiv">
          {data.map((review, index) => {
            return (
              <div className="revieswPAge" key={index}>
                <div className="UserDiv">
                  <div className="UserNname">
                    <img src={review.user_image} />
                    <h2>{review.username}</h2>
                  </div>
                  <Divider
                    orientation="horizontal"
                    style={{ width: "25vw", backgroundColor: "lightgray" }}
                  />
                  <Rating name="read-only" value={review.rating} readOnly />
                  {review.content.length > 50 ? (
                    <p>{review.content.slice(0, 100) + "...."}</p>
                  ) : (
                    <p>{review.content}</p>
                  )}
                  <div className="BtnDiv">
                    <Button variant="contained">Read More</Button>
                  </div>
                </div>
                <div
                  onClick={() => navigate("/movieDteails", { state: review })}
                  className="imagePoster"
                >
                  <img src={movieURL + review.poster_path} />
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default ReviewsPage;
