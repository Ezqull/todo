import { useEffect, useState } from "react";
import useMediaQuery from "../../hooks/useMediaQuery";
import { TaskResponse } from "../../shared/types";
import Task from "./task";
import { getTodaysTasks } from "../../shared/tasks";
import { motion } from "framer-motion";

const Board = () => {
  const isAboveMediumScreens = useMediaQuery("(min-width:1060px)");
  const isAboveSmallScreens = useMediaQuery("(min-width:768px)");
  const [tasks, setTasks] = useState<TaskResponse[]>([]);
  const [sortByPrio, setSortByPrio] = useState(false);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const jwtToken: string | null = localStorage.getItem("jwtToken");

    const fetchData = async () => {
      try {
        const response = await getTodaysTasks(jwtToken as string);

        if (response) {
          const modifiedTasks = response.map((task: TaskResponse) => {
            const taskDate = new Date(task.taskDate);
            const finishDate = new Date(task.finishDate);
            if (taskDate > finishDate) {
              task.isLate = true;
              return { ...task, priority: 10 };
            }
            return task;
          });

          const filteredTasks = modifiedTasks.filter((task: TaskResponse) => {
            if (filter === "all") {
              return true;
            } else if (filter === "low") {
              return task.priority <= 5;
            } else if (filter === "high") {
              return task.priority > 5;
            } else {
              return false;
            }
          });

          const sortedTasks = filteredTasks.sort(
            (a: TaskResponse, b: TaskResponse) => {
              if (!sortByPrio) {
                return b.priority - a.priority;
              } else {
                const dateA = new Date(a.finishDate).getTime();
                const dateB = new Date(b.finishDate).getTime();
                return dateA - dateB;
              }
            }
          );

          setTasks(sortedTasks);
        }
      } catch (error) {
        console.error("Wystąpił błąd podczas pobierania danych: ", error);
      }
    };

    if (jwtToken) {
      fetchData();
    }
  }, [sortByPrio, filter]);

  return (
    <>
      {isAboveMediumScreens ? (
        <div className="w-[70%] h-full bg-primary-gray-100 rounded-[2rem] p-6">
          <div className="w-full flex flex-row justify-between px-4">
            <span className="font-bold uppercase text-xl">
              Tasks For The Day
            </span>
            <div className="w-[70%] flex flex-col items-end gap-4">
              <div className="w-[45%] h-[60%] flex flex-row gap-[1%] rounded-full justify-center items-center shadow-md p-2 relative">
                <motion.div
                  animate={{
                    x:
                      filter === "all"
                        ? "-105%"
                        : filter === "low"
                        ? 0
                        : "105%",
                  }}
                  transition={{ duration: 0.5 }}
                  className="w-[29%] h-[80%] bg-primary-gray-100 absolute mix-blend-difference rounded-full"
                ></motion.div>
                <span
                  onClick={() => setFilter("all")}
                  className="w-[33%] text-center"
                >
                  ALL
                </span>
                <span
                  onClick={() => setFilter("low")}
                  className="w-[33%] text-center"
                >
                  LOW
                </span>
                <span
                  onClick={() => setFilter("high")}
                  className="w-[33%] text-center"
                >
                  HIGH
                </span>
              </div>
              <div className="w-[60%] h-[50%] flex flex-row gap-4 rounded-full justify-center items-center shadow-md p-2 relative">
                <motion.div
                  onClick={() => setSortByPrio(!sortByPrio)}
                  animate={{ x: sortByPrio ? "50%" : "-50%" }}
                  transition={{ duration: 0.5 }}
                  className="w-[48%] h-[80%] bg-primary-gray-100 absolute mix-blend-difference rounded-full"
                ></motion.div>
                <span
                  onClick={() => setSortByPrio(!sortByPrio)}
                  className="w-[45%] text-center"
                >
                  Priority
                </span>
                <span
                  onClick={() => setSortByPrio(!sortByPrio)}
                  className="w-[45%] text-center"
                >
                  Finish Date
                </span>
              </div>
            </div>
          </div>
          <div className="h-[90%] w-full overflow-scroll">
            {tasks.map((task) => (
              <Task key={task.title} task={task} />
            ))}
          </div>
        </div>
      ) : isAboveSmallScreens ? (
        <div className="max-h-[100%] h-[57.5%] w-full bg-primary-gray-100 rounded-[2rem] p-6">
          <div className="flex flex-row justify-between items-center mb-4">
            <span className="font-bold uppercase text-xl">
              Tasks For The Day
            </span>
            <div className="w-[70%] h-[20%] flex flex-row items-end gap-4">
              <div className="w-[45%] h-[60%] flex flex-row rounded-full justify-evenly items-center shadow-md p-2 relative">
                <motion.div
                  animate={{
                    x:
                      filter === "all"
                        ? "-105%"
                        : filter === "low"
                        ? 0
                        : "105%",
                  }}
                  transition={{ duration: 0.5 }}
                  className="w-[29%] h-[80%] bg-primary-gray-100 absolute mix-blend-difference rounded-full"
                ></motion.div>
                <span
                  onClick={() => setFilter("all")}
                  className="w-[33%] text-center"
                >
                  ALL
                </span>
                <span
                  onClick={() => setFilter("low")}
                  className="w-[33%] text-center"
                >
                  LOW
                </span>
                <span
                  onClick={() => setFilter("high")}
                  className="w-[33%] text-center"
                >
                  HIGH
                </span>
              </div>
              <div className="w-[50%] h-[50%] flex flex-row gap-4 rounded-full justify-center items-center shadow-md p-2 relative">
                <motion.div
                  onClick={() => setSortByPrio(!sortByPrio)}
                  animate={{ x: sortByPrio ? "50%" : "-50%" }}
                  transition={{ duration: 0.5 }}
                  className="w-[48%] h-[80%] bg-primary-gray-100 absolute mix-blend-difference rounded-full"
                ></motion.div>
                <span
                  onClick={() => setSortByPrio(!sortByPrio)}
                  className="w-[45%] text-center"
                >
                  Priority
                </span>
                <span
                  onClick={() => setSortByPrio(!sortByPrio)}
                  className="w-[45%] text-center"
                >
                  Finish Date
                </span>
              </div>
            </div>
          </div>
          <div className="h-[90%] w-full overflow-scroll">
            {tasks.map((task) => (
              <Task key={task.title} task={task} />
            ))}
          </div>
        </div>
      ) : (
        <div className="h-full w-full bg-primary-gray-100 rounded-[2rem] p-6 overflow-scroll no-scrollbar">
          <div className="flex flex-col justify-between items-center mb-4 gap-2">
            <span className="font-bold uppercase text-xl">
              Tasks For The Day
            </span>
            <div className="w-full h-[20%] flex flex-col items-center gap-4">
              <div className="w-[45%] h-[60%] flex flex-row gap-[1%] rounded-full justify-evenly items-center shadow-md p-2 relative">
                <motion.div
                  animate={{
                    x:
                      filter === "all"
                        ? "-105%"
                        : filter === "low"
                        ? 0
                        : "105%",
                  }}
                  transition={{ duration: 0.5 }}
                  className="w-[29%] h-[80%] bg-primary-gray-100 absolute mix-blend-difference rounded-full"
                ></motion.div>
                <span
                  onClick={() => setFilter("all")}
                  className="w-[33%] text-center"
                >
                  ALL
                </span>
                <span
                  onClick={() => setFilter("low")}
                  className="w-[33%] text-center"
                >
                  LOW
                </span>
                <span
                  onClick={() => setFilter("high")}
                  className="w-[33%] text-center"
                >
                  HIGH
                </span>
              </div>
              <div className="w-[50%] h-[50%] flex flex-row gap-4 rounded-full justify-center items-center shadow-md p-2 relative">
                <motion.div
                  onClick={() => setSortByPrio(!sortByPrio)}
                  animate={{ x: sortByPrio ? "50%" : "-50%" }}
                  transition={{ duration: 0.5 }}
                  className="w-[48%] h-[80%] bg-primary-gray-100 absolute mix-blend-difference rounded-full"
                ></motion.div>
                <span
                  onClick={() => setSortByPrio(!sortByPrio)}
                  className="w-[45%] text-center"
                >
                  Priority
                </span>
                <span
                  onClick={() => setSortByPrio(!sortByPrio)}
                  className="w-[45%] text-center"
                >
                  Finish Date
                </span>
              </div>
            </div>
          </div>{" "}
          <div className="overflow-scroll">
            {tasks.map((task) => (
              <Task key={task.title} task={task} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Board;
