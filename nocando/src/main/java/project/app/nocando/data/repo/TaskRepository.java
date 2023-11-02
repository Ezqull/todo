package project.app.nocando.data.repo;


import org.springframework.stereotype.Repository;
import project.app.nocando.data.model.TaskEntity;

@Repository
public interface TaskRepository extends BaseRepository<TaskEntity> {
}
