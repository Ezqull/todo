package project.app.nocando.business.payload.response;

import lombok.Data;

import java.time.LocalDate;

@Data
public class TaskResponse extends BaseResponse{
    private String title;
    private String description;
    private Integer priority;
    private Boolean isExactDate;
    private Boolean isDone;
    private LocalDate finishDate;
}
