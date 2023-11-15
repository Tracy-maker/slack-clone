import React from "react";
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import styled from "styled-components";
import Chat from "./components/Chat/Chat";
import "./App.css";
import Login from "./components/Login/Login";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";

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
