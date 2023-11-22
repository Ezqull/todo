import { useEffect, useState } from "react";
import useMediaQuery from "./hooks/useMediaQuery";
import Navbar from "./scenes/navbar/";
import Board from "./scenes/taskBoard";
import Options from "./scenes/options";
import Auth from "./scenes/auth";
import { motion, useMotionValue } from "framer-motion";
import Calendar from "./scenes/calendar";
import Archive from "./scenes/archive";
import Statistics from "./scenes/statistics";
import { Route, Routes } from "react-router-dom";
import { getExpirationDateFromToken, isTokenExpired } from "./shared/auth";

function App() {
  const isAboveMediumScreens = useMediaQuery("(min-width:1060px)");
  const isAboveSmallScreens = useMediaQuery("(min-width:768px)");

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>();
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("jwtToken") !== null ? true : false);
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 8);
      cursorY.set(e.clientY - 8);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, [cursorX, cursorY]);

  return (
    <div className="h-full w-full">
      <motion.div
        className="cursor"
        style={{
          translateX: cursorX,
          translateY: cursorY,
        }}
        transition={{
          duration: 0.1,
        }}
      ></motion.div>
      {isLoggedIn && !isTokenExpired(Number(getExpirationDateFromToken())) ? (
        <div className="app bg-primary-dark-500">
          <Navbar />
          {isAboveMediumScreens ? (
            <div
              className={`flex items-center justify-center fixed top-[10%] w-full h-[90%]`}
            >
              <div className="h-4/5 w-5/6 flex flex-row justify-between gap-12">
                <Routes>
                  <Route index element={<Board />} />
                  <Route path="/calendar" element={<Calendar />} />
                  <Route path="/archive" element={<Archive />} />
                  <Route path="/statistics" element={<Statistics />} />
                </Routes>
                <Options />
              </div>
            </div>
          ) : isAboveSmallScreens ? (
            <div
              className={`flex items-center justify-center fixed top-[10%] w-full h-[100%]`}
            >
              <div className="h-full w-5/6 flex flex-col-reverse justify-end gap-12 mt-[5%]">
                <Routes>
                  <Route index element={<Board />} />
                  <Route path="/calendar" element={<Calendar />} />
                  <Route path="/archive" element={<Archive />} />
                  <Route path="/statistics" element={<Statistics />} />
                </Routes>
                <div className="h-[20%]">
                  <Options />
                </div>
              </div>
            </div>
          ) : (
            <div
              className={`flex flex-col gap-10 items-center justify-center fixed top-[9%] w-full h-[90%] pt-4`}
            >
              <div className="h-[85%] w-5/6 flex flex-col-reverse justify-between gap-12 mt-5">
                <Routes>
                  <Route index element={<Board />} />
                  <Route path="/calendar" element={<Calendar />} />
                  <Route path="/archive" element={<Archive />} />
                  <Route path="/statistics" element={<Statistics />} />
                </Routes>
              </div>
              <div className="h-[7.5%] w-full">
                <Options />
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="app bg-primary-dark-500 h-full w-full">
          <Auth />
        </div>
      )}
    </div>
  );
}

export default App;
