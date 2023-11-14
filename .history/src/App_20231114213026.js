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

const AppLoading = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;
`;

const AppLoadingContents = styled.div`
  text-align: center;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > img {
    height: 100px;
    padding: 20px;
    margin-bottom: 40px;
  }
`;

const AppBody = styled.div`
  display: flex;
  height: 100vh;
`;


function App() {
 

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Chat />,
    },
  ]);



  return (
    <div className="app">
     
        <Login />
       
        <>
          <Header />
          <AppBody>
            <Sidebar />
            <RouterProvider router={router} />

          </AppBody>
        </>
      
    </div>
  );
}

export default App;
