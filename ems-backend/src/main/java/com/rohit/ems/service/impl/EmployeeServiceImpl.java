package com.rohit.ems.service.impl;

import com.rohit.ems.dto.EmployeeDto;
import com.rohit.ems.entity.Employee;
import com.rohit.ems.entity.User;
import com.rohit.ems.exception.ResourceNotFoundException;
import com.rohit.ems.mapper.EmployeeMapper;
import com.rohit.ems.respository.EmployeeRepository;
import com.rohit.ems.respository.UserRepository;
import com.rohit.ems.service.EmployeeService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {
	
	private EmployeeRepository employeeRepository;
	private UserRepository userRepository;
	
	private User getUser(String email){
		return userRepository.findByEmailIgnoreCase(email)
				.orElseThrow(()->new RuntimeException("User not found"));
	}
	
	@Override
	public EmployeeDto createEmployee(EmployeeDto employeeDto, String email) {
		User user = getUser(email);
		Employee employee = EmployeeMapper.mapToEmployee(employeeDto);
		employee.setUser(user);
		Employee saveEmployee = employeeRepository.save(employee);
		
		return EmployeeMapper.mapToEmployeeDto(saveEmployee);
	}
	
	@Override
	public EmployeeDto getEmployeeById(Long employeeId,String email) {
		User user = getUser(email);
		Employee employee = employeeRepository.findById(employeeId)
				.orElseThrow(() -> new ResourceNotFoundException("Employee is not exists with the given id" + employeeId));
		if (!employee.getUser().getId().equals(user.getId())) {
			throw new RuntimeException("Unauthorized access");
		}
		return EmployeeMapper.mapToEmployeeDto(employee);
	}
	
	@Override
	public List<EmployeeDto> getAllEmployees(String email) {
		User user = getUser(email);
		return employeeRepository.findByUser(user)
				.stream()
				.map((EmployeeMapper::mapToEmployeeDto))
				.collect(Collectors.toList());
	}
	
	@Override
	public EmployeeDto updateEmployee(Long employeeId, EmployeeDto updateEmployee,String email) {
		User user = getUser(email);
		Employee employee = employeeRepository.findById(employeeId).orElseThrow(
				()-> new ResourceNotFoundException("Employee is not exists with the given id:"+employeeId));
		if (!employee.getUser().getId().equals(user.getId())) {
			throw new RuntimeException("Unauthorized access");
		}
		employee.setFirstName(updateEmployee.getFirstName());
		employee.setLastName(updateEmployee.getLastName());
		employee.setEmail(updateEmployee.getEmail());
		
		Employee updatedEmployee = employeeRepository.save(employee);
		return EmployeeMapper.mapToEmployeeDto(updatedEmployee);
	}
	
	@Override
	public void deleteEmployee(Long employeeId,String email) {
		User user = getUser(email);
		Employee employee = employeeRepository.findById(employeeId).orElseThrow(
				()->new ResourceNotFoundException("Employee is not exists with the given id:\"+employeeId"));
		if (!employee.getUser().getId().equals(user.getId())) {
			throw new RuntimeException("Unauthorized access");
		}
		employeeRepository.delete(employee);
	}
	
	
}
