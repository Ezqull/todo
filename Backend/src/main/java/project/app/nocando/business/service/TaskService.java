package project.app.nocando.business.service;

import project.app.nocando.business.payload.request.TaskPeriodRequest;
import project.app.nocando.business.payload.request.TaskRequest;
import project.app.nocando.business.payload.response.TaskResponse;
import project.app.nocando.data.model.TaskEntity;

import java.time.LocalDate;
import java.util.List;

public interface TaskService extends BaseService<TaskRequest, TaskResponse>{
    public List<TaskResponse> getAllByIsDoneAndFinishDateBetween(TaskPeriodRequest request);
    public List<TaskResponse> getAllByFinishDate(LocalDate finishDate);
    public List<TaskResponse> getTodaysTasks();
}
