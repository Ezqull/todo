import { useEffect, useState } from "react";
import useMediaQuery from "../../hooks/useMediaQuery";
import { TaskResponse } from "../../shared/types";
import { getArchivedTasks } from "../../shared/tasks";
import ArchivedTask from "./archived-task";

const Archive = () => {
  const isAboveMediumScreens = useMediaQuery("(min-width:1060px)");
  const isAboveSmallScreens = useMediaQuery("(min-width:768px)");
  const [tasks, setTasks] = useState<TaskResponse[]>([]);

  useEffect(() => {
    const jwtToken: string | null = localStorage.getItem("jwtToken");

    const fetchData = async () => {
      try {
        const response = await getArchivedTasks(jwtToken);
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
  }, []);

  return (
    <>
      {isAboveMediumScreens ? (
        <div className="w-[70%] h-full bg-primary-gray-100 rounded-[2rem] p-6 flex flex-col justify-start items-center gap-8 flex-gro">
          <span className="font-bold uppercase text-xl">Task Archive</span>
          <div className="h-max-full h-[85%] w-full overflow-scroll flex flex-row flex-wrap justify-start items-start gap-y-[5%] gap-x-[5%] pb-2">
            {tasks.map((task) => (
              <div className="w-[30%] h-[35%] py-2">
                <ArchivedTask key={task.title} task={task} />
              </div>
            ))}
          </div>
        </div>
      ) : isAboveSmallScreens ? (
        <div className="max-h-[65%] h-[57.5%] w-full bg-primary-gray-100 rounded-[2rem] p-6 flex flex-col justify-start items-center gap-8">
          <span className="font-bold uppercase text-xl">Task Archive</span>
          <div className="h-[90%] w-full overflow-scroll flex flex-row flex-wrap justify-start items-start gap-y-[5%] gap-x-[5%]">
            {tasks.map((task) => (
              <div className="w-[30%] h-max-[10rem] h-1/2">
                <ArchivedTask key={task.title} task={task} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="h-full w-full bg-primary-gray-100 rounded-[2rem] p-6 overflow-scroll no-scrollbar flex flex-col justify-start items-center gap-8">
          <span className="font-bold uppercase text-xl">Task Archive</span>
          <div className="h-full overflow-scroll flex flex-row flex-wrap justify-evenly items-start">
            {tasks.map((task) => (
              <div className="w-[45%] h-max-[15rem] h-1/3">
                <ArchivedTask key={task.title} task={task} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Archive;
