import React from "react";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import styled from "styled-components";
import { useAuthState } from "react-firebase-hooks/auth";
import Spinner from "react-spinkit";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import { auth } from "./services/firebase";
import Login from "./components/Login";
import "./App.css";

function App() {
  const [user, loading] = useAuthState(auth);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Chat />,
    },
  ]);

  if (loading) {
    return (
      <AppLoading>
        <AppLoadingContents>
          <img
            src="https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg"
            alt=""
          />
          <Spinner name="ball-spin-fade-loader" color="purple" fadeIn="none" />
        </AppLoadingContents>
      </AppLoading>
    );
  }

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <>
          <Header />
          <AppBody>
            <Sidebar />
            <RouterProvider router={router} />
            {/** Chat */}
          </AppBody>
        </>
      )}
    </div>
  );
}

export default App;