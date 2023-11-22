package project.app.nocando.data.repo;

import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import project.app.nocando.data.model.TokenEntity;
import project.app.nocando.data.model.UserAccountEntity;

import java.util.List;
import java.util.Optional;

@Repository
public interface TokenRepository extends BaseRepository<TokenEntity>{
    @Query(value = """
      select t from TokenEntity t inner join UserAccountEntity u\s
      on t.user.id = u.id\s
      where u.id = :id and (t.expired = false or t.revoked = false)\s
      """)
    List<TokenEntity> findAllValidTokenByUser(String id);
    Optional<TokenEntity> findByToken(String token);
}
