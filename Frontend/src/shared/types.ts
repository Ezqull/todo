export const BASE_URL = "http://localhost:8080";

export enum SelectedPage {
  Home = "home",
  Calendar = "calendar",
  Statistics = "statistics",
  Archive = "archive",
}

export interface BaseRequest {
  id: string;
}

export interface TaskRequest {
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
}

export interface UserResponse {
  email: string;
  tasks: Set<TaskResponse>;
}

export interface AuthRequest {
  email: string;
  password: string;
}
