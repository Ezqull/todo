package project.app.nocando.business.exception;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(){
        super();
    }

    public UserNotFoundException(String message){
        super(message);
    }
}
