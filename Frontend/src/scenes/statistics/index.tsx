import { useEffect, useState } from "react";
import useMediaQuery from "../../hooks/useMediaQuery";
import { TaskResponse } from "../../shared/types";
import { getAllTasks, getTodaysTasks } from "../../shared/tasks";
import * as V from "victory";

type Props = {};

function Statistics({}: Props) {
  const isAboveMediumScreens = useMediaQuery("(min-width:1060px)");
  const isAboveSmallScreens = useMediaQuery("(min-width:768px)");

  const [tasks, setTasks] = useState<TaskResponse[]>([]);
  const [data, setData] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    const jwtToken: string | null = localStorage.getItem("jwtToken");
    const fetchData = async () => {
      try {
        const response = await getAllTasks(jwtToken);
        setTasks(response);
      } catch (error) {
        console.error("Wystąpił błąd podczas pobierania danych: ", error);
      }
    };
    if (jwtToken) {
      fetchData();
    }
  }, []);

  useEffect(() => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((task) => task.isDone).length;
    const percentCompleted =
      totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    setData([
      { x: 1, y: percentCompleted },
      { x: 2, y: 100 - percentCompleted },
    ]);
  }, [tasks]);

  return (
    <>
      {isAboveMediumScreens ? (
        <div className="w-[70%] h-full bg-primary-gray-100 rounded-[2rem] p-6 flex flex-col justify-center flex-shrink-0">
          <span className="font-bold uppercase text-xl text-center">
            Tasks completed
          </span>

          <svg viewBox="0 0 400 400" width="100%" height="100%">
            <V.VictoryPie
              standalone={false}
              width={400}
              height={400}
              data={[{ x: "gray", y: 100 }]} // Statyczne dane dla 100% wypełnienia
              innerRadius={120}
              cornerRadius={25}
              labels={() => null}
              style={{
                data: {
                  fill: () => "#E8E8E8",
                },
              }}
              startAngle={0}
              endAngle={360}
            />
            <V.VictoryPie
              standalone={false}
              animate={{ duration: 1000 }}
              width={400}
              height={400}
              data={data}
              innerRadius={120}
              cornerRadius={25}
              labels={() => null}
              style={{
                data: {
                  fill: ({ datum }) => {
                    const color = datum.y < 50 ? "red" : "green";
                    return datum.x === 1 ? color : "transparent";
                  },
                },
              }}
              startAngle={0}
              endAngle={360}
        
            />
            <V.VictoryAnimation duration={1000} data={{ percent: data[0]?.y }}>
              {(newProps) => {
                return (
                  <V.VictoryLabel
                    textAnchor="middle"
                    verticalAnchor="middle"
                    x={200}
                    y={200}
                    text={`${Math.round(Number(newProps.percent) * 1)}%`}
                    style={{ fontSize: 45 }}
                  />
                );
              }}
            </V.VictoryAnimation>
          </svg>
        </div>
      ) : isAboveSmallScreens ? (
        <div className="max-h-[100%] h-[57.5%] w-full bg-primary-gray-100 rounded-[2rem] p-6">
          <span className="font-bold uppercase text-xl text-center">
            Tasks completed
          </span>

          <svg viewBox="0 0 400 400" width="100%" height="100%">
            <V.VictoryPie
              standalone={false}
              width={400}
              height={400}
              data={[{ x: "gray", y: 100 }]} // Statyczne dane dla 100% wypełnienia
              innerRadius={120}
              cornerRadius={25}
              labels={() => null}
              style={{
                data: {
                  fill: () => "#E8E8E8",
                },
              }}
              startAngle={0}
              endAngle={360}
            />
            <V.VictoryPie
              standalone={false}
              animate={{ duration: 1000 }}
              width={400}
              height={400}
              data={data}
              innerRadius={120}
              cornerRadius={25}
              labels={() => null}
              style={{
                data: {
                  fill: ({ datum }) => {
                    const color = datum.y < 50 ? "red" : "green";
                    return datum.x === 1 ? color : "transparent";
                  },
                },
              }}
              startAngle={0}
              endAngle={360}
            />
            <V.VictoryAnimation duration={1000} data={{ percent: data[0]?.y }}>
              {(newProps) => {
                return (
                  <V.VictoryLabel
                    textAnchor="middle"
                    verticalAnchor="middle"
                    x={200}
                    y={200}
                    text={`${Math.round(Number(newProps.percent) * 1)}%`}
                    style={{ fontSize: 45 }}
                  />
                );
              }}
            </V.VictoryAnimation>
          </svg>
        </div>
      ) : (
        <div className="h-full w-full bg-primary-gray-100 rounded-[2rem] p-6 overflow-scroll no-scrollbar">
          <span className="font-bold uppercase text-xl text-center">
            Tasks completed
          </span>

          <svg viewBox="0 0 400 400" width="100%" height="90%">
            <V.VictoryPie
              standalone={false}
              width={400}
              height={400}
              data={[{ x: "gray", y: 100 }]} // Statyczne dane dla 100% wypełnienia
              innerRadius={120}
              cornerRadius={25}
              labels={() => null}
              style={{
                data: {
                  fill: () => "#E8E8E8",
                },
              }}
              startAngle={0}
              endAngle={360}
            />
            <V.VictoryPie
              standalone={false}
              animate={{ duration: 1000 }}
              width={400}
              height={400}
              data={data}
              innerRadius={120}
              cornerRadius={25}
              labels={() => null}
              style={{
                data: {
                  fill: ({ datum }) => {
                    const color = datum.y < 50 ? "red" : "green";
                    return datum.x === 1 ? color : "transparent";
                  },
                },
              }}
              startAngle={0}
            />
            <V.VictoryAnimation duration={1000} data={{ percent: data[0]?.y }}>
              {(newProps) => {
                return (
                  <V.VictoryLabel
                    textAnchor="middle"
                    verticalAnchor="middle"
                    x={200}
                    y={200}
                    text={`${Math.round(Number(newProps.percent) * 1)}%`}
                    style={{ fontSize: 45 }}
                  />
                );
              }}
            </V.VictoryAnimation>
          </svg>
        </div>
      )}
    </>
  );
}

export default Statistics;
