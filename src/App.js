import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./Components/Login";
import { useEffect } from "react";
import SignUp from "./Components/SignUp";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "./firebase";
import ReviewsPage from "./Components/ReviewsPage";
import MyAccount from "./Components/MyAccount";
import "./Components/Style.css";
import MoviesList from "./Components/MoviesList";
import MovieDteails from "./Components/MovieDteails";
import { toStoreUserData } from "./redux/action";
import { collection, getDocs } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storeData = useSelector((state) => state);
  const allUsers = useSelector((state) => state.allUsers);
  const usersLogin = useSelector((state) => state.usersLogin);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/");
      } else {
        navigate("/login");
      }
    });

    const getuserRef = collection(db, "users");
    getDocs(getuserRef).then((res) => {
      res.forEach((resp) => {
        let element = resp.data();
        const existingIndex = allUsers.findIndex(
          (item) => item.id === element.id
        );
        if (existingIndex === -1) {
          dispatch(toStoreUserData(resp.data()));
        }
      });
    });
  }, []);

  useEffect(() => {
    if (Object.keys(usersLogin).length === 0) {
      signOut(auth).then((res) => {
        console.log("log out");
      });
    }
  }, [usersLogin]);

  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<MoviesList />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/review" element={<ReviewsPage />} />
        <Route path="/account" element={<MyAccount />} />
        <Route path="/movieDteails" element={<MovieDteails />} />
      </Routes>
    </div>
  );
}

export default App;
