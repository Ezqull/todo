import useMediaQuery from "../../hooks/useMediaQuery";
import { TaskResponse } from "../../shared/types";
import Task from "./task";
import { PencilIcon } from "@heroicons/react/24/solid";

type Props = {};

const Board = ({}: Props) => {
  const isAboveMediumScreens = useMediaQuery("(min-width:1060px)");
  const isAboveSmallScreens = useMediaQuery("(min-width:768px)");
  const tasks: TaskResponse[] = [
    {
      title: "Zadanie 1",
      description: "Opis zadania 1",
      priority: 9,
      isExactDate: true,
      isDone: false,
      finishDate: new Date("2023-12-31"),
    },
    {
      title: "Zadanie 2",
      description: "Opis zadania 2",
      priority: 8,
      isExactDate: false,
      isDone: true,
      finishDate: new Date("2023-11-30"),
    },
    {
      title: "Zadanie 1",
      description: "Opis zadania 1",
      priority: 1,
      isExactDate: true,
      isDone: false,
      finishDate: new Date("2023-12-31"),
    },
  ];

  return (
    <>
      {isAboveMediumScreens ? (
        <div className="w-[70%] h-full bg-primary-gray-100 rounded-[2rem] p-6">
          <span className="font-bold uppercase text-xl">Tasks For The Day</span>
          <div className="  overflow-scroll">
            {tasks.map((task) => (
              <Task task={task} />
            ))}
          </div>
        </div>
      ) : isAboveSmallScreens ? (
        <div className="h-[70%] w-full bg-primary-gray-100 rounded-[2rem] p-6">
          <span className="font-bold uppercase text-xl">Tasks For The Day</span>
          <div className="  overflow-scroll">
            {tasks.map((task) => (
              <Task task={task} />
            ))}
          </div>
        </div>
      ) : (
        <div className="h-full w-full bg-primary-gray-100 rounded-[2rem] p-6 overflow-scroll no-scrollbar">
          <span className="font-bold uppercase text-xl">Tasks For The Day</span>
          <div className=" overflow-scroll">
            {tasks.map((task) => (
              <Task task={task} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Board;
