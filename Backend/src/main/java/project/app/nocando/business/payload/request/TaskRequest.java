package project.app.nocando.business.payload.request;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Column;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDate;

@Data
@EqualsAndHashCode(callSuper = true)
public class TaskRequest extends BaseRequest {
    private String title;
    private String description;
    private Integer priority;
    private Boolean isDone;
    @JsonFormat(pattern="dd-MM-yyyy")
    private LocalDate taskDate;
    @JsonFormat(pattern="dd-MM-yyyy")
    private LocalDate finishDate;
    @JsonAlias("email")
    private String userEmail;
}
