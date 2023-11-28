import { BASE_URL, TaskPeriodRequest, TaskRequest } from "./types";
import { getEmail } from "./user";

const today = new Date();
const nextWeek = new Date(today);
nextWeek.setDate(today.getDate() + 7);
const USER_EMAIL = getEmail();

const formatDateToString = (date: Date) => {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();

  const formattedDate = dd + "-" + mm + "-" + yyyy;

  return formattedDate;
};

const initialRequest: TaskPeriodRequest = {
  isDone: false,
  startDate: formatDateToString(today),
  finishDate: formatDateToString(nextWeek),
};

export const createTask = async (jwtToken: string, task: TaskRequest) => {
  try {
    task.email = USER_EMAIL;
    console.log(task);

    const response = await fetch(BASE_URL + "/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Wystąpił błąd podczas pobierania danych: ", error);
  }
};

export const setTaskDone = async (jwtToken: string, id: string) => {
  try {
    const response = await fetch(BASE_URL + "/task/archive/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Wystąpił błąd podczas pobierania danych: ", error);
  }
};

export const setTasksUndone = async (
  jwtToken: string,
  tasks: TaskRequest[]
) => {
  try {
    const response = await fetch(BASE_URL + "/task/unarchive", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(tasks),
    });
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Wystąpił błąd podczas pobierania danych: ", error);
  }
};

export const getTasksForTheWeek = async (jwtToken: string) => {
  try {
    const response = await fetch(BASE_URL + "/task/period/" + USER_EMAIL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(initialRequest),
    });

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Wystąpił błąd podczas pobierania danych: ", error);
  }
};

export const getTasksFinishDatesForTheWeek = async (jwtToken: string) => {
  try {
    const response = await fetch(BASE_URL + "/task/finish/" + USER_EMAIL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(initialRequest),
    });

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Wystąpił błąd podczas pobierania danych: ", error);
  }
};

export const getTodaysTasks = async (jwtToken: string) => {
  try {
    const response = await fetch(BASE_URL + "/task/today/" + USER_EMAIL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Wystąpił błąd podczas pobierania danych: ", error);
  }
};

export const getAllTasks = async (jwtToken: string) => {
  try {
    const response = await fetch(BASE_URL + "/task/today/all/" + USER_EMAIL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Wystąpił błąd podczas pobierania danych: ", error);
  }
};

export const getArchivedTasks = async (jwtToken: string) => {
  try {
    const response = await fetch(BASE_URL + "/task/archived/" + USER_EMAIL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Wystąpił błąd podczas pobierania danych: ", error);
  }
};

export const updateTask = async (
  jwtToken: string,
  request: TaskRequest,
  id: string
) => {
  try {
    request.email = USER_EMAIL;
    const response = await fetch(BASE_URL + "/task/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(request),
    });
    console.log(response);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Wystąpił błąd podczas pobierania danych: ", error);
  }
};
