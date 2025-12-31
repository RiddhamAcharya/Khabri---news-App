import "./App.css";

import React, { useState } from "react";
import NavBar from "./components/NavBar";
import News from "./components/News";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoadingBar from "react-top-loading-bar";

const App = () => {
  const PageSize = 5;
  const apiKey = process.env.REACT_APP_NEWS_API;

  const [progress, setProgress] = useState(0);

  return (
    <>
      <Router>
        <NavBar />

        <LoadingBar
          height={3}
          color="#f11946"
          progress={progress}
        />

        <Routes>
          <Route
            path="/"
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key="general"
                PageSize={PageSize}
                country="us"
                category="general"
              />
            }
          />

          <Route
            path="/business"
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key="business"
                PageSize={PageSize}
                country="us"
                category="business"
              />
            }
          />

          <Route
            path="/entertainment"
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key="entertainment"
                PageSize={PageSize}
                country="us"
                category="entertainment"
              />
            }
          />

          <Route
            path="/sports"
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key="sports"
                PageSize={PageSize}
                country="us"
                category="sports"
              />
            }
          />

          <Route
            path="/general"
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key="general"
                PageSize={PageSize}
                country="us"
                category="general"
              />
            }
          />

          <Route
            path="/health"
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key="health"
                PageSize={PageSize}
                country="us"
                category="health"
              />
            }
          />

          <Route
            path="/science"
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key="science"
                PageSize={PageSize}
                country="us"
                category="science"
              />
            }
          />

          <Route
            path="/technology"
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key="technology"
                PageSize={PageSize}
                country="us"
                category="technology"
              />
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
