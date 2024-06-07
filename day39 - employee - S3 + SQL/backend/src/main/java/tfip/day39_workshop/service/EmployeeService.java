package tfip.day39_workshop.service;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import tfip.day39_workshop.models.Employee;
import tfip.day39_workshop.repository.S3Repository;
import tfip.day39_workshop.repository.SqlRepository;

@Service
public class EmployeeService {

    @Autowired
    S3Repository s3repo;

    @Autowired
    SqlRepository sqlRepo;
    
    public Employee addEmployee(Employee employee, MultipartFile picFile) throws IOException {
        String url = s3repo.saveToS3(picFile, employee.getEmail());
        employee.setProfileUrl(url);

        int empId = sqlRepo.addEmployee(employee);
        employee.setId(empId);

        return employee;
    }

    public Employee getEmployeeById(Integer employeeId) {
        return sqlRepo.getEmployeeById(employeeId);
    }

    public List<Employee> getAllEmployees() {
        return sqlRepo.getAllEmployees();
    }

    public boolean updateEmployee(Employee employee) {
        return sqlRepo.updateEmployee(employee);
    }

    public boolean deleteEmployee(Integer employeeId) {
        return sqlRepo.deleteEmployee(employeeId);
    }

    
}
