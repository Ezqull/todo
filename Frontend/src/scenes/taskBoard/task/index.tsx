import { useState } from "react";
import { TaskRequest, TaskResponse } from "../../../shared/types";
import {
  PencilIcon,
  ArchiveBoxIcon,
  CheckIcon,
} from "@heroicons/react/24/solid";
import useMediaQuery from "../../../hooks/useMediaQuery";
import { setTaskDone, updateTask } from "../../../shared/tasks";

type Props = {
  task: TaskResponse;
};

const Task = ({ task }: Props) => {
  const [edit, setEdit] = useState(false);
  const [done, setDone] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState<string>(task.description);
  const [priority, setPriority] = useState(task.priority);
  const [finishDate, setFinishDate] = useState<Date>(task.finishDate);
  const isAboveSmallScreens = useMediaQuery("(min-width:768px)");
  const jwtToken: string | null = localStorage.getItem("jwtToken");

  const formatDateToString = (date: Date) => {
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();

    const formattedDate = dd + "-" + mm + "-" + yyyy;

    return formattedDate;
  };

  const archive = async (e: Event) => {
    e.preventDefault();
    setTaskDone(jwtToken as string, task.id as string);
  };

  const changeEdit = () => {
    setTitle(task.title);
    setPriority(Number(task.priority));
    setDescription(task.description);
    setFinishDate(new Date(task.finishDate));
    setEdit(!edit);
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    const request: TaskRequest = {
      title: title,
      description: description,
      priority: priority,
      isDone: false,
      taskDate: formatDateToString(new Date(task.taskDate)),
      finishDate: formatDateToString(new Date(finishDate)),
      email: "",
    };
    updateTask(jwtToken as string, request, task.id as string);
    setEdit(!edit);
  };

  return (
    <div>
      {isAboveSmallScreens ? (
        <div>
          {!edit ? (
            <div
              className={`w-full h-[25%] flex flex-col gap-4 p-4 justify-start border-b-2 border-primary-dark-500 mt-4`}
            >
              <div className="w-full">
                <div className="flex flex-row justify-between h-[2rem] w-full">
                  <div className="flex flex-col items-start justify-center gap-2 w-full">
                    <div>{title}</div>
                    <div className="flex flex-row justify-center items-center gap-4 mb-4">
                      <span>Priority:</span>
                      <div className="flex flex-row gap-3">
                        {Array.from({ length: priority }, (_, i) => (
                          <div
                            key={i}
                            className={`h-1 w-5 rounded-md ${
                              !task.isLate
                                ? "bg-primary-dark-500"
                                : "bg-red-600"
                            }`}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row gap-4 justify-center items-center">
                    <button onClick={archive} className="w-5 h-5">
                      <ArchiveBoxIcon className="text-primary-dark-500" />
                    </button>
                    <div onClick={() => changeEdit()} className="w-4 h-4">
                      <PencilIcon className="text-primary-dark-500" />
                    </div>
                  </div>
                </div>

                <div className="h-[2rem] mb-5">
                  <p className="mt-3 w-full">{description}</p>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="w-full h-[6%] flex flex-col gap-4 p-4 justify-start border-b-2 border-primary-dark-500">
                <div>
                  <form onSubmit={handleSubmit}>
                    <div className="flex flex-row justify-between h-[2rem]">
                      <div className="flex flex-row items-center justify-start gap-8 w-full">
                        <input
                          className="w-1/4 border bg-primary-gray-200 border-primary-dark-500 rounded-xl text-primary-dark-500 px-3 py-0.5 focus:outline-primary-dark-500 focus:outline-4"
                          type="text"
                          id="title"
                          name="title"
                          value={title}
                          onChange={(e) => {
                            const event = e.target.value;
                            setTitle(event);
                          }}
                        />
                        <input
                          type="number"
                          defaultValue={priority}
                          className="w-[10%] border bg-primary-gray-200 border-primary-dark-500 rounded-xl text-primary-dark-500 px-3 py-0.5 focus:outline-primary-dark-500 focus:outline-4"
                          onChange={(e) => {
                            const event = e.target.value;
                            setPriority(Number(event));
                          }}
                        />
                        <div className="w-[50%] ml-[2%] flex flex-row gap-2 justify-start items-center">
                          <label htmlFor="date">Finish Date</label>
                          <input
                            id="date"
                            className="w-[50%] border bg-primary-gray-200 border-primary-dark-500 rounded-xl text-primary-dark-500 px-3 py-0.5  focus:outline-primary-dark-500 focus:outline-4"
                            type="date"
                            value={
                              new Date(finishDate).toISOString().split("T")[0]
                            }
                            min={new Date().toISOString().split("T")[0]}
                            onChange={(e) => {
                              const event = e.target.value;
                              setFinishDate(new Date(event));
                            }}
                          />
                        </div>
                      </div>
                      <div className="flex flex-row gap-4 justify-center items-center">
                        <button
                          type="submit"
                          onClick={() => handleSubmit}
                          className="w-5 h-5"
                        >
                          <CheckIcon className="text-primary-dark-500" />
                        </button>
                        <div onClick={() => changeEdit()} className="w-4 h-4">
                          <PencilIcon className="text-primary-dark-500" />
                        </div>
                      </div>
                    </div>
                    <div className="h-[4rem] mb-5">
                      <textarea
                        className="mt-3 w-full h-full border bg-primary-gray-200 border-primary-dark-500 rounded-xl resize-none text-primary-dark-500 px-3 py-0.5 focus:outline-primary-dark-500 focus:outline-4"
                        defaultValue={description}
                        onChange={(e) => {
                          const event = e.target.value;
                          setDescription(event);
                        }}
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
                      <div>{title}</div>

                      <div className="flex flex-row gap-4 justify-center items-center">
                        <button onClick={archive} className="w-5 h-5">
                          <ArchiveBoxIcon className="text-primary-dark-500" />
                        </button>
                        <div onClick={() => changeEdit()} className="w-4 h-4">
                          <PencilIcon className="text-primary-dark-500" />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <span>Priority:</span>
                      <div className="flex flex-row gap-3">
                        {Array.from({ length: task.priority }, (_, i) => (
                          <div
                            key={i}
                            className={`h-3 w-3 rounded-md ${
                              !task.isLate
                                ? "bg-primary-dark-500"
                                : "bg-red-600"
                            }`}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="h-[2rem] mb-5 mt-9">
                  <p className="mt-3 w-full">{description}</p>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="w-full h-[6%] flex flex-col gap-4 p-4 justify-start border-b-2 border-primary-dark-500">
                <div>
                  <form onSubmit={handleSubmit}>
                    <div className="flex flex-row h-[20%] w-full">
                      <div className="flex flex-col items-start justify-start gap-8 w-full">
                        <div className="flex flex-row w-full justify-between gap-4">
                          <input
                            className="w-5/6 border bg-primary-gray-200 border-primary-dark-500 rounded-xl text-primary-dark-500 px-3 py-0.5 focus:outline-primary-dark-500 focus:outline-4"
                            type="text"
                            id="title"
                            name="title"
                            value={title}
                            onChange={(e: Event) => {
                              const event = e.target as HTMLInputElement;
                              setTitle(event.value);
                            }}
                          />

                          <div className="flex flex-row gap-4 justify-center items-center">
                            <div
                              onClick={() => setDone(!done)}
                              className="w-5 h-5"
                            >
                              <CheckIcon className="text-primary-dark-500" />
                            </div>
                            <button type="submit" className="w-4 h-4">
                              <PencilIcon className="text-primary-dark-500" />
                            </button>
                          </div>
                        </div>
                        <input
                          id="date"
                          className="w-full border bg-primary-gray-200 border-primary-dark-500 rounded-xl text-primary-dark-500 px-3 py-0.5 focus:outline-primary-dark-500 focus:outline-4"
                          type="date"
                          value={
                            new Date(finishDate).toISOString().split("T")[0]
                          }
                          min={new Date().getUTCDate()}
                          onChange={(e: Event) => {
                            const event = e.target as HTMLInputElement;
                            setFinishDate(new Date(event.value));
                          }}
                        />
                        <input
                          type="number"
                          defaultValue={priority}
                          className="w-full border bg-primary-gray-200 border-primary-dark-500 rounded-xl text-primary-dark-500 px-3 py-0.5 focus:outline-primary-dark-500 focus:outline-4"
                          onChange={(e: Event) => {
                            const event = e.target as HTMLInputElement;
                            setPriority(Number(event.value));
                          }}
                        />
                      </div>
                    </div>
                    <div className="h-[6rem] my-5">
                      <input
                        className="mt-3 w-full h-full border bg-primary-gray-200 border-primary-dark-500 rounded-xl text-primary-dark-500 px-3 py-0.5 focus:outline-primary-dark-500 focus:outline-4"
                        defaultValue={description}
                        onChange={(e: Event) => {
                          const event = e.target as HTMLInputElement;
                          setDescription(event.value);
                        }}
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
