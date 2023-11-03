package project.app.nocando.business.service.impl;

import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import project.app.nocando.business.exception.EntityNotFoundException;
import project.app.nocando.business.exception.RequestWithIdException;
import project.app.nocando.business.payload.request.TaskPeriodRequest;
import project.app.nocando.business.payload.request.TaskRequest;
import project.app.nocando.business.payload.response.TaskResponse;
import project.app.nocando.business.service.TaskService;
import project.app.nocando.data.model.TaskEntity;
import project.app.nocando.data.repo.TaskRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class TaskServiceImpl implements TaskService {

    private final TaskRepository repo;
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
    public List<TaskResponse> getAllByIsDoneAndFinishDateBetween(TaskPeriodRequest request) {
        Objects.requireNonNull(request);

        List<TaskEntity> entities = repo.getAllByIsDoneAndFinishDateBetween(request.getIsDone(), request.getStartDate(), request.getFinishDate());

        return entities.stream()
                .map(entity -> taskMapper.map(entity, TaskResponse.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<TaskResponse> getAllByFinishDate() {
        List<TaskEntity> entities = repo.getAllByFinishDate(LocalDate.now());

        return entities.stream()
                .map(entity -> taskMapper.map(entity, TaskResponse.class))
                .collect(Collectors.toList());
    }

    @Override
    public TaskResponse save(TaskRequest request) {
        Objects.requireNonNull(request);

        if (request.getId() != null){
            throw new RequestWithIdException();
        }

        TaskEntity entity = taskMapper.map(request, TaskEntity.class);

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

        return taskMapper.map(repo.save(entity), TaskResponse.class);
    }

    @Override
    public void delete(String id) {
        Objects.requireNonNull(id);
        repo.deleteById(id);
    }
}
