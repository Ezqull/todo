package project.app.nocando.security.config;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Service;
import project.app.nocando.business.exception.EntityNotFoundException;
import project.app.nocando.data.model.TokenEntity;
import project.app.nocando.data.repo.TokenRepository;

@Service
@RequiredArgsConstructor
public class LogoutService implements LogoutHandler {

    private final TokenRepository repo;

    @Override
    public void logout(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication
    ) {
        final String authHeader = request.getHeader("Authorization");
        final String jwt;

        if (authHeader == null || !authHeader.startsWith("Bearer ")){
            return;
        }

        jwt = authHeader.substring(7);
        TokenEntity storedToken = repo.findByToken(jwt).orElseThrow(EntityNotFoundException::new);

        if (storedToken != null) {
            storedToken.setExpired(true);
            storedToken.setRevoked(true);
            repo.save(storedToken);
        }
    }
}
