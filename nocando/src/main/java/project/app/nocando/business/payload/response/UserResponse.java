package project.app.nocando.business.payload.response;

import lombok.Data;

import java.util.Set;

@Data
public class UserResponse extends BaseResponse{
    private String username;
    private Set<TaskResponse> tasks;
}
