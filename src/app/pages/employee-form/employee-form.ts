import { Component } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators
} from '@angular/forms';
import { EmployeeModel } from '../../core/model/classes/employee.model';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-employee-form',
  styleUrl: './employee-form.css',
  templateUrl: './employee-form.html',
})
export class EmployeeForm {

  employeeObj: EmployeeModel = new EmployeeModel();
  employeeForm: FormGroup;

  parentDepartments = [
    {
    id:1,
    name: 'Human Resources'
    },
    {
      id: 2,
      name: 'Finance'
    },
    {
      id: 3,
      name: 'Information Technology'
    },
    {
      id: 4,
      name: 'Operations'
    },
  ];

  childDepartments: {
    id: number;
    name: string;
  } [] = [];

departmentChildren: {
  [key: number]: {
    id:number;
    name: string;
  } [];
} = {
  1: [
    {
      id: 11,
      name: 'Recruitment'
    },
    {
      id:12,
      name: 'Employee Relations'
    },
    {
      id: 13,
      name: 'Training & Development'
    }
  ],

  2: [
    {
      id: 21, 
      name: 'Accounts'
    },
    {
      id: 22,
      name: 'Payroll'
    },
    {
      id: 23,
      name: 'Procurement'

    }
  ],

  3: [
    {
      id: 31,
      name: 'Software Development'
    },
    {
      id: 33,
      name: 'IT Support'
    }
  ],

  4: [
    {
      id: 41,
      name: 'Customer Experience'
    },
    {
      id: 42,
      name: 'Administration'
    },
    {
      id: 43,
      name: ' Logistics'
    }
  ]
};


constructor(
  private fb: FormBuilder
) {

  this.employeeForm = this.fb.group({

    employeeId: [
      0,
      Validators.required
    ],

    employeeName: [
      '',
      Validators.required
    ],

    contactNo: [
      '',
      Validators.required
    ],

    emailId: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],

    parentDepartment: [
      '',
      Validators.required
    ],

    childDepartment: [
      '',
      Validators.required
    ],

    password: [
      '',
      Validators.required
    ],

    gender: [
      '',
      Validators.required
    ],

    role: [
      '',
      Validators.required
    ]

  });

}
onParentDepartmentChange(): void {

  const parentId =
    Number(
      this.employeeForm
        .get('parentDepartment')
        ?.value
    );


  this.childDepartments =
    this.departmentChildren[parentId] ?? [];


  // Clear previously selected child department

  this.employeeForm
    .get('childDepartment')
    ?.reset('');

}

onSubmit(): void {

  // Stop if form is invalid

  if (this.employeeForm.invalid) {

    this.employeeForm.markAllAsTouched();

    return;
  }


  const formValue =
    this.employeeForm.value;


  // ========================================
  // API PAYLOAD
  // ========================================

  const payload = {

    employeeId: formValue.employeeId,

    employeeName: formValue.employeeName,

    contactNo: formValue.contactNo,

    emailId: formValue.emailId,

    // API receives child department ID
    deptId: Number(formValue.childDepartment),

    password: formValue.password,

    gender: formValue.gender,

    role: formValue.role,

    createdDate: new Date().toISOString()

  };


  console.log('Employee Payload:', payload);

}

}
