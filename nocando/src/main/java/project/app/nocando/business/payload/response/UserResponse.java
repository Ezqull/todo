package project.app.nocando.business.payload.response;

import java.util.Set;

public class UserResponse extends BaseResponse{
    private Long id;
    private String username;
    private Set<TaskResponse> tasks;
}
