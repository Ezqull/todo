import { useEffect, useState } from "react";
import useMediaQuery from "../../hooks/useMediaQuery";
import { TaskResponse } from "../../shared/types";
import Task from "./task";
import { getTodaysTasks } from "../../shared/tasks";
import React from "react";

type Props = {};

const Board = ({}: Props) => {
  const isAboveMediumScreens = useMediaQuery("(min-width:1060px)");
  const isAboveSmallScreens = useMediaQuery("(min-width:768px)");
  const [tasks, setTasks] = useState<TaskResponse[]>([]);

  useEffect(() => {
    const jwtToken: string | null = localStorage.getItem("jwtToken");

    const fetchData = async () => {
      try {
        const response = await getTodaysTasks(jwtToken);

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

          const sortedTasks = modifiedTasks.sort(
            (a, b) => b.priority - a.priority
          );
          setTasks(sortedTasks);
          console.log(sortedTasks);
        }
      } catch (error) {
        console.error("Wystąpił błąd podczas pobierania danych: ", error);
      }
    };

    if (jwtToken) {
      fetchData();
    }
  }, []);

  return (
    <>
      {isAboveMediumScreens ? (
        <div className="w-[70%] h-full bg-primary-gray-100 rounded-[2rem] p-6">
          <span className="font-bold uppercase text-xl">Tasks For The Day</span>
          <div className="h-[90%] w-full   overflow-scroll">
            {tasks.map((task) => (
              <Task key={task.title} task={task} />
            ))}
          </div>
        </div>
      ) : isAboveSmallScreens ? (
        <div className="max-h-[100%] h-[57.5%] w-full bg-primary-gray-100 rounded-[2rem] p-6">
          <span className="font-bold uppercase text-xl">Tasks For The Day</span>
          <div className="h-[90%] w-full overflow-scroll">
            {tasks.map((task) => (
              <Task key={task.title} task={task} />
            ))}
          </div>
        </div>
      ) : (
        <div className="h-full w-full bg-primary-gray-100 rounded-[2rem] p-6 overflow-scroll no-scrollbar">
          <span className="font-bold uppercase text-xl">Tasks For The Day</span>
          <div className=" overflow-scroll">
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
