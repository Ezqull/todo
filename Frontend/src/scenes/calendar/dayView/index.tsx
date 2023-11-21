import { TaskResponse } from "../../../shared/types";
import useMediaQuery from "../../../hooks/useMediaQuery";
import DayTask from "./dayTask";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Props = {
  tasksForTheDay: TaskResponse[];
  day: Date;
};

function DayView({ tasksForTheDay, day }: Props) {
  const isAboveMediumScreens = useMediaQuery("(min-width:1060px)");
  const isAboveSmallScreens = useMediaQuery("(min-width:768px)");
  const [tasks, setTasks] = useState(tasksForTheDay);
  const [expand, setExpand] = useState(false);

  useEffect(() => {
    const getTasksForDay = (date: Date): TaskResponse[] => {
      return tasksForTheDay.filter(
        (task) =>
          (new Date(task.taskDate).toLocaleDateString() ===
            date.toLocaleDateString() &&
            !task.isFinishDay) ||
          (new Date(task.finishDate).toLocaleDateString() ===
            date.toLocaleDateString() &&
            task.isFinishDay)
      );
    };
    setTasks(getTasksForDay(day));
  }, [day, tasksForTheDay]);

  return (
    <>
      {isAboveMediumScreens ? (
        <div className="h-[95%] flex flex-col gap-6">
          <div className="w-full h-12 rounded-xl bg-primary-gray-200 px-6 flex items-center justify-center flex-shrink-0">
            <span className="drop-shadow-md shadow-primary-dark-500">
              {day.toLocaleDateString()}
            </span>
          </div>
          <div className="flex flex-col gap-4 overflow-y-auto h-[80%]">
            {tasks.map((task: TaskResponse) => (
              <DayTask task={task} />
            ))}
          </div>
        </div>
      ) : isAboveSmallScreens ? (
        <div className="h-[20%] w-full flex flex-row items-center gap-6">
          <div className="w-[20%] h-[3rem] rounded-xl bg-primary-gray-200 px-6 flex items-center justify-center">
            <span className="drop-shadow-md shadow-primary-dark-500 self-center">
              {day.toLocaleDateString()}
            </span>
          </div>
          <div className="flex flex-row items-center justify-start gap-4 overflow-y-auto h-[100%] w-full">
            {tasks.map((task: TaskResponse) => (
              <DayTask task={task} />
            ))}
          </div>
        </div>
      ) : (
        <motion.div
          initial={false}
          animate={{
            height: expand
              ? "100%"
              : tasks.length > 2
              ? "14.5rem"
              : tasks.length == 0
              ? "8rem"
              : "12rem",
          }}
          className="w-full flex flex-col items-center gap-6 bg-primary-dark-100 shadow-xl rounded-xl p-6 flex-grow-0"
        >
          <div className="w-[40%] rounded-full bg-primary-gray-200 flex items-center justify-center">
            <span className="drop-shadow-md shadow-primary-dark-500 self-center">
              {day.toLocaleDateString()}
            </span>
          </div>
          <div className="flex flex-row flex-wrap items-start justify-start gap-x-[10%] gap-y-[5px] h-[100%] w-full overflow-y-hidden">
            {tasks.length != 0 ? (
              tasks.map((task: TaskResponse) => <DayTask task={task} />)
            ) : (
              <div className="w-full uppercase text-xl flex justify-center items-center">
                <span>No tasks for the day :D</span>
              </div>
            )}
          </div>
          {tasks.length > 2 && (
            <div
              className="w-full bg-primary-dark-500 rounded-full text-primary-gray-100 text-center"
              onClick={() => setExpand(!expand)}
            >
              {!expand ? "Click to see more" : "Click to hide"}
            </div>
          )}
        </motion.div>
      )}
    </>
  );
}

export default DayView;
