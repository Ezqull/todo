package project.app.nocando.data.repo;


import org.springframework.stereotype.Repository;
import project.app.nocando.data.model.TaskEntity;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface TaskRepository extends BaseRepository<TaskEntity> {
    List<TaskEntity> getAllByIsDoneAndFinishDateBetween(Boolean isDone, LocalDate startDate, LocalDate finishDate);
    List<TaskEntity> getAllByFinishDate(LocalDate finishDate);
    List<TaskEntity> getAllByTaskDate(LocalDate today);
}
