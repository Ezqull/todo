import { useEffect, useState } from "react";
import { TaskResponse } from "../../../shared/types";
import {
  PencilIcon,
  ArchiveBoxIcon,
  CheckIcon,
} from "@heroicons/react/24/solid";
import useMediaQuery from "../../../hooks/useMediaQuery";

type Props = {
  task: TaskResponse;
};

const Task = ({ task }: Props) => {
  const [edit, setEdit] = useState(false);
  const [done, setDone] = useState(false);
  const [taskName, setTaskName] = useState(task.title);
  const [priority, setPriority] = useState(task.priority);
  const [finishDate, setFinishDate] = useState<Date>(task.finishDate);
  const isAboveSmallScreens = useMediaQuery("(min-width:768px)");

  return (
    <div>
      {isAboveSmallScreens ? (
        <div>
          {!edit ? (
            <div
              className={`w-full h-[6%] flex flex-col gap-4 p-4 justify-start border-b-2 border-primary-dark-500`}
            >
              <div className="w-full">
                <div className="flex flex-row justify-between h-[2rem] w-full">
                  <div className="flex flex-row items-center justify-start gap-8 w-full">
                    <div>{task.title}</div>
                    <div className="flex flex-row gap-3">
                      {Array.from({ length: priority }, (_, i) => (
                        <div
                          key={i}
                          className={`h-1 w-5 rounded-md ${
                            !task.isLate ? "bg-primary-dark-500" : "bg-red-600"
                          }`}
                        ></div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-row gap-4 justify-center items-center">
                    <button onClick={() => setDone(!done)} className="w-5 h-5">
                      <ArchiveBoxIcon className="text-primary-dark-500" />
                    </button>
                    <div onClick={() => setEdit(!edit)} className="w-4 h-4">
                      <PencilIcon className="text-primary-dark-500" />
                    </div>
                  </div>
                </div>

                <div className="h-[2rem] mb-5">
                  <p className="mt-3 w-full">{task.description}</p>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="w-full h-[6%] flex flex-col gap-4 p-4 justify-start border-b-2 border-primary-dark-500">
                <div>
                  <form>
                    <div className="flex flex-row justify-between h-[2rem]">
                      <div className="flex flex-row items-center justify-start gap-8 w-full">
                        <input
                          className="w-1/4 border bg-primary-gray-200 border-primary-dark-500 rounded-xl text-primary-dark-500 px-3 py-0.5 focus:outline-primary-dark-500 focus:outline-4"
                          type="text"
                          id="title"
                          name="title"
                          value={taskName}
                          onChange={(e) => {
                            const event = e.target.value;
                            setTaskName(event);
                          }}
                        />
                        <input
                          type="number"
                          defaultValue={task.priority}
                          className="w-[10%] border bg-primary-gray-200 border-primary-dark-500 rounded-xl text-primary-dark-500 px-3 py-0.5 focus:outline-primary-dark-500 focus:outline-4"
                        />
                        <div className="w-[50%] ml-[2%] flex flex-row gap-2 justify-start items-center">
                          <label htmlFor="date">Finish Date</label>
                          <input
                            id="date"
                            className="w-[50%] border bg-primary-gray-200 border-primary-dark-500 rounded-xl text-primary-dark-500 px-3 py-0.5  focus:outline-primary-dark-500 focus:outline-4"
                            type="date"
                            value={finishDate}
                          />
                        </div>
                      </div>
                      <div className="flex flex-row gap-4 justify-center items-center">
                        <button type="submit" className="w-5 h-5">
                          <CheckIcon className="text-primary-dark-500" />
                        </button>
                        <div onClick={() => setEdit(!edit)} className="w-4 h-4">
                          <PencilIcon className="text-primary-dark-500" />
                        </div>
                      </div>
                    </div>
                    <div className="h-[4rem] mb-5">
                      <textarea
                        className="mt-3 w-full h-full border bg-primary-gray-200 border-primary-dark-500 rounded-xl resize-none text-primary-dark-500 px-3 py-0.5 focus:outline-primary-dark-500 focus:outline-4"
                        defaultValue={task.description}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          {!edit ? (
            <div className="w-full h-[6%] flex flex-col gap-4 p-4 justify-start border-b-2 border-primary-dark-500">
              <div className=" w-full">
                <div className="flex flex-row h-[20%] w-full">
                  <div className="flex flex-col items-start justify-start gap-8 w-full">
                    <div className="flex flex-row w-full justify-between">
                      <div>{taskName}</div>

                      <div className="flex flex-row gap-4 justify-center items-center">
                        <button
                          onClick={() => setDone(!done)}
                          className="w-5 h-5"
                        >
                          <ArchiveBoxIcon className="text-primary-dark-500" />
                        </button>
                        <div onClick={() => setEdit(!edit)} className="w-4 h-4">
                          <PencilIcon className="text-primary-dark-500" />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row gap-3">
                      {Array.from({ length: task.priority }, (_, i) => (
                        <div
                          key={i}
                          className={`h-3 w-3 rounded-md ${
                            !task.isLate ? "bg-primary-dark-500" : "bg-red-600"
                          }`}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="h-[2rem] mb-5 mt-9">
                  <p className="mt-3 w-full">{task.description}</p>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="w-full h-[6%] flex flex-col gap-4 p-4 justify-start border-b-2 border-primary-dark-500">
                <div>
                  <form>
                    <div className="flex flex-row h-[20%] w-full">
                      <div className="flex flex-col items-start justify-start gap-8 w-full">
                        <div className="flex flex-row w-full justify-between gap-4">
                          <input
                            className="w-5/6 border bg-primary-gray-200 border-primary-dark-500 rounded-xl text-primary-dark-500 px-3 py-0.5 focus:outline-primary-dark-500 focus:outline-4"
                            type="text"
                            id="title"
                            name="title"
                            value={taskName}
                            onChange={(e: Event) => {
                              const event = e.target as HTMLInputElement;
                              setTaskName(event.value);
                            }}
                          />

                          <div className="flex flex-row gap-4 justify-center items-center">
                            <button
                              onClick={() => setDone(!done)}
                              className="w-5 h-5"
                            >
                              <ArchiveBoxIcon className="text-primary-dark-500" />
                            </button>
                            <div
                              onClick={() => setEdit(!edit)}
                              className="w-4 h-4"
                            >
                              <PencilIcon className="text-primary-dark-500" />
                            </div>
                          </div>
                        </div>
                        <input
                          id="date"
                          className="w-full border bg-primary-gray-200 border-primary-dark-500 rounded-xl text-primary-dark-500 px-3 py-0.5 focus:outline-primary-dark-500 focus:outline-4"
                          type="date"
                        />
                        <input
                          type="number"
                          defaultValue={task.priority}
                          className="w-full border bg-primary-gray-200 border-primary-dark-500 rounded-xl text-primary-dark-500 px-3 py-0.5 focus:outline-primary-dark-500 focus:outline-4"
                        />
                      </div>
                    </div>
                    <div className="h-[6rem] my-5">
                      <input
                        className="mt-3 w-full h-full border bg-primary-gray-200 border-primary-dark-500 rounded-xl text-primary-dark-500 px-3 py-0.5 focus:outline-primary-dark-500 focus:outline-4"
                        defaultValue={task.description}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Task;
