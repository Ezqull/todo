package project.app.nocando.security.auth.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Service;
import project.app.nocando.business.exception.EntityNotFoundException;
import project.app.nocando.data.model.TokenEntity;
import project.app.nocando.data.model.TokenType;
import project.app.nocando.data.model.UserAccountEntity;
import project.app.nocando.data.repo.TokenRepository;
import project.app.nocando.data.repo.UserRepository;
import project.app.nocando.security.auth.request.AuthenticationRequest;
import project.app.nocando.security.auth.request.RegisterRequest;
import project.app.nocando.security.auth.response.AuthenticationResponse;
import project.app.nocando.security.service.JwtService;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository repo;
    private final TokenRepository tokenRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public void register(final RegisterRequest request) {

        UserAccountEntity entity = new UserAccountEntity(
                request.getEmail(),
                passwordEncoder.encode(request.getPassword())
                );
        repo.save(entity);
    }

    public AuthenticationResponse authenticate(final AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        UserAccountEntity entity = repo.findByEmail(request.getEmail()).orElseThrow(EntityNotFoundException::new);

        String jwtToken = jwtService.generateToken(entity);
        String refreshToken = jwtService.generateRefreshToken(entity);
        revokeTokens(entity);
        saveToken(entity, jwtToken);
        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .build();
    }

    private void revokeTokens(UserAccountEntity user){
        List<TokenEntity> validTokens = tokenRepo.findAllValidTokenByUser(user.getId());
        if (validTokens.isEmpty()){
            return;
        }
        validTokens.forEach(t -> {
            t.setExpired(true);
            t.setRevoked(true);
        });
        tokenRepo.saveAll(validTokens);
    }

    private void saveToken(UserAccountEntity user, String jwtToken){
        TokenEntity token = new TokenEntity(jwtToken,
                TokenType.BEARER,
                false,
                false,
                user);
        tokenRepo.save(token);
    }

    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String refreshToken;
        final String email;

        if (authHeader == null || !authHeader.startsWith("Bearer ")){
            return;
        }

        refreshToken = authHeader.substring(7);
        email = jwtService.extractUsername(refreshToken);
        if (email != null) {
            UserAccountEntity user = this.repo.findByEmail(email).orElseThrow(EntityNotFoundException::new);
            if (jwtService.isTokenValid(refreshToken, user)) {
                String accessToken = jwtService.generateToken(user);
                revokeTokens(user);
                saveToken(user, accessToken);
                AuthenticationResponse authResponse = AuthenticationResponse.builder()
                        .accessToken(accessToken)
                        .refreshToken(refreshToken)
                        .build();
                new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
            }
        }
    }
}
