package project.app.nocando.data.model.mapper;

import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import project.app.nocando.business.payload.request.TaskRequest;
import project.app.nocando.business.payload.response.TaskResponse;
import project.app.nocando.data.model.TaskEntity;

@Configuration
public class TaskConfig {

    @Bean
    public ModelMapper taskMapper(){
        ModelMapper mapper = new ModelMapper();

        TypeMap<TaskRequest, TaskEntity> requestToEntity = mapper.typeMap(TaskRequest.class, TaskEntity.class);
        TypeMap<TaskEntity, TaskResponse> entityToResponse = mapper.typeMap(TaskEntity.class, TaskResponse.class);

        return mapper;
    }

}
