package project.app.nocando.business.payload.request;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDate;

@Data
@EqualsAndHashCode(callSuper = true)
public class TaskRequest extends BaseRequest {
    private String title;
    private String description;
    private Integer priority;
    private Boolean isExactDate;
    private Boolean isDone;
    private LocalDate finishDate;
    private Long userId;
}
