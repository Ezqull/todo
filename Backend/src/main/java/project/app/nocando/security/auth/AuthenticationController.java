package project.app.nocando.security.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.app.nocando.security.auth.request.AuthenticationRequest;
import project.app.nocando.security.auth.request.RegisterRequest;
import project.app.nocando.security.auth.response.AuthenticationResponse;
import project.app.nocando.security.auth.service.AuthService;

@RestController
@RequestMapping("/auth")
@CrossOrigin("http://localhost:5173")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthService service;

    @PostMapping("/register")
    public ResponseEntity<Object> register(@RequestBody RegisterRequest request){
        service.register(request);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request){
        return ResponseEntity.ok(service.authenticate(request));
    }
}
