import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import CommonComponent from "./CommonComponent";
import { toDeleteTheReviewData, toStoreUserReviewsData } from "../redux/action";
import { Button, Rating } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import { EditPopUpRating } from "./EditPopUpRating";
import "../App.css";
const MyAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [popUp, setPopUp] = useState(false);
  const [movieData, setmovieData] = useState({});
  const [readmore, setReadmore] = useState(false);

  const myreviews = useSelector((state) => state.myreviews);
  const sdata = useSelector((state) => state);
  const movieURL = "https://image.tmdb.org/t/p/w500";
  const usersLogin = useSelector((state) => state.usersLogin);
  useEffect(() => {
    getMyrevies();
  }, []);

  const getMyrevies = async () => {
    const getMyReviewsRef = collection(db, "reviews");
    let userName = usersLogin?.username;
    if (userName === undefined) {
      userName = "";
    }
    const q = query(getMyReviewsRef, where("username", "==", userName));
    await getDocs(q).then((response) => {
      response.forEach((data) => {
        let element = data.data();
        const existingIndex = myreviews.findIndex(
          (item) => item.id === element.id
        );
        if (existingIndex === -1) {
          dispatch(toStoreUserReviewsData(data.data()));
        }
      });
    });
  };

  const handleClickOnReadMore = () => {
    setReadmore(!readmore);
  };
  const handleDeleteReview = async (review) => {
    dispatch(toDeleteTheReviewData(review));
    await deleteDoc(doc(db, "reviews", review.uniquId)).then((res) => {
      navigate("/");
      getMyrevies();
    });
  };
  const handleEditReview = (review) => {
    setPopUp(!popUp);
    setmovieData(review);
  };

  return (
    <div>
      <CommonComponent />
      <main className="content">
        <div>
          {popUp ? <EditPopUpRating movieData={movieData} /> : null}
          <div className="MyReviesMainDiv">
            {myreviews.length > 0 ? (
              myreviews.map((review, index) => {
                return (
                  <div className="revieswPAge" key={index}>
                    <div className="UserDiv">
                      <div className="UserNname">
                        <img src={review.user_image} />
                        <h2>{review.username}</h2>
                      </div>
                      <hr />
                      <Rating name="read-only" value={review.rating} readOnly />
                      <div className="ContentInMyReview">
                        {readmore ? (
                          <p>{review.content}</p>
                        ) : review.content.length > 170 ? (
                          <p>{review.content.slice(0, 170) + "...."}</p>
                        ) : (
                          <p>{review.content}</p>
                        )}
                      </div>
                      <div className="BtnDiv">
                        <Button
                          variant="contained"
                          onClick={() => handleClickOnReadMore()}
                        >
                          Read More
                        </Button>
                        <div className="editBtn">
                          <EditCalendarIcon
                            onClick={() => handleEditReview(review)}
                          />
                        </div>
                        <div className="btnBack">
                          <DeleteIcon
                            onClick={() => handleDeleteReview(review)}
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      onClick={() =>
                        navigate("/movieDteails", { state: review })
                      }
                      className="imagePoster"
                    >
                      <img src={movieURL + review.poster_path} />
                    </div>
                  </div>
                );
              })
            ) : (
              <h1
                style={{
                  textAlign: "center",
                  color: "orange",
                  marginLeft: "6rem",
                }}
              >
                NOT FOUN ANY REVIEW PLEASE ADD !!{" "}
              </h1>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyAccount;
