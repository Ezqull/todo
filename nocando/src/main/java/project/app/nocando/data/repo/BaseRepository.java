package project.app.nocando.data.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.app.nocando.data.model.BaseEntity;

import java.util.List;

@Repository

public interface BaseRepository<T extends BaseEntity> extends JpaRepository<T, String> {
    List<T> findAll();

    void deleteById(String id);
}
