package project.app.nocando.data.model.mapper;

import lombok.AllArgsConstructor;
import org.modelmapper.AbstractConverter;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;
import project.app.nocando.business.payload.response.TaskResponse;
import project.app.nocando.data.model.TaskEntity;

import java.util.HashSet;
import java.util.Set;

@Component
@AllArgsConstructor
public class TaskSetConverter extends AbstractConverter<Set<TaskEntity>, Set<TaskResponse>> {

    private final ModelMapper taskMapper;

    @Override
    protected Set<TaskResponse> convert(Set<TaskEntity> tasks) {
        Set<TaskResponse> taskResponses = new HashSet<>();
        for (TaskEntity task : tasks) {

            TaskResponse commentResponse = taskMapper.map(task, TaskResponse.class);
            taskResponses.add(commentResponse);
        }
        return taskResponses;
    }
}
