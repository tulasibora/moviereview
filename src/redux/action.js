export const getNowplaying = (payload) => {
  return {
    type: "NOWPLAYING",
    payload: payload,
  };
};
export const getNowPopular = (payload) => {
  return {
    type: "NOWPOPULAR",
    payload: payload,
  };
};
export const getNowTopRated = (payload) => {
  return {
    type: "TOPRATED",
    payload: payload,
  };
};
export const getUpComing = (payload) => {
  return {
    type: "UPCOMING",
    payload: payload,
  };
};
export const getReviewsFromDataBase = (payload) => {
  return {
    type: "REVIEW",
    payload: payload,
  };
};
export const toStoreCastNCrewData = (payload) => {
  return {
    type: "CASTNCREW",
    payload: payload,
  };
};
export const toStoreSimilarMovies = (payload) => {
  return {
    type: "SIMILARMOVIES",
    payload: payload,
  };
};
export const toStoreUserData = (payload) => {
  return {
    type: "USERS",
    payload: payload,
  };
};
export const toStoreUserReviewsData = (payload) => {
  return {
    type: "MYREVIEWS",
    payload: payload,
  };
};
export const toStoreParticularMovieRevies = (payload) => {
  return {
    type: "MVBASEDREVIEW",
    payload: payload,
  };
};
export const loginUserDetails = (payload) => {
  return {
    type: "LOGINUSER",
    payload: payload,
  };
};
export const toEditTheReviewData = (payload) => {
  return {
    type: "EditReview",
    payload: payload,
  };
};
export const toDeleteTheReviewData = (payload) => {
  return {
    type: "DeleteReview",
    payload: payload,
  };
};
export const handleListItemClick = (payload) => {
  return {
    type: "selectedIndex",
    payload: payload,
  };
};
export const toStoreReviewsWhenNoReviews = (payload) => {
  return {
    type: "whenZeroReview",
    payload: payload,
  };
};
