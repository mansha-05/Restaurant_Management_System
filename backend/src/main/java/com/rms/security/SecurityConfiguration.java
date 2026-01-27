package com.rms.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.RequiredArgsConstructor;

@Configuration         // to declare java configuration class (equivalent to bean config xml)
@EnableWebSecurity     // to enable spring web security
@EnableMethodSecurity  // to enable method level annotation for spring security
@RequiredArgsConstructor   // non null and final
public class SecurityConfiguration 
{
	//private final PasswordEncoder passwordEncoder;
	private final CustomJwtFilter customJwtFilter;
	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	// configure SecurityFilterChain as a spring bean method
	@Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(request -> request
            		.requestMatchers(HttpMethod.OPTIONS).permitAll()
            		.anyRequest().permitAll()
//            	    .requestMatchers(HttpMethod.POST, "/users/signup").permitAll()
//            	    .requestMatchers(HttpMethod.POST, "/users/signin").permitAll()
//            	    .requestMatchers("/swagger-ui/**", "/v3/api-docs/**").permitAll()
//            	    .requestMatchers(HttpMethod.OPTIONS).permitAll()
//            	    .anyRequest().authenticated()
            	)
            .addFilterBefore(customJwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
	
	// configure AuthenticationManager as spring bean
	@Bean
	AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception
	{
		return config.getAuthenticationManager();
	}
	
	

}
