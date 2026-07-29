package com.rohit.ems.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
	private final JavaMailSender mailSender;
	
	public EmailService(JavaMailSender mailSender) {
		this.mailSender = mailSender;
	}
	
	public void sendOtp(String email,String otp){
		SimpleMailMessage  message = new SimpleMailMessage();
		message.setTo(email);
		message.setSubject("Email Verification Otp - EMS");
		message.setText("Your OTP for email verification is: "+otp+"\n\nThis OTP is valid for 5 minutes.\n\nDo not share this OTP with anyone.");
		mailSender.send(message);
	}
}
