import useMediaQuery from "../../hooks/useMediaQuery";
import { SelectedPage } from "../../shared/types";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import Link from "./Link";
import { useState } from "react";

type Props = {
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage) => void;
};

function Navbar({ selectedPage, setSelectedPage }: Props) {
  const flexBetween = "flex items-center justify-between";
  const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false);
  const isAboveSmallScreens = useMediaQuery("(min-width: 768px)");

  return (
    <nav>
      <div
        className={`${flexBetween} bg-primary-gray-100 shadow-sm shadow-primary-dark-500 shadow-transparen fixed top-0 z-30 w-full py-6`}
      >
        <div className={`${flexBetween} mx-auto w-5/6`}>
          <div>NoCanDo</div>

          {isAboveSmallScreens ? (
            <div className={`${flexBetween} w-1/3`}>
              <Link
                page="Home"
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
              />
              <Link
                page="Sign In"
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
              />
              <Link
                page="Sign Up"
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
              />
            </div>
          ) : (
            <button
              className="rounded-full bg-secondary-500 p-2"
              onClick={() => setIsMenuToggled(!isMenuToggled)}
            >
              <Bars3Icon className="h-6 w-6 text-primary-dark-500" />
            </button>
          )}
        </div>
      </div>

      {!isAboveSmallScreens && isMenuToggled && (
        <div className="fixed right-0 bottom-0 z-40 h-full w-[250px] bg-primary-dark-400 text-primary-gray-100 drop-shadow-xl transition ease-in-out">
          <div className="flex justify-end p-12">
            <button onClick={() => setIsMenuToggled(!isMenuToggled)}>
              <XMarkIcon className="h-6 w-6 text-gray-400" />
            </button>
          </div>

          <div className="ml-[33%] flex flex-col gap-10 text-2xl">
            <Link
              page="Home"
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            />
            <Link
              page="Sign In"
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            />
            <Link
              page="Sign Up"
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            />
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
