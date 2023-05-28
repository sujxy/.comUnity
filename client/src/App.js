import React from "react";
import LoginPage from "scenes/loginPage";
import HomePage from "scenes/homePage";
import ProfilePage from "scenes/profilePage";
import ComunityPage from "scenes/comunityPage";
import CreateComunityPage from "scenes/createComunityPage";
import MessagePage from "scenes/messagePage";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import LandingPage from "scenes/landingPage";

function App() {
  const mode = useSelector((state) => {
    return state.mode;
  });
  const isAuth = useSelector((state) => state.token);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<LoginPage />} />
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/auth" />}
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/auth" />}
            />
            <Route
              path="/comunity/:comId"
              element={isAuth ? <ComunityPage /> : <Navigate to="/auth" />}
            />
            <Route
              path="/create"
              element={
                isAuth ? <CreateComunityPage /> : <Navigate to="/auth" />
              }
            />
            <Route
              path="/messages"
              element={isAuth ? <MessagePage /> : <Navigate to="/auth" />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
