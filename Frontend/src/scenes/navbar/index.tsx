import React from "react";
import { SelectedPage } from "../../shared/types";
import Link from "./Link";

type Props = {
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage) => void;
};

function Navbar({ selectedPage, setSelectedPage }: Props) {
  const flexBetween = "flex items-center justify-between";

  return (
    <nav>
      <div
        className={`${flexBetween} bg-primary-gray-100 shadow-sm shadow-primary-dark-500 shadow-transparen fixed top-0 z-30 w-full py-6`}
      >
        <div className={`${flexBetween} mx-auto w-5/6 px-4`}>
          <div>NoCanDo</div>
          <Link
            page="LogOut"
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
          />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
