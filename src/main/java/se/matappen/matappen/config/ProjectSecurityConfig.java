package se.matappen.matappen.config;

import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.stereotype.Component;
import org.springframework.web.cors.CorsConfiguration;
import se.matappen.matappen.security.SimpleAuthenticationEntryPoint;
import se.matappen.matappen.security.SimpleAuthenticationFailureHandler;
import se.matappen.matappen.security.SimpleAuthenticationSuccessHandler;

import java.util.Collections;

@Component
@AllArgsConstructor
public class ProjectSecurityConfig {

    private SimpleAuthenticationSuccessHandler successHandler;
    private SimpleAuthenticationFailureHandler failureHandler;
    private SimpleAuthenticationEntryPoint authenticationEntryPoint;

    @Bean
    SecurityFilterChain defaultSecurityFilterChain(final HttpSecurity http) throws Exception {
        http.cors(cors -> {
                    CorsConfiguration config = new CorsConfiguration();
                    config.setAllowedOrigins(Collections.singletonList("http://localhost:4200"));
                    config.setAllowedMethods(Collections.singletonList("*"));
                    config.setAllowCredentials(true);
                    config.setAllowedHeaders(Collections.singletonList("*"));
                    config.setMaxAge(3600L);
                    cors.configurationSource(request -> config);
                })
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests((requests) -> requests
                        .requestMatchers("/api/v1/login", "api/v1/testAuthentication", "api/v1/recipe/add").authenticated()
                        .anyRequest().permitAll())
                .formLogin(form -> form
                        .loginProcessingUrl("/api/v1/login")
                        .successHandler(successHandler)
                        .failureHandler(failureHandler)
                )
                .exceptionHandling(exceptionHandling ->
                        exceptionHandling
                                .authenticationEntryPoint(authenticationEntryPoint)
                );

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
