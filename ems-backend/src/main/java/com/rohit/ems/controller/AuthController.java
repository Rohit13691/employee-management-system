package com.rohit.ems.controller;

import com.rohit.ems.dto.JwtResponse;
import com.rohit.ems.dto.LoginRequest;
import com.rohit.ems.dto.ResetPasswordRequest;
import com.rohit.ems.dto.SignupRequest;
import com.rohit.ems.entity.User;
import com.rohit.ems.respository.UserRepository;
import com.rohit.ems.security.JwtUtil;
import com.rohit.ems.service.ForgotPasswordService;
import com.rohit.ems.service.OtpService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
@AllArgsConstructor
public class AuthController {

	private final AuthenticationManager authenticationManager;
	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtUtil jwtUtil;
	private final OtpService otpService;
	private final ForgotPasswordService forgotPasswordService;
	
	@PostMapping("/send-otp")
	public ResponseEntity<?> sendOtp(@RequestParam String email){
		if(userRepository.existsByEmailIgnoreCase(email)){
			return ResponseEntity.badRequest().body("Email already exists");
		}
		otpService.generateOtp(email.toLowerCase());
		return ResponseEntity.ok("OTP sent to '" + email+"'");
	}
	
	@PostMapping("/signup")
	public ResponseEntity<?> signup(@RequestBody SignupRequest request){
		
		if(userRepository.existsByEmailIgnoreCase(request.getEmail())){
			return ResponseEntity.badRequest().body("Email already exists");
		}else if(!otpService.validateOtp(request.getEmail(), request.getOtp())){
			return ResponseEntity.badRequest().body("Invalid or Expired OTP");
		}else{
			User user = new User();
			user.setUserName(request.getUserName());
			user.setEmail(request.getEmail().toLowerCase());
			user.setPassword(passwordEncoder.encode(request.getPassword()));
			user.setRole("ROLE_USER");
			user.setProvider("LOCAL");
			
			userRepository.save(user);
			otpService.removeOtp(request.getEmail());
			
			return ResponseEntity.ok("User registered successfully");
		}
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginRequest request){
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(request.getEmail().toLowerCase(),request.getPassword())
		);
		
		if(authentication.isAuthenticated()){
			User user = userRepository.findByEmailIgnoreCase(request.getEmail())
					.orElseThrow(()->new RuntimeException("User not found"));
			String token = jwtUtil.generateToken(request.getEmail());
			
			return ResponseEntity.ok(new JwtResponse(
					token,
					user.getEmail(),
					user.getUserName(),
					user.getRole()
			));
		}
		
		return ResponseEntity.badRequest().body("Invalid credentials");
	}
	
	@PostMapping("/forgot-password")
	public ResponseEntity<?> forgotPassword(@RequestBody Map<String,String> request){
		try{
			forgotPasswordService.sendResetLink(request.get("email"));
			return ResponseEntity.ok("Password reset link sent to "+request.get("email"));
		} catch (RuntimeException e){
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}
	
	public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest request){
		try{
			forgotPasswordService.resetPassword(request.getToken(),request.getNewPassword());
			return ResponseEntity.ok("Password reset successfully");
		} catch (RuntimeException e){
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}
}
