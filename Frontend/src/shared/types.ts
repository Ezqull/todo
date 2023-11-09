export enum SelectedPage {
  Home = "home",
  SignIn = "signin",
  SignUp = "signup",
}

export interface BaseRequest {
  id: string;
}

export interface TaskRequest extends BaseRequest {
  title: string;
  description: string;
  priority: number;
  isDone: boolean;
  taskDate: Date;
  finishDate: Date;
  userId: string;
}

export interface TaskResponse {
  title: string;
  description: string;
  priority: number;
  isExactDate: boolean;
  isDone: boolean;
  finishDate: Date;
}

export interface UserResponse {
  username: string;
  tasks: Set<TaskResponse>;
}
