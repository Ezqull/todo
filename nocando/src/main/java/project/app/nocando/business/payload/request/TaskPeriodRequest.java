package project.app.nocando.business.payload.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import project.app.nocando.data.model.BaseEntity;

import java.time.LocalDate;

@Data
public class TaskPeriodRequest extends BaseEntity {
    private Boolean isDone;
    @JsonFormat(pattern="dd-MM-yyyy")
    private LocalDate startDate;
    @JsonFormat(pattern="dd-MM-yyyy")
    private LocalDate finishDate;
}
