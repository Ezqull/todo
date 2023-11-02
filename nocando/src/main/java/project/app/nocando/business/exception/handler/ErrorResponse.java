package project.app.nocando.business.exception.handler;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;
import java.util.Date;

@Data
@AllArgsConstructor
public class ErrorResponse {
    Integer statusCode;
    String message;
    Date date;
}
