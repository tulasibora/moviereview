import { Button, Divider, Paper, Rating } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getReviewsFromDataBase,
  toStoreCastNCrewData,
  toStoreParticularMovieRevies,
  toStoreReviewsWhenNoReviews,
  toStoreSimilarMovies,
} from "../redux/action";
import { RatingPopUp } from "./RatingPopUp";
import CommonComponent from "./CommonComponent";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import "../App.css";

const MovieDteails = () => {
  const location = useLocation();
  const mvBasedReviews = useSelector((state) => state.mvBasedReviews);
  const Sdata = useSelector((state) => state);
  const dispatch = useDispatch();
  const movieData = location.state;
  const [popUp, setPopUp] = useState(false);
  const movieURL = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieData.id}/credits?api_key=f8dfb8d470b265f5487cb520485cec71&language=en-US&page=1`
      )
      .then((response) => {
        dispatch(toStoreCastNCrewData(response.data));
      });
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieData.id}/similar?api_key=f8dfb8d470b265f5487cb520485cec71&language=en-US&page=1`
      )
      .then((response) => {
        dispatch(toStoreSimilarMovies(response.data.results));
      });
    //////////////
    const getReviewsOfthisMovie = () => {
      const getMyReviewsRef = collection(db, "reviews");
      const q = query(getMyReviewsRef, where("id", "==", movieData.id));
      getDocs(q).then((response) => {
        if (response.size === 0) {
          dispatch(toStoreReviewsWhenNoReviews());
        } else {
          response.forEach((data) => {
            let element = data.data();
            const existingIndex = mvBasedReviews.findIndex(
              (item) => item.content === element.content
            );
            if (existingIndex === -1) {
              dispatch(toStoreParticularMovieRevies(data.data()));
            }
          });
        }
      });
    };
    getReviewsOfthisMovie();
  }, []);

  const handleClickOnPostReview = () => {
    setPopUp(!popUp);
  };
  return (
    <div>
      <CommonComponent />
      <main className="content">
        <div>
          {popUp ? <RatingPopUp movieData={movieData} /> : null}
          <div className="movieDetailsmainDiv">
            <div className="movieDetailsLeftDiv">
              <div className="MovieDetailsImage">
                <img src={movieURL + movieData.poster_path} />
              </div>
              <h1>{movieData.original_title}</h1>
              <h2> Movie overview</h2>
              <p>{movieData.overview}</p>
              <Button
                variant="contained"
                onClick={() => handleClickOnPostReview()}
                className="postReviewBtn"
              >
                Post Review
              </Button>
              <h1> Cast & Crew</h1>
              <div className="CastNCrewOuterdiv">
                {Sdata.cast.map((element, i) => {
                  return (
                    <div className="CastNCrew" key={i}>
                      <img src={movieURL + element.profile_path} />
                      <h6>{element.name}</h6>
                    </div>
                  );
                })}
              </div>
              <h1>Similar Movies</h1>
              <div className="SimilarMoviesOuteDiv">
                {Sdata.similarMovies.map((movie, i) => {
                  return (
                    <div className="similarMv" key={i}>
                      <img src={movieURL + movie.poster_path} />
                      <h5>{movie.original_title}</h5>
                    </div>
                  );
                })}
              </div>
            </div>
            <Divider
              orientation="vertical"
              style={{ height: "auto", width: "1px", backgroundColor: "black" }}
            />
            <div className="movieDetailsRightDiv">
              <h1>Reviews By Cinema Elk Users </h1>
              <Divider orientation="horizontal" style={{ width: "35vw" }} />
              {mvBasedReviews.map((review) => {
                return (
                  <Paper>
                    <div className="reviewsInMdetail">
                      <div className="ReviewContent">
                        {review.content.length > 150 ? (
                          <p>{review.content.slice(0, 150) + "......"} </p>
                        ) : (
                          <p>{review.content} </p>
                        )}
                      </div>
                      <div className="bottomDev">
                        <div className="userDetailsmVd">
                          <img src={review.user_image} />
                          <h2>{review.username}</h2>
                        </div>
                        <Rating
                          name="read-only"
                          value={review.rating}
                          readOnly
                        />
                      </div>
                    </div>
                    <Divider
                      orientation="horizontal"
                      style={{ width: "40vw", backgroundColor: "lightgray" }}
                    />
                  </Paper>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MovieDteails;
