package com.rohit.ems.service;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
public class OtpService {
	private final EmailService emailService;
	private final Map<String,String> otpStore = new HashMap<>();
	private final Map<String, LocalDateTime> otpExpiry = new HashMap<>();
	
	public OtpService(EmailService emailService) {
		this.emailService = emailService;
	}
	
	public void generateOtp(String email){
		String otp = String.valueOf(new Random().nextInt(900000)+100000);
		otpStore.put(email,otp);
		otpExpiry.put(email,LocalDateTime.now().plusMinutes(5));
		emailService.sendOtp(email,otp);
	}
	
	public Boolean validateOtp(String email,String otp){
		if(!otpStore.containsKey(email))
			return false;
		if(LocalDateTime.now().isAfter(otpExpiry.get(email))){
			removeOtp(email);
			return false;
		}
		return otpStore.get(email).equals(otp);
	}
	
	public void removeOtp(String email){
		otpStore.remove(email);
		otpExpiry.remove(email);
	}
}
