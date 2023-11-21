package project.app.nocando.business.service.impl;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import project.app.nocando.business.exception.EntityNotFoundException;
import project.app.nocando.business.exception.RequestWithIdException;
import project.app.nocando.business.payload.request.TaskPeriodRequest;
import project.app.nocando.business.payload.request.TaskRequest;
import project.app.nocando.business.payload.response.TaskEmailResponse;
import project.app.nocando.business.payload.response.TaskResponse;
import project.app.nocando.business.service.TaskService;
import project.app.nocando.data.model.TaskEntity;
import project.app.nocando.data.model.UserAccountEntity;
import project.app.nocando.data.repo.TaskRepository;
import project.app.nocando.data.repo.UserRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@Transactional
@AllArgsConstructor
public class TaskServiceImpl implements TaskService {

    private final TaskRepository repo;
    private final UserRepository userRepository;
    private final ModelMapper taskMapper;
    @Override
    public TaskResponse getById(String id) {
        Objects.requireNonNull(id);

        return taskMapper.map(repo.findById(id).orElseThrow(EntityNotFoundException::new), TaskResponse.class);
    }

    @Override
    public List<TaskResponse> getAll() {
        return repo.findAll().stream()
                .map(entity -> taskMapper.map(entity, TaskResponse.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<TaskResponse> getTaskDatePeriod(TaskPeriodRequest request, String email) {
        Objects.requireNonNull(request);
        Objects.requireNonNull(email);

        UserAccountEntity user = userRepository.findByEmail(email).orElseThrow(EntityNotFoundException::new);

        List<TaskEntity> entities = repo.getAllByIsDoneAndTaskDateBetweenAndUser(request.getIsDone(), request.getStartDate(), request.getFinishDate(), user);

        return entities.stream()
                .map(entity -> taskMapper.map(entity, TaskResponse.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<TaskResponse> getFinishDatePeriod(TaskPeriodRequest request, String email) {
        Objects.requireNonNull(request);
        Objects.requireNonNull(email);

        UserAccountEntity user = userRepository.findByEmail(email).orElseThrow(EntityNotFoundException::new);

        List<TaskEntity> entities = repo.getAllByIsDoneAndFinishDateBetweenAndUser(request.getIsDone(), request.getStartDate(), request.getFinishDate(), user);

        return entities.stream()
                .map(entity -> taskMapper.map(entity, TaskResponse.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<TaskResponse> getAllByFinishDate(LocalDate finishDate) {
        List<TaskEntity> entities = repo.getAllByFinishDate(finishDate);

        return entities.stream()
                .map(entity -> taskMapper.map(entity, TaskResponse.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<TaskResponse> getTodaysTasks(String email) {
        Objects.requireNonNull(email);

        UserAccountEntity user = userRepository.findByEmail(email).orElseThrow(EntityNotFoundException::new);

        List<TaskEntity> entities = repo.getAllByTaskDateAndUserAndIsDone(LocalDate.now(), user, false);

        return entities.stream()
                .map(entity -> taskMapper.map(entity, TaskResponse.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<TaskResponse> getAllArchived(String email) {
        Objects.requireNonNull(email);

        UserAccountEntity user = userRepository.findByEmail(email).orElseThrow(EntityNotFoundException::new);

        List<TaskEntity> entities = repo.getAllByIsDoneAndUser(true, user);

        return entities.stream()
                .map(entity -> taskMapper.map(entity, TaskResponse.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<TaskResponse> getAllTasksForToday(String email) {
        Objects.requireNonNull(email);

        UserAccountEntity user = userRepository.findByEmail(email).orElseThrow(EntityNotFoundException::new);

        List<TaskEntity> entities = repo.findAllByTaskDateAndUser(LocalDate.now(), user);

        return entities.stream()
                .map(entity -> taskMapper.map(entity, TaskResponse.class))
                .collect(Collectors.toList());    }

    @Override
    public TaskResponse finishTask(String id) {
        Objects.requireNonNull(id);

        TaskEntity entity = repo.findById(id).orElseThrow(EntityNotFoundException::new);
        entity.setIsDone(true);

        return taskMapper.map(entity, TaskResponse.class);
    }

    @Override
    public List<TaskResponse> unarchiveTasks(List<TaskRequest> request) {
        Objects.requireNonNull(request);

        List<String> ids = request.stream().map(TaskRequest::getId).toList();
        List<TaskEntity> entities = repo.findAllById(ids);
        entities.forEach((task)-> {
            task.setTaskDate(LocalDate.now());
            task.setFinishDate(LocalDate.now());
            task.setIsDone(false);
        });
        repo.saveAllAndFlush(entities);
        System.out.println(entities);
        return entities.stream()
                .map(entity -> taskMapper.map(entity, TaskResponse.class))
                .collect(Collectors.toList());
    }

    @Override
    public void updateTaskDateForIncompleteTasks() {
        repo.updateTaskDateForIncompleteTasks(LocalDate.now());
    }

    @Override
    public List<TaskEmailResponse> dateCheckForEmail(LocalDate date) {
        Objects.requireNonNull(date);

        List<TaskEntity> entities = repo.findByFinishDateLessThanEqualAndIsDoneFalse(date);

        return entities.stream()
                .map(entity -> taskMapper.map(entity, TaskEmailResponse.class))
                .collect(Collectors.toList());
    }

    @Override
    public TaskResponse save(TaskRequest request) {
        Objects.requireNonNull(request);

        if (request.getId() != null){
            throw new RequestWithIdException();
        }

        UserAccountEntity user = userRepository.findByEmail(request.getUserEmail()).orElseThrow(EntityNotFoundException::new);
        TaskEntity entity = taskMapper.map(request, TaskEntity.class);
        entity.setUser(user);

        return taskMapper.map(repo.save(entity), TaskResponse.class);
    }

    @Override
    public TaskResponse update(TaskRequest request, String id) {
        Objects.requireNonNull(request);
        Objects.requireNonNull(id);

        if (request.getId() != null){
            throw new RequestWithIdException();
        }

        request.setId(id);
        TaskEntity entity = taskMapper.map(request, TaskEntity.class);

        UserAccountEntity user = userRepository.findByEmail(request.getUserEmail()).orElseThrow(EntityNotFoundException::new);
        entity.setUser(user);

        return taskMapper.map(repo.saveAndFlush(entity), TaskResponse.class);
    }

    @Override
    public void delete(String id) {
        Objects.requireNonNull(id);
        repo.deleteById(id);
    }
}
