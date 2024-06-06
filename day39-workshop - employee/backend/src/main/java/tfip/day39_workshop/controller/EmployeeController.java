package tfip.day39_workshop.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import jakarta.json.Json;
import jakarta.json.JsonArrayBuilder;
import tfip.day39_workshop.models.Employee;
import tfip.day39_workshop.service.EmployeeService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/api")
public class EmployeeController {

    @Autowired
    EmployeeService svc;

    @PostMapping(path="/add-employee", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> addEmployee(@RequestPart String firstName, @RequestPart String lastName,
            @RequestPart String email, @RequestPart MultipartFile picFile) throws IOException {
        
        Employee emp = new Employee();
        emp.setFirstName(firstName);
        emp.setLastName(lastName);
        emp.setEmail(email);
        
        Employee addedEmployee = svc.addEmployee(emp, picFile);
        System.out.println(">>> addedEmployee: " + addedEmployee);

        return ResponseEntity.ok(addedEmployee.toJson().toString());
    }

    @GetMapping("/employees")
    public ResponseEntity<String> getMethodName() {
        List<Employee> empList = svc.getAllEmployees();
        JsonArrayBuilder arrBuilder = Json.createArrayBuilder();
        for (Employee employee : empList) {
            arrBuilder.add(employee.toJsonBuilder());
        }
        return ResponseEntity.ok(arrBuilder.build().toString());
    }
    

}
