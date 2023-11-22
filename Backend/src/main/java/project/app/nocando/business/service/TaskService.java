package project.app.nocando.business.service;

import project.app.nocando.business.payload.request.TaskPeriodRequest;
import project.app.nocando.business.payload.request.TaskRequest;
import project.app.nocando.business.payload.response.TaskEmailResponse;
import project.app.nocando.business.payload.response.TaskResponse;
import project.app.nocando.data.model.TaskEntity;
import project.app.nocando.data.model.UserAccountEntity;

import java.time.LocalDate;
import java.util.List;

public interface TaskService extends BaseService<TaskRequest, TaskResponse>{
    public List<TaskResponse> getTaskDatePeriod(TaskPeriodRequest request, String email);
    public List<TaskResponse> getFinishDatePeriod(TaskPeriodRequest request, String email);
    public List<TaskResponse> getAllByFinishDate(LocalDate finishDate);
    public List<TaskResponse> getTodaysTasks(String email);
    public List<TaskResponse> getAllArchived(String email);
    public List<TaskResponse> getAllTasksForToday(String email);
    public TaskResponse finishTask(String id);
    public List<TaskResponse> unarchiveTasks(List<TaskRequest> request);
    public void updateTaskDateForIncompleteTasks();
    List<TaskEmailResponse> dateCheckForEmail(LocalDate date);
}
