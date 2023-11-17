import { TaskResponse } from "../../../shared/types";

import useMediaQuery from "../../../hooks/useMediaQuery";

type Props = {
  task: TaskResponse;
};

const ArchivedTask = ({ task }: Props) => {
  const isAboveSmallScreens = useMediaQuery("(min-width:768px)");
  const isAboveMediumScreens = useMediaQuery("(min-width:1060px)");

  return (
    <>
      {isAboveMediumScreens ? (
        <div className=" bg-primary-gray-200 rounded-md p-4 shadow-md text-primary-dark-400">
          <div className="flex flex-col items-center justify-center gap-4 w-full">
            <div>{task.title}</div>
            <div className="flex flex-row gap-3">
              {new Date(task.taskDate).toLocaleDateString()}
            </div>
          </div>

          <div className="h-[2rem] mb-5">
            <p className="mt-3 w-full">{task.description}</p>
          </div>
        </div>
      ) : isAboveSmallScreens ? (
        <div className="w-full border-b-2 border-primary-dark-500 bg-primary-gray-200 rounded-md p-4 shadow-md text-primary-dark-400">
          <div className="flex flex-col items-center justify-center gap-4 w-full">
            <div>{task.title}</div>
            <div className="flex flex-row gap-3">
              {new Date(task.taskDate).toLocaleDateString()}
            </div>
          </div>

          <div className="h-[2rem] mb-5">
            <p className="mt-3 w-full">{task.description}</p>
          </div>
        </div>
      ) : (
        <div className="  border-b-2 border-primary-dark-500 bg-primary-gray-200 rounded-md p-4 shadow-md text-primary-dark-400">
          <div className="flex flex-col items-center justify-center gap-2 w-full">
            <div className="flex flex-row w-full justify-center">
              <div>{task.title}</div>
            </div>
            <div className="flex flex-row gap-3">
              {new Date(task.taskDate).toLocaleDateString()}
            </div>
          </div>

          <div className="h-[2rem] mb-5">
            <p className="mt-3 w-full">{task.description}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ArchivedTask;