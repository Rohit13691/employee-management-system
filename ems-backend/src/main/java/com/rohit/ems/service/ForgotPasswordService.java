package com.rohit.ems.service;

import com.rohit.ems.entity.PasswordResetToken;
import com.rohit.ems.entity.User;
import com.rohit.ems.respository.PasswordResetTokenRepository;
import com.rohit.ems.respository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@AllArgsConstructor
public class ForgotPasswordService {
	private final UserRepository userRepository;
	private final PasswordResetTokenRepository tokenRepository;
	private final EmailService emailService;
	private final PasswordEncoder passwordEncoder;
	
	@Transactional
	public void sendResetLink(String email){
		User user = userRepository.findByEmailIgnoreCase(email)
				.orElseThrow(()-> new RuntimeException("Email not found"));
		
//		 Delete old token if exists
		tokenRepository.deleteByEmail(email.toLowerCase());
		
//		Generate new token
		String token = UUID.randomUUID().toString();
		PasswordResetToken resetToken = new PasswordResetToken();
		resetToken.setToken(token);
		resetToken.setEmail(email);
		resetToken.setExpiryTime(LocalDateTime.now().plusMinutes(15));
		tokenRepository.save(resetToken);
		
//		Send email
		emailService.setPasswordResetLink(email,token);
		
	}
	
	@Transactional
	public void resetPassword(String token,String newPassword){
		PasswordResetToken resetToken = tokenRepository.findByToken(token)
				.orElseThrow(() -> new RuntimeException("Invalid or expired token"));
		
		if(LocalDateTime.now().isAfter(resetToken.getExpiryTime())){
			tokenRepository.delete(resetToken);
			throw new RuntimeException("Token expired");
		}
		
		User user = userRepository.findByEmailIgnoreCase(resetToken.getEmail())
				.orElseThrow(() -> new RuntimeException("User not found"));
		
		user.setPassword(passwordEncoder.encode(newPassword));
		userRepository.save(user);
		tokenRepository.delete(resetToken);
	}
	
}
