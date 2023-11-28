import { useEffect, useState } from "react";
import useMediaQuery from "../../hooks/useMediaQuery";
import { TaskResponse, taskMapper } from "../../shared/types";
import { getArchivedTasks, setTasksUndone } from "../../shared/tasks";
import ArchivedTask from "./archived-task";
import { CheckIcon } from "@heroicons/react/24/solid";

const Archive = () => {
  const isAboveMediumScreens = useMediaQuery("(min-width:1060px)");
  const isAboveSmallScreens = useMediaQuery("(min-width:768px)");
  const [tasks, setTasks] = useState<TaskResponse[]>([]);
  const [tasksToUnarchive, setTasksToUnarchive] = useState<TaskResponse[]>([]);
  const [archivedStatus, setArchivedStatus] = useState<{
    [taskId: string]: boolean;
  }>({});
  const jwtToken: string | null = localStorage.getItem("jwtToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getArchivedTasks(jwtToken as string);
        const sortedTasks = response.sort(
          (a: TaskResponse, b: TaskResponse) => {
            const dateA = new Date(a.taskDate);
            const dateB = new Date(b.taskDate);

            return dateA.getTime() - dateB.getTime();
          }
        );
        setTasks(sortedTasks);
      } catch (error) {
        console.error("Wystąpił błąd podczas pobierania danych: ", error);
      }
    };

    if (jwtToken) {
      fetchData();
    }
  }, [jwtToken, tasks]);

  const unarchive = () => {
    const newTasksToUnarchive = tasks.filter(
      (task) =>
        archivedStatus[task.id as string] && !tasksToUnarchive.includes(task)
    );

    if (newTasksToUnarchive.length > 0) {
      const updatedTasksToUnarchive = [
        ...tasksToUnarchive,
        ...newTasksToUnarchive,
      ];
      setTasksToUnarchive(updatedTasksToUnarchive);

      const request = updatedTasksToUnarchive.map(taskMapper);
      if (request.length !== 0) {
        setTasksUndone(jwtToken as string, request);
      }
    }
  };

  const toggleArchiveStatus = (taskId: string) => {
    setArchivedStatus((prevStatus) => ({
      ...prevStatus,
      [taskId]: !prevStatus[taskId],
    }));
  };

  return (
    <>
      {isAboveMediumScreens ? (
        <div className="w-[70%] h-full bg-primary-gray-100 rounded-[2rem] p-6 flex flex-col justify-start items-center gap-8 flex-gro">
          <div className="w-full flex flex-row justify-between px-4">
            <span className="font-bold uppercase text-xl">Task Archive</span>
            <button
              className="text-primary-gray-100 bg-primary-dark-500 border-2 w-1/10 rounded-full py-1 px-4  transition ease-in hover:bg-primary-gray-100 hover:border-2 hover:border-primary-dark-500 hover:shadow-primary-dark-500 hover:outline-transparent hover:text-primary-dark-500"
              onClick={unarchive}
            >
              UnArchive
            </button>
          </div>
          <div className="h-max-full h-[85%] w-full overflow-scroll flex flex-row flex-wrap justify-start items-start gap-y-[5%] gap-x-[5%] pb-2">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="w-[30%] h-[35%] py-2 bg-primary-gray-200 rounded-xl p-4 shadow-md text-primary-dark-400 border-b-2 border-primary-dark-500 relative"
              >
                <div
                  className="h-full w-full"
                  onClick={() => toggleArchiveStatus(task.id as string)}
                >
                  <ArchivedTask task={task} />
                </div>
                {archivedStatus[task.id as string] ? (
                  <div
                    className="w-5 h-5 bg-primary-dark-500 border-solid border-2 rounded-md absolute top-2 right-2"
                    onClick={() => toggleArchiveStatus(task.id as string)}
                  >
                    <CheckIcon className="text-primary-gray-100"></CheckIcon>
                  </div>
                ) : (
                  <div
                    className="w-5 h-5 border-solid border-2 border-primary-dark-500 rounded-md absolute top-2 right-2"
                    onClick={() => toggleArchiveStatus(task.id as string)}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : isAboveSmallScreens ? (
        <div className="max-h-[65%] h-[57.5%] w-full bg-primary-gray-100 rounded-[2rem] p-6 flex flex-col justify-start items-center gap-8">
          <div className="w-full flex flex-row justify-between px-4">
            <span className="font-bold uppercase text-xl">Task Archive</span>
            <button
              className="text-primary-gray-100 bg-primary-dark-500 border-2 w-1/10 rounded-full py-1 px-4  transition ease-in hover:bg-primary-gray-100 hover:border-2 hover:border-primary-dark-500 hover:shadow-primary-dark-500 hover:outline-transparent hover:text-primary-dark-500"
              onClick={unarchive}
            >
              UnArchive
            </button>
          </div>
          <div className="h-[90%] w-full overflow-scroll flex flex-row flex-wrap justify-start items-start gap-y-[5%] gap-x-[5%]">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="w-[30%] h-max-[10rem] h-1/2 py-2 bg-primary-gray-200 rounded-xl p-4 shadow-md text-primary-dark-400 border-b-2 border-primary-dark-500 relative"
                onClick={() => toggleArchiveStatus(task.id as string)}
              >
                <ArchivedTask task={task} />
                {archivedStatus[task.id as string] ? (
                  <div
                    className="w-5 h-5 bg-primary-dark-500 border-solid border-2 rounded-md absolute top-2 right-2"
                    onClick={() => toggleArchiveStatus(task.id as string)}
                  >
                    <CheckIcon className="text-primary-gray-100"></CheckIcon>
                  </div>
                ) : (
                  <div
                    className="w-5 h-5 border-solid border-2 border-primary-dark-500 rounded-md absolute top-2 right-2"
                    onClick={() => toggleArchiveStatus(task.id as string)}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="h-full w-full bg-primary-gray-100 rounded-[2rem] p-6 overflow-scroll no-scrollbar flex flex-col justify-start items-center gap-8">
          <div className="w-full flex flex-row justify-between px-4">
            <span className="font-bold uppercase text-xl">Task Archive</span>
            <button
              className="text-primary-gray-100 bg-primary-dark-500 border-2 w-1/10 rounded-full py-1 px-4  transition ease-in hover:bg-primary-gray-100 hover:border-2 hover:border-primary-dark-500 hover:shadow-primary-dark-500 hover:outline-transparent hover:text-primary-dark-500"
              onClick={unarchive}
            >
              UnArchive
            </button>
          </div>
          <div className="h-full w-full overflow-scroll flex flex-row flex-wrap justify-start items-start  gap-y-[5%] gap-x-[5%] ">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="w-[45%] h-max-[15rem] h-1/3 py-2 bg-primary-gray-200 rounded-xl p-4 shadow-md text-primary-dark-400 border-b-2 border-primary-dark-500 relative"
                onClick={() => toggleArchiveStatus(task.id as string)}
              >
                <ArchivedTask task={task} />
                {archivedStatus[task.id as string] ? (
                  <div
                    className="w-5 h-5 bg-primary-dark-500 border-solid border-2 rounded-md absolute top-2 right-2"
                    onClick={() => toggleArchiveStatus(task.id as string)}
                  >
                    <CheckIcon className="text-primary-gray-100"></CheckIcon>
                  </div>
                ) : (
                  <div
                    className="w-5 h-5 border-solid border-2 border-primary-dark-500 rounded-md absolute top-2 right-2"
                    onClick={() => toggleArchiveStatus(task.id as string)}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Archive;
