import useMediaQuery from "../../../../hooks/useMediaQuery";
import { TaskResponse } from "../../../../shared/types";

type Props = { task: TaskResponse };

function DayTask({ task }: Props) {
  const isAboveMediumScreens = useMediaQuery("(min-width:1060px)");
  const isAboveSmallScreens = useMediaQuery("(min-width:768px)");

  const taskStyle = task.isFinishDay
    ? "bg-red-500 text-white"
    : "bg-primary-gray-200 text-primary-dark-400";

  return (
    <>
      {isAboveMediumScreens ? (
        <div
          className={`h-[125px] ${taskStyle} rounded-xl py-2 my-1 shadow-md flex-shrink-0`}
        >
          <div className="h-full flex flex-col justify-evenly items-center px-2">
            <span className="text-center h-8 leading-4">{task.title}</span>
            <div className="text-center h-8">Priority: {task.priority}</div>
          </div>
        </div>
      ) : isAboveSmallScreens ? (
        <div
          className={`h-[85%] w-[125px] ${taskStyle} rounded-xl py-2 my-1 shadow-md mb-2 flex-shrink-0`}
        >
          <div className="h-full flex flex-col justify-evenly items-center">
            <span className="text-center h-8 leading-4">{task.title}</span>
            <div className="text-center h-8">Priority: {task.priority}</div>
          </div>
        </div>
      ) : (
        <div
          className={`h-[6rem] w-[45%] ${taskStyle} rounded-xl py-2 my-1 shadow-md`}
        >
          <div className="h-full flex flex-col justify-evenly items-center">
            <span className="text-center h-8 leading-4">{task.title}</span>
            <div className="text-center h-8">Priority: {task.priority}</div>
          </div>
        </div>
      )}
    </>
  );
}

export default DayTask;
