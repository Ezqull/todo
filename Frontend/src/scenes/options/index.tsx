import {
  PlusIcon,
  CheckIcon,
  ListBulletIcon,
  CalendarIcon,
  ChartPieIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/24/solid";
import useMediaQuery from "../../hooks/useMediaQuery";
import { useState } from "react";
import { TaskRequest } from "../../shared/types";
import { createTask } from "../../shared/tasks";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Options() {
  const flexBetween = "flex flex-col items-center justify-between";
  const inputStyleBig =
    "w-full bg-primary-dark-500 border-2 border-primary-gray-100 rounded-xl text-primary-gray-100 p-2";
  const inputStyleMed =
    "bg-primary-dark-500 rounded-xl text-primary-gray-100 p-2";
  const transition =
    "transition ease-in focus:bg-primary-gray-100 focus:border-2 focus:border-primary-dark-500 focus:shadow-primary-gray-100 focus:outline-none focus:text-primary-dark-500";

  const isAboveMediumScreens = useMediaQuery("(min-width:1060px)");
  const isAboveSmallScreens = useMediaQuery("(min-width:768px)");

  const [title, setTitle] = useState("");
  const [isToday, setIsToday] = useState(false);
  const [priority, setPriority] = useState<number>(1);
  const [taskDate, setTaskDate] = useState<Date>();
  const [finishDate, setFinishDate] = useState<Date>();
  const jwtToken: string | null = localStorage.getItem("jwtToken");

  const [isAdding, setIsAdding] = useState(false);

  const formatDateToString = (date: Date) => {
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();

    const formattedDate = dd + "-" + mm + "-" + yyyy;

    return formattedDate;
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    setTaskDate(new Date());
    setFinishDate(new Date());

    if (isToday) {
      const formattedDate = formatDateToString(new Date());
      const task: TaskRequest = {
        title: title,
        description: "",
        priority: priority,
        isDone: !isToday,
        taskDate: formattedDate,
        finishDate: formattedDate,
        email: "",
      };
      createTask(jwtToken, task);
    } else {
      const task: TaskRequest = {
        title: title,
        description: "",
        priority: priority,
        isDone: isToday,
        taskDate: formatDateToString(taskDate as Date),
        finishDate: formatDateToString(finishDate as Date),
        email: "",
      };
      createTask(jwtToken, task);
    }
  };

  return (
    <>
      {isAboveMediumScreens ? (
        <div className="w-[19%] h-full bg-primary-gray-100 rounded-[2rem] flex flex-row p-6">
          <div className="h-full w-full">
            <form className={`${flexBetween} gap-6`} onSubmit={handleSubmit}>
              <div className="w-full">
                <label htmlFor="title">Title</label>
                <input
                  className={`${inputStyleBig} ${transition}`}
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="flex flex-row gap-4 w-full">
                <div className="flex flex-col items-start justify-start gap-1 flex-grow w-1/2">
                  <label htmlFor="isToday">Today?</label>
                  {isToday ? (
                    <div
                      className="w-8 h-8 bg-primary-dark-500 border-solid border-2 rounded-md"
                      onClick={() => setIsToday(!isToday)}
                    >
                      <CheckIcon className="text-primary-gray-100"></CheckIcon>
                    </div>
                  ) : (
                    <div
                      className="w-8 h-8 border-solid border-2 border-primary-dark-500 rounded-md"
                      onClick={() => setIsToday(!isToday)}
                    ></div>
                  )}
                </div>
                <div className="w-1/2">
                  <label htmlFor="prio">Priority</label>
                  <input
                    className={`${inputStyleBig} ${transition}`}
                    type="number"
                    name="prio"
                    id="prio"
                    min={1}
                    max={10}
                    defaultValue={priority}
                    onChange={(e) => setPriority(Number(e.target.value))}
                  />
                </div>
              </div>
              {!isToday && (
                <div className="w-full">
                  <label htmlFor="date">Task Date</label>
                  <input
                    id="date"
                    className={`${inputStyleBig} ${transition}`}
                    type="date"
                    onChange={(e) => setTaskDate(new Date(e.target.value))}
                    disabled={isToday}
                  />
                  <label htmlFor="date">Finish Date</label>
                  <input
                    id="date"
                    className={`${inputStyleBig} ${transition}`}
                    type="date"
                    onChange={(e) => setFinishDate(new Date(e.target.value))}
                    disabled={isToday}
                  />
                </div>
              )}
              <button
                type="submit"
                onClick={() => handleSubmit}
                className="bg-primary-dark-500 w-10 h-10 rounded-full"
              >
                <PlusIcon className="text-primary-gray-100"></PlusIcon>
              </button>
            </form>
            <hr className="bg-primary-dark-500 h-1 w-full mt-6" />
            <div className="h-1/2 w-full flex flex-col">
              <div className="flex flex-row w-full h-10 justify-evenly mt-4">
                <button className="w-8 h-8 cursor-none">
                  <Link to="/">
                    <ListBulletIcon className="w-8 h-8 cursor-none" />
                  </Link>
                </button>
                <button className="w-8 h-8 cursor-none">
                  <Link to="/calendar">
                    <CalendarIcon className="w-8 h-8 cursor-none" />
                  </Link>
                </button>
              </div>
              <div className="flex flex-row w-full h-10 justify-evenly mt-4">
                <button className="w-8 h-8 cursor-none">
                  <Link to="/statistics">
                    <ChartPieIcon className="w-8 h-8 cursor-none" />
                  </Link>
                </button>
                <button className="w-8 h-8 cursor-none">
                  <Link to="/archive">
                    <ArchiveBoxIcon className="w-8 h-8 cursor-none" />
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : isAboveSmallScreens ? (
        <div className="h-full w-full bg-primary-gray-100 rounded-[2rem] py-2">
          <div className="h-full w-full flex flex-row gap-4">
            <form className="flex felx-row w-3/4">
              <div
                className={`$flex flex-row items-center justify-between gap-6 w-full`}
              >
                <div className="w-full h-1/2 flex flex-row justify-between px-8">
                  <div className="flex flex-col w-1/2">
                    <label htmlFor="title">Title</label>
                    <input
                      className={`${inputStyleMed} ${transition}`}
                      id="title"
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="w-2/5">
                    <label htmlFor="prio">Priority</label>
                    <input
                      className={`${inputStyleBig} ${transition}`}
                      type="number"
                      name="prio"
                      id="prio"
                      min={1}
                      max={10}
                      defaultValue={1}
                    />
                  </div>
                </div>
                <div className="flex flex-row gap-9 w-full px-8 justify-between items-center">
                  <div className="w-1/2">
                    <label htmlFor="date">Task Date</label>
                    <input
                      id="date"
                      className={`${inputStyleBig} ${transition}`}
                      type="date"
                      disabled={isToday}
                    />
                  </div>
                  <div className="w-1/2">
                    <label htmlFor="date">Finish Date</label>
                    <input
                      id="date"
                      className={`${inputStyleBig} ${transition}`}
                      type="date"
                      disabled={isToday}
                    />
                  </div>
                  <div className="flex flex-col items-center justify-center gap-1 w-1/5">
                    <label htmlFor="isToday">Today?</label>
                    {isToday ? (
                      <div
                        className="w-8 h-8 bg-primary-dark-500 border-solid border-2 rounded-md"
                        onClick={() => setIsToday(!isToday)}
                      >
                        <CheckIcon className="text-primary-gray-100"></CheckIcon>
                      </div>
                    ) : (
                      <div
                        className="w-8 h-8 border-solid border-2 border-primary-dark-500 rounded-md"
                        onClick={() => setIsToday(!isToday)}
                      ></div>
                    )}
                  </div>
                </div>
              </div>
              <div className="py-12">
                <button
                  type="submit"
                  onClick={() => handleSubmit}
                  className="bg-primary-dark-500 w-10 h-10 rounded-full focus:bg-primary-gray-100 focus:text-primary-dark-500 focus:border-2 focus:border-primary-dark-500"
                >
                  <PlusIcon className="text-primary-gray-100"></PlusIcon>
                </button>
              </div>
            </form>
            <div className="bg-primary-dark-500 h-full w-1 rounded-full ml-5" />
            <div className="h-full flex flex-row w-1/5 mr-2">
              <div className="flex flex-col w-full justify-evenly items-center">
                <button className="w-8 h-8 cursor-none">
                  <Link to="/calendar">
                    <CalendarIcon className="w-8 h-8 cursor-none" />
                  </Link>
                </button>
                <button className="w-8 h-8 cursor-none">
                  <Link to="/">
                    <ListBulletIcon className="w-8 h-8 cursor-none" />
                  </Link>
                </button>
              </div>
              <div className="flex flex-col w-full justify-evenly">
                <button className="w-8 h-8 cursor-none">
                  <Link to="/statistics">
                    <ChartPieIcon className="w-8 h-8 cursor-none" />
                  </Link>
                </button>
                <button className="w-8 h-8 cursor-none">
                  <Link to="/archive">
                    <ArchiveBoxIcon className="w-8 h-8 cursor-none" />
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <motion.div
          animate={{
            y: isAdding ? -200 : 0,
          }}
          className={`${flexBetween} bg-primary-gray-100 shadow-sm shadow-primary-dark-500 fixed z-30 w-full h-[200%] z-1000 gap-4`}
        >
          <div className="w-full h-[3.5%]">
            <div className="h-full w-full flex flex-row justify-center items-center">
              <div className="flex flex-row w-[40%] h-full gap-4 justify-evenly items-center">
                <button className="w-8 h-8 cursor-none flex justify-center items-center">
                  <Link to="/statistics">
                    <ChartPieIcon className="w-8 h-8 cursor-none" />
                  </Link>
                </button>
                <button className="w-8 h-8 cursor-none">
                  <Link to="/archive">
                    <ArchiveBoxIcon className="w-8 h-8 cursor-none" />
                  </Link>
                </button>
              </div>
              <div
                className="w-[90px] h-[90px] rounded-full bg-primary-dark-500 text-primary-gray-100 border-2 border-primary-gray-100 translate-y-[-17.5%]"
                onClick={(e) => {
                  if (
                    isAdding &&
                    title &&
                    priority &&
                    (isToday || (taskDate && finishDate))
                  ) {
                    console.log(isAdding);
                    handleSubmit(e);
                  }
                  setTitle("");
                  setIsAdding(!isAdding);
                }}
              >
                <PlusIcon />
              </div>

              <div className="flex flex-row w-[40%] h-full gap-4 justify-evenly items-center">
                <button className="w-8 h-8 cursor-none">
                  <Link to="/calendar">
                    <CalendarIcon className="w-8 h-8 cursor-none" />
                  </Link>
                </button>
                <button className="w-8 h-8 cursor-none">
                  <Link to="/">
                    <ListBulletIcon className="w-8 h-8 cursor-none" />
                  </Link>
                </button>
              </div>
            </div>
          </div>
          <div className="w-full h-full">
            <form className="flex flex-col w-full">
              <div className="flex flex-col items-center justify-between gap-6 w-full">
                <div className="w-full h-1/2 flex flex-row justify-evenly">
                  <div className="flex flex-col w-1/2 px-4">
                    <label htmlFor="title">Title</label>
                    <input
                      className={`${inputStyleMed} ${transition}`}
                      id="title"
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-row justify-between w-1/2 px-4 pr-5">
                    <div>
                      <label htmlFor="prio">Priority</label>
                      <input
                        className={`${inputStyleBig} ${transition}`}
                        type="number"
                        name="prio"
                        id="prio"
                        min={1}
                        max={10}
                        defaultValue={1}
                      />
                    </div>
                    <div className="flex flex-col items-center justify-between w-1/5">
                      <label htmlFor="isToday">Today?</label>
                      {isToday ? (
                        <div
                          className="w-11 h-11 bg-primary-dark-500 border-solid border-2 rounded-xl"
                          onClick={() => setIsToday(!isToday)}
                        >
                          <CheckIcon className="text-primary-gray-100"></CheckIcon>
                        </div>
                      ) : (
                        <div
                          className="w-11 h-11 border-solid border-2 border-primary-dark-500 rounded-xl"
                          onClick={() => setIsToday(!isToday)}
                        ></div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="w-full h-1/2 flex flex-row justify-evenly">
                  <div className="flex flex-col w-1/2 px-4">
                    <label htmlFor="date">Task Date</label>
                    <input
                      id="date"
                      className={`${inputStyleBig} ${transition}`}
                      type="date"
                      disabled={isToday}
                    />
                  </div>
                  <div className="flex flex-col w-1/2 px-4">
                    <label htmlFor="date">Finish Date</label>
                    <input
                      id="date"
                      className={`${inputStyleBig} ${transition}`}
                      type="date"
                      disabled={isToday}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </motion.div>
      )}
    </>
  );
}

export default Options;
