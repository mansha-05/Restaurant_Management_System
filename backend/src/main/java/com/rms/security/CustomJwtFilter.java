package com.rms.security;

import java.io.IOException;
import java.util.List;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.rms.dtos.JWTDTO;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class CustomJwtFilter extends OncePerRequestFilter {
	private final JWTUtils jwtUtils;
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		String path = request.getServletPath();
		if (path.equals("/users/signin") ||
		        path.equals("/users/signup") ||
		        path.startsWith("/swagger-ui") ||
		        path.startsWith("/v3/api-docs")) {

		        filterChain.doFilter(request, response);
		        return;
		    }
		// check if jwt exists in request auth header
		String headerValue = request.getHeader("Authorization");
		if(headerValue != null && headerValue.startsWith("Bearer "))
		{
			String jwt = headerValue.substring(7);
			log.info("jwt found {}", jwt);
			Claims claims = jwtUtils.validateJWT(jwt);
			// store the claims in dto
			String role = claims.get("role", String.class);
			JWTDTO dto = new JWTDTO(claims.get("user_id", Long.class), role);
			// add this in Authentication object
			UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(dto, null, List.of(new SimpleGrantedAuthority("ROLE_"+role)));
			// add it under security context holder
			SecurityContextHolder.getContext().setAuthentication(auth);
			log.info("add security context");
		}
		filterChain.doFilter(request, response);
	}

}
