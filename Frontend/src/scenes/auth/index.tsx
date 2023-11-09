import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Props = {};

const Auth = (props: Props) => {
  const darkBg =
    " h-full w-full flex flex-col justify-center items-center gap-4 bg-primary-dark-500";
  const lightBg =
    " h-full w-full flex flex-col justify-center items-center gap-4 bg-primary-gray-100";

  const [isSignIn, setIsSignIn] = useState(true);
  const [text, setText] = useState(false);
  const input =
    "border-2 border-primary-dark-500 transition ease-in focus:bg-primary-dark-500 focus:border-2 focus:border-primary-gray-100 focus:shadow-primary-gray-100 focus:outline-none focus:text-primary-gray-100";
  const button =
    "transition ease-in hover:bg-primary-gray-100 hover:border-2 hover:border-primary-dark-500 hover:shadow-primary-gray-100 hover:outline-transparent hover:text-primary-dark-500";
  const [isPage, setIsPage] = useState(false);

  const textVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      initial={{ backgroundColor: "#171717" }}
      animate={{
        backgroundColor: !text ? "#171717" : "#FAFAFA",
      }}
      className=" h-full w-full flex flex-col justify-center items-center gap-4"
    >
      <div className="overflow-hidden relative w-[13%] h-[4rem] self-center flex items-center justify-center">
        <motion.h1
          initial={{ x: 0 }}
          animate={{ x: text ? "-150%" : "0%" }}
          transition={{ duration: 0.3 }}
          onClick={() => setText(!text)}
          className="absolute text-primary-gray-100 text-5xl"
        >
          Log In
        </motion.h1>
        <motion.h1
          initial={{ x: "150%" }}
          animate={{ x: text ? "0" : "150%" }}
          transition={{ duration: 0.3 }}
          onClick={() => setText(!text)}
          className="absolute text-primary-dark-500 text-5xl"
        >
          Sign Up
        </motion.h1>
      </div>

      <form className="flex flex-col gap-8 w-[20rem] mt-8">
        <div className="flex items-center justify-center">
          <motion.input
            animate={{
              width: "100%",
              size: 1,
              backgroundColor: !text ? "#FAFAFA" : "#171717",
              borderColor: !text ? "#171717" : "#FAFAFA",
              color: !text ? "#171717" : "#FAFAFA",
            }}
            initial={{
              width: 0,
              size: 0,
            }}
            transition={{ duration: 0.3 }}
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
              backgroundColor: !text ? "#FAFAFA" : "#171717",
              borderColor: !text ? "#171717" : "#FAFAFA",
              color: !text ? "#171717" : "#FAFAFA",
            }}
            initial={{
              width: 0,
              size: 0,
            }}
            transition={{ duration: 0.3 }}
            placeholder="Password"
            type="password"
            className={`${input} rounded-full py-1 px-4`}
          />
        </div>
        <div className="flex justify-center">
          <motion.button
            animate={{
              backgroundColor: !text ? "#171717" : "#FAFAFA",
              borderColor: !text ? "#FAFAFA" : "#171717",
              color: !text ? "#FAFAFA" : "#171717",
            }}
            initial={{ backgroundColor: "#171717", borderColor: "#FAFAFA" }}
            transition={{ duration: 0.3 }}
            type="submit"
            className={`text-primary-gray-100 border-primary-gray-100 border-2 w-1/2 rounded-full py-1 px-4 ${button} mt-2`}
          >
            <AnimatePresence exitBeforeEnter>
              <motion.span
                key={text ? "login" : "signup"}
                variants={textVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {!text ? "Log In" : "Sign Up"}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default Auth;
