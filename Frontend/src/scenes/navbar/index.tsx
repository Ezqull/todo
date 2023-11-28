import { logOut } from "../../shared/auth";
import { Link } from "react-router-dom";

function Navbar() {
  const flexBetween = "flex items-center justify-between";

  return (
    <nav>
      <div
        className={`${flexBetween} bg-primary-gray-100 shadow-sm shadow-primary-dark-500 shadow-transparen fixed top-0 z-30 w-full py-4`}
      >
        <div className={`${flexBetween} mx-auto w-5/6 px-4`}>
          <div className="flex flex-col justify-center items-center leading-[0] logo">
            <div className="font-bold text-3xl">Ask.It</div>
            <span className="tracking-[0.2rem]">then task it</span>
          </div>
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
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
