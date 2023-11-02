package project.app.nocando.business.payload.request;

import lombok.Data;

@Data
public class UserRequest extends BaseRequest {
    private String username;
    private String password;
}
