package project.app.nocando.business.payload.response;

import java.time.LocalDate;

public class TaskResponse extends BaseResponse{
    private Long id;

    private String title;
    private String description;
    private Integer priority;
    private Boolean isExactDate;
    private Boolean isDone;
    private LocalDate finishDate;
    private UserResponse user;
}
