package com.rohit.ems.respository;

import com.rohit.ems.entity.Employee;
import com.rohit.ems.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee,Long> {
	List<Employee> findByUser(User user);
}
