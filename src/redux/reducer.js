const initialState = {
  allUsers: [],
  nowPlayingMovies: [],
  nowPopularMovies: [],
  topRatedMovies: [],
  upComingMovies: [],
  reviewsdb: [],
  cast: [],
  crew: [],
  similarMovies: [],
  usersLogin: {},
  myreviews: [],
  mvBasedReviews: [],
  selectedIndexValue: 0,
};
export const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "NOWPLAYING":
      return {
        ...state,
        nowPlayingMovies: payload,
      };
    case "NOWPOPULAR":
      return {
        ...state,
        nowPopularMovies: payload,
      };
    case "TOPRATED":
      return {
        ...state,
        topRatedMovies: payload,
      };
    case "UPCOMING":
      return {
        ...state,
        upComingMovies: payload,
      };
    case "REVIEW":
      return {
        ...state,
        reviewsdb: [...state.reviewsdb, payload],
      };
    case "CASTNCREW":
      const { cast, crew } = payload;
      return {
        ...state,
        cast: cast,
        crew: crew,
      };
    case "SIMILARMOVIES":
      return {
        ...state,
        similarMovies: payload,
      };
    case "USERS":
      return {
        ...state,
        allUsers: [...state.allUsers, payload],
      };
    case "MYREVIEWS":
      return {
        ...state,
        myreviews: [...state.myreviews, payload],
      };
    case "MVBASEDREVIEW":
      return {
        ...state,
        mvBasedReviews: [...state.mvBasedReviews, payload],
      };
    case "LOGINUSER":
      return {
        ...state,
        usersLogin: payload,
      };
    case "selectedIndex":
      return {
        ...state,
        selectedIndexValue: payload,
      };
    case "whenZeroReview":
      return {
        ...state,
        mvBasedReviews: [],
      };
    case "EditReview":
      const Index = state.myreviews.findIndex(
        (myreview) => myreview.uniquId == payload.uniquId
      );
      state.myreviews[Index] = payload;

      const allReviewsIndex = state.reviewsdb.findIndex(
        (review) => review.uniquId == payload.uniquId
      );
      state.reviewsdb[allReviewsIndex] = payload;
      return {
        ...state,
      };
    case "DeleteReview":
      const data = state.myreviews.filter(
        (elemet) => elemet.uniquId !== payload.uniquId
      );
      const allReviews = state.reviewsdb.filter(
        (elemet) => elemet.uniquId !== payload.uniquId
      );
      return {
        ...state,
        myreviews: data,
        reviewsdb: allReviews,
      };
    default:
      return {
        ...state,
      };
  }
};
