import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Employee } from "./models";

@Injectable()
export class EmployeeService {

    private readonly http = inject(HttpClient)

    addEmployee(formData: FormData) {
        this.http.post('/api/add-employee', formData)
            .subscribe(response => {
                console.log('>>> add employee response:', response)
                return response;
            })
    }

    getAllEmployees() {
        return this.http.get<Employee[]>('/api/employees');
    }

}