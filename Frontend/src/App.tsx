import { useEffect, useState } from "react";
import useMediaQuery from "./hooks/useMediaQuery";
import Navbar from "./scenes/navbar";
import { SelectedPage } from "./shared/types";
import Board from "./scenes/taskBoard";
import Options from "./scenes/options";
import Auth from "./scenes/auth";
import { motion, useMotionValue } from "framer-motion";
import Calendar from "./scenes/calendar";
import Archive from "./scenes/archive";

function App() {
  const isAboveMediumScreens = useMediaQuery("(min-width:1060px)");
  const isAboveSmallScreens = useMediaQuery("(min-width:768px)");
  const [selectedPage, setSelectedPage] = useState<SelectedPage>(
    (localStorage.getItem("page") as SelectedPage)
      ? localStorage.getItem("page")
      : SelectedPage.Home
  );
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
  }, []);

  return (
    <div className="h-full w-full">
      {isAboveSmallScreens && (
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
      )}
      {isLoggedIn ? (
        <div className="app bg-primary-dark-500">
          <Navbar
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
          ></Navbar>
          {isAboveMediumScreens ? (
            <div
              className={`flex items-center justify-center fixed top-[10%] w-full h-[90%]`}
            >
              <div className="h-4/5 w-5/6 flex flex-row justify-between gap-12">
                {selectedPage === "home" ? (
                  <Board />
                ) : selectedPage === "calendar" ? (
                  <Calendar />
                ) : selectedPage === "archive" ? (
                  <Archive />
                ) : (
                  selectedPage === "statistics" && <div></div>
                )}
                <Options
                  selectedPage={selectedPage}
                  setSelectedPage={setSelectedPage}
                />
              </div>
            </div>
          ) : isAboveSmallScreens ? (
            <div
              className={`flex items-center justify-center fixed top-[10%] w-full h-[100%]`}
            >
              <div className="h-full w-5/6 flex flex-col-reverse justify-end gap-12 mt-[5%]">
                {selectedPage === "home" ? (
                  <Board />
                ) : selectedPage === "calendar" ? (
                  <Calendar />
                ) : selectedPage === "archive" ? (
                  <Archive />
                ) : (
                  selectedPage === "statistics" && <div></div>
                )}
                <div className="h-[20%]">
                  <Options
                    selectedPage={selectedPage}
                    setSelectedPage={setSelectedPage}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div
              className={`flex items-center justify-center fixed top-[10%] w-full h-[90%]`}
            >
              <div className="h-4/5 w-5/6 flex flex-col-reverse justify-between gap-12">
                {selectedPage === "home" ? (
                  <Board />
                ) : selectedPage === "calendar" ? (
                  <Calendar />
                ) : selectedPage === "archive" ? (
                  <Archive />
                ) : (
                  selectedPage === "statistics" && <div></div>
                )}
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
