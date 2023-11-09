import {
  PlusIcon,
  CheckIcon,
  CalendarIcon,
  ChartPieIcon,
  ArchiveBoxIcon,
  ListBulletIcon,
} from "@heroicons/react/24/solid";
import useMediaQuery from "../../hooks/useMediaQuery";
import { useState } from "react";

function Options() {
  const flexBetween = "flex flex-col items-center justify-between";
  const inputStyleBig =
    "w-full bg-primary-dark-500 rounded-xl text-primary-gray-100 p-2";
  const inputStyleMed =
    "bg-primary-dark-500 rounded-xl text-primary-gray-100 p-2";

  const transition =
    "transition ease-in focus:bg-primary-gray-100 focus:border-2 focus:border-primary-dark-500 focus:shadow-primary-gray-100 focus:outline-transparent focus:text-primary-dark-500";
  const isAboveMediumScreens = useMediaQuery("(min-width:1060px)");
  const [title, setTitle] = useState("");
  const [isToday, setIsToday] = useState(false);

  const handleSubmit = (e: Event) => {
    e.preventDefault();
  };

  return (
    <>
      {isAboveMediumScreens ? (
        <div className="w-[19%] h-full bg-primary-gray-100 rounded-[2rem] flex flex-row p-6">
          <div className="h-full w-full">
            <form className={`${flexBetween} gap-6`}>
              <div className="w-full">
                <label htmlFor="title">Title</label>
                <input
                  className={`${inputStyleBig} ${transition}`}
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="flex flex-row gap-4 w-full">
                <div className="flex flex-col items-start justify-start gap-1 flex-grow w-1/2">
                  <label htmlFor="isToday">Today?</label>
                  {isToday ? (
                    <div
                      className="w-8 h-8 bg-primary-dark-500 border-solid border rounded-md"
                      onClick={() => setIsToday(!isToday)}
                    >
                      <CheckIcon className="text-primary-gray-100"></CheckIcon>
                    </div>
                  ) : (
                    <div
                      className="w-8 h-8 border-solid border border-primary-dark-500 rounded-md"
                      onClick={() => setIsToday(!isToday)}
                    ></div>
                  )}
                </div>
                <div className="w-1/2">
                  <label htmlFor="prio">Priority</label>
                  <input
                    className={`${inputStyleBig} ${transition}`}
                    type="number"
                    name="prio"
                    id="prio"
                    min={1}
                    max={10}
                    defaultValue={1}
                  />
                </div>
              </div>
              <div className="w-full">
                <label htmlFor="date">Date</label>
                <input
                  id="date"
                  className={`${inputStyleBig} ${transition}`}
                  type="date"
                />
              </div>
              <button
                type="submit"
                onClick={() => handleSubmit}
                className="bg-primary-dark-500 w-10 h-10 rounded-full"
              >
                <PlusIcon className="text-primary-gray-100"></PlusIcon>
              </button>
            </form>
            <hr className="bg-primary-dark-500 h-1 w-full mt-6" />
            <div className="h-1/2 w-full flex flex-col">
              <div className="flex flex-row w-full h-10 justify-evenly mt-4">
                <button className="w-8 h-8">
                  <CalendarIcon />
                </button>
                <button className="w-8 h-8">
                  <ListBulletIcon />
                </button>
              </div>
              <div className="flex flex-row w-full h-10 justify-evenly mt-4">
                <button className="w-8 h-8">
                  <ChartPieIcon />
                </button>
                <button className="w-8 h-8">
                  <ArchiveBoxIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-[27.5%] w-full bg-primary-gray-100 rounded-[2rem] py-2">
          <div className="h-full w-full flex flex-row gap-4">
            <form className="flex felx-row w-3/4">
              <div
                className={`$flex flex-row items-center justify-between gap-6 w-full`}
              >
                <div className="w-full h-1/2 flex flex-row justify-between px-8">
                  <div className="flex flex-col w-1/2">
                    <label htmlFor="title">Title</label>
                    <input
                      className={`${inputStyleMed} ${transition}`}
                      id="title"
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="w-2/5">
                    <label htmlFor="prio">Priority</label>
                    <input
                      className={`${inputStyleBig} ${transition}`}
                      type="number"
                      name="prio"
                      id="prio"
                      min={1}
                      max={10}
                      defaultValue={1}
                    />
                  </div>
                </div>
                <div className="flex flex-row gap-9 w-full px-8 justify-between items-center">
                  <div className="w-1/2">
                    <label htmlFor="date">Date</label>
                    <input
                      id="date"
                      className={`${inputStyleBig} ${transition}`}
                      type="date"
                    />
                  </div>
                  <div className="flex flex-col items-start justify-start gap-1 w-2/5">
                    <label htmlFor="isToday">Today?</label>
                    {isToday ? (
                      <div
                        className="w-8 h-8 bg-primary-dark-500 border-solid border rounded-md"
                        onClick={() => setIsToday(!isToday)}
                      >
                        <CheckIcon className="text-primary-gray-100"></CheckIcon>
                      </div>
                    ) : (
                      <div
                        className="w-8 h-8 border-solid border border-primary-dark-500 rounded-md"
                        onClick={() => setIsToday(!isToday)}
                      ></div>
                    )}
                  </div>
                </div>
              </div>
              <div className="py-12">
                <button
                  type="submit"
                  onClick={() => handleSubmit}
                  className="bg-primary-dark-500 w-10 h-10 rounded-full focus:bg-primary-gray-100 focus:text-primary-dark-500 focus:border-2 focus:border-primary-dark-500"
                >
                  <PlusIcon className="text-primary-gray-100"></PlusIcon>
                </button>
              </div>
            </form>
            <div className="bg-primary-dark-500 h-full w-1 rounded-full ml-5" />
            <div className="h-full flex flex-row w-1/5 mr-2">
              <div className="flex flex-col w-full justify-evenly items-center">
                <button className="w-8 h-8 flex justify-center">
                  <CalendarIcon />
                </button>
                <button className="w-8 h-8">
                  <ListBulletIcon />
                </button>
              </div>
              <div className="flex flex-col w-full justify-evenly">
                <button className="w-8 h-8">
                  <ChartPieIcon />
                </button>
                <button className="w-8 h-8">
                  <ArchiveBoxIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Options;
