package com.rohit.ems.controller;

import com.rohit.ems.dto.EmployeeDto;
import com.rohit.ems.service.EmployeeService;
import lombok.AllArgsConstructor;
import org.hibernate.annotations.DialectOverride;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("*")
@RestController
@RequestMapping("/api/employees")
@AllArgsConstructor
public class EmployeeController {
	private EmployeeService employeeService;
	
	private String getEmail(){
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication == null || !authentication.isAuthenticated()){
			throw new RuntimeException("User not authenticated");
		}
		return authentication.getName();
	}
	
	// Build Add Employee REST API
	@PostMapping
	public ResponseEntity<EmployeeDto> createEmployee(@RequestBody EmployeeDto employeeDto){
		EmployeeDto savedEmployee = employeeService.createEmployee(employeeDto,getEmail());
		return new ResponseEntity<>(savedEmployee, HttpStatus.CREATED);
	}
	
	// Build Get Employee REST API
	@GetMapping("{id}")
	public ResponseEntity<EmployeeDto> getEmployeeById(@PathVariable("id") Long employeeId){
		EmployeeDto employeeDto = employeeService.getEmployeeById(employeeId,getEmail());
		return ResponseEntity.ok(employeeDto);
	}
	
	//Build Get All Employee REST API
	@GetMapping
	public ResponseEntity<List<EmployeeDto>> getAllEmployees(){
		List<EmployeeDto> employees = employeeService.getAllEmployees(getEmail());
		return ResponseEntity.ok(employees);
	}
	
	//Build Update Employee REST API
	@PutMapping("{id}")
	public ResponseEntity<EmployeeDto> updateEmployee(@PathVariable("id") Long employeeId,@RequestBody EmployeeDto updatedEmployee){
		EmployeeDto employeeDto = employeeService.updateEmployee(employeeId,updatedEmployee,getEmail());
		return ResponseEntity.ok(employeeDto);
	}
	//Build Delete Employee REST API
	@DeleteMapping("{id}")
	public ResponseEntity<String> deleteEmployee(@PathVariable("id") Long employeeId){
		employeeService.deleteEmployee(employeeId,getEmail());
		return ResponseEntity.ok("Employee deleted successfully!");
	}
}
