package se.matappen.matappen.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id", nullable = false)
    private Integer id;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "email", nullable = false, length = 254)
    private String email;

    @Column(name = "password", nullable = false, length = 500)
    private String password;

    @Column(name = "role", nullable = false, length = 100)
    private String role = "user";

    @Column(name = "create_dt", nullable = false, updatable = false)
    @CreationTimestamp
    private LocalDateTime createDt;

}