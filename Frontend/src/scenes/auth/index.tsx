import React, { useState } from "react";
import Login from "./login";
import SignUp from "./signup";

type Props = {};

const Auth = (props: Props) => {
  const [isSignIn, setIsSignIn] = useState(false);

  return (
    <div>
      {isSignIn ? (
        <div>
          <Login />
        </div>
      ) : (
        <div>
          <SignUp />
        </div>
      )}
    </div>
  );
};

export default Auth;
