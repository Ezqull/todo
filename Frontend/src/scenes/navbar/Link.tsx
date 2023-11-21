import {
  ArchiveBoxIcon,
  CalendarIcon,
  ChartPieIcon,
  ListBulletIcon,
} from "@heroicons/react/24/solid";
import { SelectedPage } from "../../shared/types";

type Props = {
  page: string;
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage) => void;
};

const Link = ({ page, selectedPage, setSelectedPage }: Props) => {
  const lowerCasePage = page.toLowerCase().replace(/ /g, "") as SelectedPage;

  return (
    <div
      className={`${selectedPage === lowerCasePage ? "primary-dark-300" : ""}
        transition duration-500 hover:primary-dark-400 cursor-none
      `}
      onClick={() => {
        setSelectedPage(lowerCasePage);
        localStorage.setItem("page", lowerCasePage);
      }}
    >
      {lowerCasePage === "calendar" ? (
        <CalendarIcon className="w-8 h-8 cursor-pointer" />
      ) : lowerCasePage === "home" ? (
        <ListBulletIcon className="w-8 h-8 cursor-pointer" />
      ) : lowerCasePage === "statistics" ? (
        <ChartPieIcon className="w-8 h-8 cursor-pointer" />
      ) : lowerCasePage === "archive" ? (
        <ArchiveBoxIcon className="w-8 h-8 cursor-pointer" />
      ) : (
        lowerCasePage === "logout" && (
          <div
            onClick={() => {
              localStorage.removeItem("jwtToken");
              localStorage.removeItem("page");
              window.location.reload();
            }}
          >
            Log Out
          </div>
        )
      )}
    </div>
  );
};

export default Link;
