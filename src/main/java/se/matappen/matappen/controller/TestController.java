package se.matappen.matappen.controller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import se.matappen.matappen.model.User;
import se.matappen.matappen.repository.UserRepository;

@RestController
@RequestMapping("/api/v1")
@AllArgsConstructor
public class TestController {

    private final UserRepository userRepository;

    @GetMapping("/getUserByEmail")
    public User getUserByEmail(@RequestParam final String email) {
        return userRepository.findByEmail(email);
    }
}
