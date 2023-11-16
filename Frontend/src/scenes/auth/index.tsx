import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useMediaQuery from "../../hooks/useMediaQuery";
import { auth } from "../../shared/auth";
import React from "react";

type Props = {};

const Auth = (props: Props) => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [text, setText] = useState(false);

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const input =
    "border-2 border-primary-dark-500 transition ease-in focus:bg-primary-dark-500 focus:border-2 focus:border-primary-gray-100 focus:shadow-primary-gray-100 focus:outline-none focus:text-primary-gray-100";
  const button =
    "transition ease-in hover:bg-primary-gray-100 hover:border-2 hover:border-primary-dark-500 hover:shadow-primary-gray-100 hover:outline-transparent hover:text-primary-dark-500";

  const isAboveMediumScreens = useMediaQuery("(min-width:1060px)");
  const isAboveSmallScreens = useMediaQuery("(min-width:768px)");

  const textVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    auth(isSignIn, { email, password: pass });
  };

  return (
    <motion.div
      initial={{ backgroundColor: "#171717" }}
      animate={{
        backgroundColor: isSignIn ? "#171717" : "#FAFAFA",
      }}
      className=" h-full w-full flex flex-col justify-center items-center gap-4"
    >
      <div
        className={`overflow-hidden relative ${
          isAboveMediumScreens
            ? "w-[15%]"
            : isAboveSmallScreens
            ? "w-[33%]"
            : "w-[50%]"
        } h-[4rem] self-center flex items-center justify-center`}
      >
        <motion.h1
          initial={{ x: "-150%" }}
          animate={{ x: isSignIn ? 0 : "-150%" }}
          transition={{ duration: 0.75, ease: "easeInOut" }}
          onClick={() => setIsSignIn(!isSignIn)}
          className="absolute text-primary-gray-100 text-5xl"
        >
          Log In
        </motion.h1>
        <motion.h1
          initial={{ x: 0 }}
          animate={{ x: isSignIn ? "150%" : 0 }}
          transition={{ duration: 0.75, ease: "easeInOut" }}
          onClick={() => setIsSignIn(!isSignIn)}
          className="absolute text-primary-dark-500 text-5xl"
        >
          Sign Up
        </motion.h1>
      </div>

      <form
        className="flex flex-col gap-8 w-[20rem] mt-8"
        onSubmit={handleSubmit}
      >
        <div className="flex items-center justify-center">
          <motion.input
            animate={{
              width: "100%",
              size: 1,
              backgroundColor: isSignIn ? "#FAFAFA" : "#171717",
              borderColor: isSignIn ? "#171717" : "#FAFAFA",
              color: isSignIn ? "#171717" : "#FAFAFA",
            }}
            initial={{
              width: 0,
              size: 0,
            }}
            transition={{ duration: 0.75, ease: "easeInOut" }}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            placeholder="E-mail"
            className={`${input} rounded-full py-1 px-4 w-full`}
          />
        </div>
        <div className="flex items-center justify-center">
          <motion.input
            animate={{
              width: "100%",
              size: 1,
              backgroundColor: isSignIn ? "#FAFAFA" : "#171717",
              borderColor: isSignIn ? "#171717" : "#FAFAFA",
              color: isSignIn ? "#171717" : "#FAFAFA",
            }}
            initial={{
              width: 0,
              size: 0,
            }}
            transition={{ duration: 0.75, ease: "easeInOut" }}
            value={pass}
            required
            onChange={(e) => setPass(e.target.value)}
            placeholder="Password"
            type="password"
            className={`${input} rounded-full py-1 px-4`}
          />
        </div>
        <div className="flex justify-center">
          <motion.button
            animate={{
              backgroundColor: isSignIn ? "#171717" : "#FAFAFA",
              borderColor: isSignIn ? "#FAFAFA" : "#171717",
              color: isSignIn ? "#FAFAFA" : "#171717",
            }}
            initial={{ backgroundColor: "#171717", borderColor: "#FAFAFA" }}
            transition={{ duration: 0.75, ease: "easeInOut" }}
            type="submit"
            onClick={() => {}}
            className={`text-primary-gray-100 border-primary-gray-100 border-2 w-1/2 rounded-full py-1 px-4 ${button} mt-2`}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={text ? "login" : "signup"}
                variants={textVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {isSignIn ? "Log In" : "Sign Up"}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default Auth;
