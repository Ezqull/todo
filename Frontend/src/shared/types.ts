import { TaskRequest } from "./types";
export const BASE_URL = "http://localhost:8080";

export enum SelectedPage {
  Home = "home",
  Calendar = "calendar",
  Statistics = "statistics",
  Archive = "archive",
}

export interface BaseRequest {
  id?: string;
}

export interface TaskRequest extends BaseRequest {
  title: string;
  description: string;
  priority: number;
  isDone: boolean;
  taskDate: string;
  finishDate: string;
  email: string;
}

export interface TaskPeriodRequest {
  isDone: boolean | null;
  startDate: string;
  finishDate: string;
}

export interface TaskResponse extends BaseRequest {
  title: string;
  description: string;
  priority: number;
  taskDate: Date;
  finishDate: Date;
  isDone: boolean;
  isLate: boolean;
  isFinishDay?: boolean;
}

export interface UserResponse {
  email: string;
  tasks: Set<TaskResponse>;
}

export interface AuthRequest {
  email: string;
  password: string;
}

export const taskMapper = (response: TaskResponse): TaskRequest => {
  const request: TaskRequest = {
    id: response.id,
    title: response.title,
    description: response.description,
    priority: response.priority,
    isDone: response.isDone,
    taskDate: formatDateToString(new Date(response.taskDate)),
    finishDate: formatDateToString(new Date(response.finishDate)),
    email: "",
  };
  return request;
};

const formatDateToString = (date: Date) => {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();

  const formattedDate = dd + "-" + mm + "-" + yyyy;

  return formattedDate;
};
