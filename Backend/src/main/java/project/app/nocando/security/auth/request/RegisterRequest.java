package project.app.nocando.security.auth.request;

import com.fasterxml.jackson.annotation.JsonAlias;
import lombok.*;

@Data
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    @JsonAlias("email")
    private String email;
    @JsonAlias("password")
    private String password;
}
