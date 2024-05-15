import React, { useEffect } from "react";
import {
  getNowPopular,
  getNowTopRated,
  getNowplaying,
  getUpComing,
} from "../redux/action";
import { useDispatch, useSelector } from "react-redux";
import { Paper } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CommonComponent from "./CommonComponent";
import "../App.css";

const MoviesList = () => {
  const movieURL = "https://image.tmdb.org/t/p/w500";
  const data = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const getDataNowplaying = () => {
      axios
        .get(
          "https://api.themoviedb.org/3/movie/now_playing?api_key=f8dfb8d470b265f5487cb520485cec71&append_to_response=videos,images&language=en-US&page=1"
        )
        .then((response) => {
          dispatch(getNowplaying(response.data.results));
        });
    };

    const getDataNowPopular = () => {
      axios
        .get(
          "https://api.themoviedb.org/3/movie/popular?api_key=f8dfb8d470b265f5487cb520485cec71&&append_to_response=videos,images&page=1"
        )
        .then((response) => {
          dispatch(getNowPopular(response.data.results));
        });
    };
    const getDataTopRated = () => {
      axios
        .get(
          "https://api.themoviedb.org/3/movie/top_rated?api_key=f8dfb8d470b265f5487cb520485cec71&&append_to_response=videos,images&page=1"
        )
        .then((response) => {
          dispatch(getNowTopRated(response.data.results));
        });
    };
    const getDataUpcoming = () => {
      axios
        .get(
          "https://api.themoviedb.org/3/movie/upcoming?api_key=f8dfb8d470b265f5487cb520485cec71&&append_to_response=videos,images&page=1"
        )
        .then((response) => {
          dispatch(getUpComing(response.data.results));
        });
    };
    getDataNowplaying();
    getDataNowPopular();
    getDataTopRated();
    getDataUpcoming();
  }, []);
  return (
    <div>
      <CommonComponent />
      <main className="content">
        <div className="moviesListsDiv">
          <div className="moviesDiv">
            <p>Now Playing</p>
            <div className="nowplayinDiv">
              {data.nowPlayingMovies.map((movie, index) => {
                return (
                  <Paper className="nowPlayingPaper" key={index}>
                    <img
                      src={movieURL + movie.poster_path}
                      onClick={() =>
                        navigate("/movieDteails", { state: movie })
                      }
                    />
                    {movie.original_title.length >= 15 ? (
                      <h4> {movie.original_title.slice(0, 15) + "..."}</h4>
                    ) : (
                      <h4> {movie.original_title}</h4>
                    )}
                  </Paper>
                );
              })}
            </div>
          </div>
          <div className="moviesDiv">
            <p>Now Popular</p>
            <div className="nowplayinDiv">
              {data.nowPopularMovies.map((movie, index) => {
                return (
                  <Paper className="nowPlayingPaper" key={index}>
                    <img
                      src={movieURL + movie.poster_path}
                      onClick={() =>
                        navigate("/movieDteails", { state: movie })
                      }
                    />
                    {movie.original_title.length >= 15 ? (
                      <h4> {movie.original_title.slice(0, 15) + "..."}</h4>
                    ) : (
                      <h4> {movie.original_title}</h4>
                    )}
                  </Paper>
                );
              })}
            </div>
          </div>

          <div className="moviesDiv">
            <p>Top Rated</p>
            <div className="nowplayinDiv">
              {data.topRatedMovies.map((movie, index) => {
                return (
                  <Paper className="nowPlayingPaper" key={index}>
                    <img
                      src={movieURL + movie.poster_path}
                      onClick={() =>
                        navigate("/movieDteails", { state: movie })
                      }
                    />
                    {movie.original_title.length >= 15 ? (
                      <h4> {movie.original_title.slice(0, 15) + "..."}</h4>
                    ) : (
                      <h4> {movie.original_title}</h4>
                    )}
                  </Paper>
                );
              })}
            </div>
          </div>
          <div className="moviesDiv">
            <p>Upcoming</p>
            <div className="nowplayinDiv">
              {data.upComingMovies.map((movie, index) => {
                return (
                  <Paper className="nowPlayingPaper" key={index}>
                    <img
                      src={movieURL + movie.poster_path}
                      onClick={() =>
                        navigate("/movieDteails", { state: movie })
                      }
                    />
                    {movie.original_title.length >= 15 ? (
                      <h4> {movie.original_title.slice(0, 15) + "..."}</h4>
                    ) : (
                      <h4> {movie.original_title}</h4>
                    )}
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

export default MoviesList;
