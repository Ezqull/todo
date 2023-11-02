package project.app.nocando.business.exception;

public class RequestWithIdException extends RuntimeException{
    public RequestWithIdException() {
    }

    public RequestWithIdException(String message) {
        super(message);
    }
}
