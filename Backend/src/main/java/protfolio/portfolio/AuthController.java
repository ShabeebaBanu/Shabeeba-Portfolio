package protfolio.portfolio;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

@Service
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {


    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
    private static final String USERNAME = "admin";
    private static final String PASSWORD = "$2a$10$P7oSntC8uIYra7da9c9anOHnYDuA8OsetubcEsmF0oB0GVVOEj2HC";


    @GetMapping("/admin")
    public ResponseEntity<String> getAdminPage(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null && session.getAttribute("user") != null) {
            return new ResponseEntity<>("Welcome to the admin page!", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
        }
    }

    private boolean isValid(String authHeader) {
        if (authHeader.startsWith("Basic ")) {
            String base64Credentials = authHeader.substring("Basic ".length()).trim();
            String credentials = new String(java.util.Base64.getDecoder().decode(base64Credentials));
            // credentials = username:password
            final String[] values = credentials.split(":", 2);
            return USERNAME.equals(values[0]) && passwordEncoder.matches(values[1], PASSWORD);
        }
        return false;
    }

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest, HttpServletRequest request) {
        String username = loginRequest.getUsername();
        String password = loginRequest.getPassword();

        // Check credentials
        if (USERNAME.equals(username) && passwordEncoder.matches(password, PASSWORD)) {
            // Credentials are valid
            HttpSession session = request.getSession();
            session.setAttribute("user",username);
            return new ResponseEntity<>("Login successful", HttpStatus.OK);
        } else {
            // Credentials are invalid
            return new ResponseEntity<>("Invalid credentials", HttpStatus.UNAUTHORIZED);
        }
    }

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate(); // Invalidate the session
        }
        return new ResponseEntity<>("Logged out successfully", HttpStatus.OK);
    }


}
