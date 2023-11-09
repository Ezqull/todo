package project.app.nocando.data.repo;


import org.springframework.stereotype.Repository;
import project.app.nocando.data.model.UserAccountEntity;

import java.util.Optional;

@Repository
public interface UserRepository extends BaseRepository<UserAccountEntity>{
    Optional<UserAccountEntity> findByEmail(String email);
}
