import { useEffect, useState } from "react";
import useMediaQuery from "../../hooks/useMediaQuery";
import { TaskResponse } from "../../shared/types";
import {
  getTasksFinishDatesForTheWeek,
  getTasksForTheWeek,
} from "../../shared/tasks";
import DayView from "./dayView";
import mergeAndFilterTasks from "../../shared/uniqueTasks";

function Calendar() {
  const isAboveMediumScreens = useMediaQuery("(min-width:1060px)");
  const isAboveSmallScreens = useMediaQuery("(min-width:768px)");

  const [tasks, setTasks] = useState<TaskResponse[]>([]);
  const [finishTasks, setFinishTasks] = useState<TaskResponse[]>([]);

  useEffect(() => {
    const jwtToken: string = localStorage.getItem("jwtToken") as string;

    const fetchData = async () => {
      try {
        const responseTasks = await getTasksForTheWeek(jwtToken);
        setTasks(responseTasks);
      } catch (error) {
        console.error("Wystąpił błąd podczas pobierania danych: ", error);
      }

      try {
        const responseFinish = await getTasksFinishDatesForTheWeek(jwtToken);
        setFinishTasks(responseFinish);
      } catch (error) {
        console.error("Wystąpił błąd podczas pobierania danych: ", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const uniqueTasks = mergeAndFilterTasks(tasks, finishTasks);
    setTasks(uniqueTasks);
  }, [finishTasks, mergeAndFilterTasks]);

  return (
    <>
      {isAboveMediumScreens ? (
        <div className="w-[70%] h-full bg-primary-gray-100 rounded-[2rem] px-6 pt-6 flex flex-col gap-8">
          <span className="font-bold uppercase text-xl">Calendar View</span>
          <div className="flex items-start justify-center h-full">
            <div className="h-full w-full overflow-x-scroll flex flex-row justify-start gap-5">
              {Array.from({ length: 7 }, (_, i) => {
                const day = new Date();
                day.setDate(day.getDate() + i);

                return <DayView key={i} tasksForTheDay={tasks} day={day} />;
              })}
            </div>
          </div>
        </div>
      ) : isAboveSmallScreens ? (
        <div className="max-h-[100%] h-[57.5%] w-full bg-primary-gray-100 flex flex-col gap-8 rounded-[2rem] p-6">
          <span className="font-bold uppercase text-xl">Calendar View</span>
          <div className="flex items-start justify-center h-full overflow-y-scroll">
            <div className="h-full w-full overflow-y-scroll flex flex-col justify-start gap-5">
              {Array.from({ length: 7 }, (_, i) => {
                const day = new Date();
                day.setDate(day.getDate() + i);

                return <DayView key={i} tasksForTheDay={tasks} day={day} />;
              })}
            </div>
          </div>{" "}
        </div>
      ) : (
        <div className="w-full h-full bg-primary-gray-100 rounded-[2rem] p-6 flex flex-col gap-8">
          <span className="font-bold uppercase text-xl">Calendar View</span>
          <div className="overflow-y-scroll flex items-start justify-center h-full">
            <div className="h-[full] w-full overflow-y-scroll flex flex-col justify-start gap-5">
              {Array.from({ length: 7 }, (_, i) => {
                const day = new Date();
                day.setDate(day.getDate() + i);

                return <DayView key={i} tasksForTheDay={tasks} day={day} />;
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Calendar;
