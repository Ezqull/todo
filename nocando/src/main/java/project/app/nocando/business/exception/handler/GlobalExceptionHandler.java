package project.app.nocando.business.exception.handler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import project.app.nocando.business.exception.RequestWithIdException;
import project.app.nocando.business.exception.EntityNotFoundException;

import java.util.Date;

@RestController
@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(value = EntityNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleEntityNotFoundException(){
        ErrorResponse response = new ErrorResponse(404, "Entity Not Found!", new Date());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = RequestWithIdException.class)
    public ResponseEntity<ErrorResponse> handleRequestWithIdException(){
        ErrorResponse response = new ErrorResponse(409, "Can't create an entity with predefined id!", new Date());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
}
