package tfip.day39_workshop.repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import tfip.day39_workshop.models.Employee;

@Repository
public class SqlRepository implements Queries {

    @Autowired
    JdbcTemplate template;

    // CRUD
    public Integer addEmployee(Employee employee) {
        template.update(SQL_ADD_EMPLOYEE, employee.getFirstName(), employee.getLastName(),
            employee.getEmail(), employee.getProfileUrl());
        return template.queryForObject(SQL_GET_ID, Integer.class);
    }

    public Employee getEmployeeById(Integer employeeId) {
        return template.queryForObject(SQL_GET_EMPLOYEE_BY_ID, Employee.class, employeeId);
    }

    public List<Employee> getAllEmployees() {
        return template.query(SQL_GET_ALL_EMPLOYEES, new EmployeeRowMapper());
    }

    public boolean updateEmployee(Employee employee) {
        return template.update(SQL_UPDATE_EMPLOYEE, employee.getFirstName(), employee.getLastName(),
                employee.getEmail(), employee.getProfileUrl(), employee.getId()) > 0 ? true : false;
    }

    public boolean deleteEmployee(Integer employeeId) {
        return template.update(SQL_DELETE_EMPLOYEE, employeeId) > 0 ? true : false;
    }


    private class EmployeeRowMapper implements RowMapper<Employee> {
        @Override
        public Employee mapRow(ResultSet rs, int rowNum) throws SQLException {
            Employee emp = new Employee();
            emp.setId(rs.getInt("id"));
            emp.setFirstName(rs.getString("first_name"));
            emp.setLastName(rs.getString("last_name"));
            emp.setEmail(rs.getString("email"));
            emp.setProfileUrl(rs.getString("profile_url"));
            return emp;
        }
    }

}
