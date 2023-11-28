package project.app.nocando.business.payload.response;

import lombok.Data;

import java.time.LocalDate;

@Data
public class TaskEmailResponse {
    public String title;
    public String description;
    private LocalDate finishDate;
    public String userEmail;
}
