package project.app.nocando.security.auth.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import project.app.nocando.business.exception.EntityNotFoundException;
import project.app.nocando.data.model.UserAccountEntity;
import project.app.nocando.data.repo.UserRepository;
import project.app.nocando.security.auth.request.AuthenticationRequest;
import project.app.nocando.security.auth.request.RegisterRequest;
import project.app.nocando.security.auth.response.AuthenticationResponse;
import project.app.nocando.security.service.JwtService;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository repo;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(final RegisterRequest request) {

        System.out.println(request);

        UserAccountEntity entity = new UserAccountEntity(
                request.getEmail(),
                passwordEncoder.encode(request.getPassword())
                );

        repo.save(entity);
        String jwtToken = jwtService.generateToken(entity);

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(final AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        UserAccountEntity entity = repo.findByEmail(request.getEmail()).orElseThrow(EntityNotFoundException::new);

        String jwtToken = jwtService.generateToken(entity);

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
}
