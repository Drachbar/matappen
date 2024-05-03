package se.matappen.matappen.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import se.matappen.matappen.model.User;

public interface UserRepository extends JpaRepository<User, Integer> {

    User findByName(String username);

    User findByEmail(String email);

}