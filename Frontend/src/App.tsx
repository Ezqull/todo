import { useState } from "react";
import useMediaQuery from "./hooks/useMediaQuery";
import Navbar from "./scenes/navbar";
import { SelectedPage } from "./shared/types";
import Board from "./scenes/taskBoard";
import Options from "./scenes/options";

function App() {
  const flexBetween = "flex items-center justify-between";
  const isAboveMediumScreens = useMediaQuery("(min-width:1060px)");
  const isAboveSmallScreens = useMediaQuery("(min-width:768px)");
  const [selectedPage, setSelectedPage] = useState<SelectedPage>(
    SelectedPage.Home
  );

  return (
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
            <Board />
            <Options />
          </div>
        </div>
      ) : isAboveSmallScreens ? (
        <div
          className={`flex items-center justify-center fixed top-[10%] w-full h-[90%]`}
        >
          <div className="h-4/5 w-5/6 flex flex-col-reverse justify-between gap-12">
            <Board />
            <Options />
          </div>
        </div>
      ) : (
        <div
          className={`flex items-center justify-center fixed top-[10%] w-full h-[90%]`}
        >
          <div className="h-4/5 w-5/6 flex flex-col-reverse justify-between gap-12">
            <Board />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
