import { TaskResponse } from "./types";

export default function mergeAndFilterTasks(
  tasks: TaskResponse[],
  finishTasks: TaskResponse[]
) {
  const finishTasksWithFlag: TaskResponse[] = finishTasks.map((task) => ({
    ...task,
    isFinishDay: true,
    taskDate: task.finishDate,
  }));

  const dateTasksMap: { [dateKey: string]: TaskResponse[] } = {};

  tasks.forEach((task) => {
    const dateKey = new Date(task.taskDate).toISOString().split("T")[0];
    if (!dateTasksMap[dateKey]) {
      dateTasksMap[dateKey] = [];
    }
    dateTasksMap[dateKey].push(task);
  });

  finishTasksWithFlag.forEach((task) => {
    const dateKey = new Date(task.taskDate).toISOString().split("T")[0];
    if (dateTasksMap[dateKey]) {
      dateTasksMap[dateKey] = [task];
    } else {
      dateTasksMap[dateKey] = [task];
    }
  });

  const uniqueTasks: TaskResponse[] = Object.values(dateTasksMap).flat();

  return uniqueTasks;
}
