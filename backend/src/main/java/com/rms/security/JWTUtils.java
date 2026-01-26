package com.rms.security;

import java.util.Date;
import java.util.Map;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.rms.entities.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;

@Component   //Spring-managed bean
@Slf4j       //create a logger for class
public class JWTUtils 
{
	// To inject a value in Spring bean (value based D.I)
	@Value("${jwt.secret.key}")   //SpEL - spring expression language
	private String secretKey;
	@Value("${jwt.expiration.time}")
	private long expTime;
	//Java Interface -> SecretKey => symmetric secret key - HMAC-SHA256
	private SecretKey key;
	
	@PostConstruct     //to perform initialization, executed after the dependency injection
	public void myInit()
	{
		key = Keys.hmacShaKeyFor(secretKey.getBytes());   // Convert secret string to Key object
		log.info("exp time {} key {}", expTime, key);     // logger object
	}
	
	// generate token
	public String generateToken(User user)
	{
		Date createdOn = new Date();
		Date expDate = new Date(createdOn.getTime()+expTime);
		return Jwts.builder()  // create JWT builder
				.subject(user.getEmail())    // set subject (issuer)
				.issuedAt(createdOn)         // set issued at
				.expiration(expDate)         // set expiration date
				.claims(Map.of("user_id", user.getId(), "role", user.getRole().name()))
				.signWith(key)
				.compact();                 // generate the token string
	}
	
	// validate token
	public Claims validateJWT(String jwt)
	{
		return Jwts.parser()             // parse JWT token
				.verifyWith(key)         // same secret key for verification
				.build()
				.parseSignedClaims(jwt)
				.getPayload();
	}

}
