package project.app.nocando.data.repo;


import org.springframework.stereotype.Repository;
import project.app.nocando.data.model.TaskEntity;
import project.app.nocando.data.model.UserAccountEntity;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface TaskRepository extends BaseRepository<TaskEntity> {
    List<TaskEntity> getAllByIsDoneAndFinishDateBetweenAndUser(Boolean isDone, LocalDate taskDate, LocalDate finishDate, UserAccountEntity user);
    List<TaskEntity> getAllByFinishDate(LocalDate finishDate);
    List<TaskEntity> getAllByTaskDateAndUserAndIsDone(LocalDate taskDate, UserAccountEntity user, Boolean isDone);

    List<TaskEntity> getAllByIsDoneAndUser(Boolean isDone, UserAccountEntity user);
}
