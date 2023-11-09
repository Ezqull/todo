package project.app.nocando.data.model.mapper;

import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import project.app.nocando.business.payload.request.UserRequest;
import project.app.nocando.business.payload.response.UserResponse;
import project.app.nocando.data.model.UserAccountEntity;

@Configuration
@AllArgsConstructor
public class UserConfig {

    private final TaskSetConverter converter;
    @Bean
    public ModelMapper userMapper(){
        ModelMapper mapper = new ModelMapper();

        TypeMap<UserAccountEntity, UserResponse> entityToResponse = mapper.typeMap(UserAccountEntity.class, UserResponse.class);
        entityToResponse.addMappings(map -> map.using(converter).map(UserAccountEntity::getTasks, UserResponse::setTasks));

        mapper.getConfiguration().setImplicitMappingEnabled(true);

        return mapper;
    }
}
