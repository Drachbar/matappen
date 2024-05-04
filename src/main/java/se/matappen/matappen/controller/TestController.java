package se.matappen.matappen.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import se.matappen.matappen.model.User;
import se.matappen.matappen.repository.UserRepository;

@RestController
@RequestMapping("/api/v1")
@AllArgsConstructor
public class TestController {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    @GetMapping("/getUserByEmail")
    public User getUserByEmail(@RequestParam final String email) {
        return userRepository.findByEmail(email);
    }

    @PostMapping(value = "/register", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> registerUser(@Validated @RequestBody final User user) {
        try {
            String hashedPassword = passwordEncoder.encode(user.getPassword());
            user.setPassword(hashedPassword);

            User savedUser = userRepository.save(user);

            if (savedUser.getId() != null && savedUser.getId() > 0) {
                return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Unable to register user");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while registering the user");
        }
    }

    @RequestMapping("/login")
    public ResponseEntity<String> login() {
        return ResponseEntity.ok("Inloggningen lyckades");
    }

    @GetMapping("/testAuthentication")
    public ResponseEntity<String> testAuthentication() {
        return ResponseEntity.ok("Autentiserad");
    }
}
