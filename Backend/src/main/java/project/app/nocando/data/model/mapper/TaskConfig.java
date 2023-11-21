package project.app.nocando.data.model.mapper;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import project.app.nocando.business.payload.response.TaskEmailResponse;
import project.app.nocando.business.payload.response.TaskResponse;
import project.app.nocando.business.payload.response.UserResponse;
import project.app.nocando.data.model.TaskEntity;
import project.app.nocando.data.model.UserAccountEntity;

@Configuration
public class TaskConfig {

    @Bean
    public ModelMapper taskMapper(){
        return new ModelMapper();
    }
    @Bean
    public ModelMapper taskEmailMapper() {
        ModelMapper mapper = new ModelMapper();
        TypeMap<TaskEntity, TaskEmailResponse> typeMap = mapper.createTypeMap(TaskEntity.class, TaskEmailResponse.class);
        typeMap.addMappings(mapping -> {
            mapping.map(src -> src.getUser().getEmail(), TaskEmailResponse::setUserEmail);
        });
        return mapper;
    }
}
