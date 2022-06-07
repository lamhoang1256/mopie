import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { Suspense, useEffect } from "react";
import { auth, db } from "firebase-app/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { setCurrentUser } from "draft/Auth/auth.slice";
import { doc, getDoc } from "firebase/firestore";
import { useAppDispatch } from "./store";
import "i18n/i18next";

const MainLayout = React.lazy(() => import("layouts/MainLayout/MainLayout"));
const Home = React.lazy(() => import("pages/Home/Home"));
const SignUp = React.lazy(() => import("draft/Auth/SignUp"));
const SignIn = React.lazy(() => import("draft/Auth/SignIn"));
const Detail = React.lazy(() => import("pages/Detail/Detail"));
const Watch = React.lazy(() => import("draft/Watch/Watch"));
const Explore = React.lazy(() => import("draft/Explore/Explore"));
const Category = React.lazy(() => import("pages/Category/Category"));
const History = React.lazy(() => import("draft/History/History"));
const Search = React.lazy(() => import("draft/Search/Search"));
const Favorites = React.lazy(() => import("draft/Favorites/Favorites"));
const Community = React.lazy(() => import("draft/Community/Community"));

const App = () => {
  // check at page load if a user is authenticated
  const dispatch = useAppDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (userAuth) => {
      if (userAuth) {
        setTimeout(async () => {
          const docRef = doc(db, `users/${userAuth.uid}`);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) dispatch(setCurrentUser(docSnap.data()));
        }, 600);
      } else {
        dispatch(setCurrentUser(null));
      }
    });
    return unsubscribe;
  }, [dispatch]);

  return (
    <Suspense>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/watch/:id" element={<Watch />} />
            <Route path="/category/:id" element={<Category />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/history" element={<History />} />
            <Route path="/search" element={<Search />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/community" element={<Community />} />
          </Route>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
        </Routes>
      </Router>
    </Suspense>
  );
};

export default App;
