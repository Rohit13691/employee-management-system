package com.rohit.ems.service;

import com.rohit.ems.dto.EmployeeDto;

import java.util.List;

public interface EmployeeService {
	EmployeeDto createEmployee(EmployeeDto employeeDto,String email);
	
	EmployeeDto getEmployeeById(Long employeeId,String email);
	
	List<EmployeeDto> getAllEmployees(String email);
	
	EmployeeDto updateEmployee(Long employeeId,EmployeeDto updateEmployee,String email);
	
	void deleteEmployee(Long employeeId,String email);
}
