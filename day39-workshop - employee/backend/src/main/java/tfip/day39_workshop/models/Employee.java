package tfip.day39_workshop.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Employee {
    private Integer id;
    private String firstName;
    private String lastName;
    private String email;
    private String profileUrl;
}
