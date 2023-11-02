package project.app.nocando.data.model.mapper;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import project.app.nocando.business.payload.request.UserRequest;
import project.app.nocando.data.model.UserAccountEntity;

@Configuration
public class UserConfig {
    @Bean
    public ModelMapper userMapper(){
        ModelMapper mapper = new ModelMapper();

        TypeMap<UserRequest, UserAccountEntity> requestToEntity = mapper.typeMap(UserRequest.class, UserAccountEntity.class);
        TypeMap<UserAccountEntity, UserRequest> entityToResponse = mapper.typeMap(UserAccountEntity.class, UserRequest.class);

        return mapper;
    }
}
