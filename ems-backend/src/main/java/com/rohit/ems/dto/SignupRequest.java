package com.rohit.ems.dto;

import lombok.Data;

@Data
public class SignupRequest {
	private String userName;
	private String email;
	private String password;
	private String role;
	private String provider;
	private String otp;
}
