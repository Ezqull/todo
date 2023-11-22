import { logOut } from "../../shared/auth";
import { Link } from "react-router-dom";

function Navbar() {
  const flexBetween = "flex items-center justify-between";

  return (
    <nav>
      <div
        className={`${flexBetween} bg-primary-gray-100 shadow-sm shadow-primary-dark-500 shadow-transparen fixed top-0 z-30 w-full py-6`}
      >
        <div className={`${flexBetween} mx-auto w-5/6 px-4`}>
          <div>NoCanDo</div>
          <Link to="/">
            <div
              onClick={() => {
                localStorage.removeItem("jwtToken");
                localStorage.removeItem("refreshToken");
                logOut();
                window.location.reload();
              }}
            >
              Log Out
            </div>{" "}
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
