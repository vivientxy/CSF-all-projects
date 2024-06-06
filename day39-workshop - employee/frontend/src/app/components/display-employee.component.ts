import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Employee } from '../models';
import { EmployeeService } from '../employee.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrl: './display-employee.component.css',
})
export class DisplayEmployeeComponent implements OnInit, OnDestroy {
  
  private readonly svc = inject(EmployeeService);
  empList$!: Subscription
  empList!: Employee[];

  ngOnInit(): void {
    this.empList$ = this.svc.getAllEmployees()
      .subscribe(response => {
        this.empList = response;
        console.log('>>> employees list:', this.empList);
      });
  }

  ngOnDestroy(): void {
    this.empList$.unsubscribe()
  }
}
