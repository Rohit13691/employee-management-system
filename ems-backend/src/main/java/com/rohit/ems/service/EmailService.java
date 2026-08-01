package com.rohit.ems.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class EmailService {
	
	@Value("${brevo.api.key}")
	private String apiKey;
	
	private final WebClient webClient;
	
	public EmailService() {
		this.webClient = WebClient.builder()
				.baseUrl("https://api.brevo.com/v3")
				.build();
	}
	
	public void sendOtp(String email, String otp) {
		Map<String, Object> body = new HashMap<>();
		body.put("sender", Map.of("email", "jonathan75728@gmail.com", "name", "EMS App"));
		body.put("to", List.of(Map.of("email", email)));
		body.put("subject", "Email Verification OTP - EMS");
		body.put("htmlContent",
				"<p>Your OTP for email verification is: <strong>" + otp + "</strong></p>" +
						"<p>This OTP is valid for 5 minutes.</p>" +
						"<p>Do not share this OTP with anyone.</p>"
		);
		
		webClient.post()
				.uri("/smtp/email")
				.header("api-key", apiKey)
				.header("Content-Type", "application/json")
				.bodyValue(body)
				.retrieve()
				.bodyToMono(String.class)
				.block();
	}
}