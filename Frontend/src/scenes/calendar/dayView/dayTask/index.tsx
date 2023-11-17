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
        <div className={`h-[20%] ${taskStyle} rounded-xl py-2 my-1 shadow-md`}>
          <div className="flex flex-col justify-center items-center">
            <span>{task.title}</span>
            <div>Priority: {task.priority}</div>
          </div>
        </div>
      ) : isAboveSmallScreens ? (
        <div
          className={`h-[80%] w-[125px] ${taskStyle} rounded-xl py-2 my-1 shadow-md mb-2 flex-shrink-0`}
        >
          <div className="flex flex-col justify-center items-center">
            <span>{task.title}</span>
            <div>Priority: {task.priority}</div>
          </div>
        </div>
      ) : (
        <div
          className={`h-[5rem] w-[45%] ${taskStyle} rounded-xl py-2 my-1 shadow-md`}
        >
          <div className="flex flex-col justify-center items-center">
            <span>{task.title}</span>
            <div>Priority: {task.priority}</div>
          </div>
        </div>
      )}
    </>
  );
}

export default DayTask;
