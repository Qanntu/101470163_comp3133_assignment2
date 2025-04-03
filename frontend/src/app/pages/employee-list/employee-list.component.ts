import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];
  allEmployees: any[] = []; // Backup all employees
  loggedInUserEmail: string = '';
  searchDepartment: string = '';
  searchDesignation: string = '';

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getLoggedInUserEmail();
    this.employeeService.getEmployees().subscribe({
      next: (result: any) => {
        this.employees = result.data.getAllEmployees;
        this.allEmployees = result.data.getAllEmployees;
      },
      error: (err) => console.error('Error loading employees:', err)
    });
  }

  getLoggedInUserEmail() {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decodedToken: any = jwtDecode(token);
          this.loggedInUserEmail = decodedToken.username || '';
        } catch (err) {
          console.error('Invalid token');
        }
      }
    }
  }

  searchEmployees() {
    this.employees = this.allEmployees.filter(emp =>
      emp.department.toLowerCase().includes(this.searchDepartment.toLowerCase()) &&
      emp.designation.toLowerCase().includes(this.searchDesignation.toLowerCase())
    );
  }

  resetSearch() {
    this.employees = this.allEmployees;
    this.searchDepartment = '';
    this.searchDesignation = '';
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  viewDetails(id: string) {
    this.router.navigate(['/employees/details', id]);
  }

  editEmployee(emp: any) {
    this.router.navigate(['/employees/edit', emp.id], {
      state: { employee: emp }
    });
  }

  addEmployee() {
    this.router.navigate(['/employees/add']);
  }

  deleteEmployee(id: string) {
    const confirmed = confirm('Are you sure you want to delete this employee?');
    if (confirmed) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => {
          alert('Employee deleted');
          this.ngOnInit();
        },
        error: (err) => alert('Error deleting employee: ' + err.message)
      });
    }
  }
}
