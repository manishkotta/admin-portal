import { Component, OnInit,ViewEncapsulation  } from '@angular/core';
import { Employee } from '../../models/Employee';
import { MessageService } from 'primeng/api';
import { EmployeeService } from '../../services/employee.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService]
})
export class EmployeesComponent implements OnInit {

  display: boolean = false;
  activatePasswordDisplay: boolean = false;
  sendSMSDisplay: boolean = false;

  employees: Employee[];
  selectedEmployees: Employee[];
  cols: any[];
  addEditEmployeeHeader: String;

  employee: Employee;
  employeeCount: Number;

  smsTemplates: any[];
  selectedSmsTemplate: string;

  employeeGroup: any[];
  selectedEmpGroupToSendSMS: any[];

  cities: any[];
  states: any[];
  genderGrp: any[];

  registerForm: FormGroup;
  submitted = false;

  constructor(private messageService: MessageService,private formBuilder: FormBuilder, private empService: EmployeeService) {
    this.employee = new Employee();
    this.cities = [
      { label: 'Select', value: null },
      { label: 'New York', value: { id: 1, name: 'New York', code: 'NY' } },
      { label: 'Rome', value: { id: 2, name: 'Rome', code: 'RM' } },
      { label: 'London', value: { id: 3, name: 'London', code: 'LDN' } },
      { label: 'Istanbul', value: { id: 4, name: 'Istanbul', code: 'IST' } },
      { label: 'Paris', value: { id: 5, name: 'Paris', code: 'PRS' } }
    ];
    this.states = [
      { label: 'Select', value: null },
      { label: 'New York', value: { id: 1, name: 'New York', code: 'NY' } },
      { label: 'Rome', value: { id: 2, name: 'Rome', code: 'RM' } },
      { label: 'London', value: { id: 3, name: 'London', code: 'LDN' } },
      { label: 'Istanbul', value: { id: 4, name: 'Istanbul', code: 'IST' } },
      { label: 'Paris', value: { id: 5, name: 'Paris', code: 'PRS' } }
    ];

    this.genderGrp = [
      { label: "Male", value: 0 },
      { label: "Female", value: 1 }
    ]

    this.cols = [
      { field: 'fname', header: 'NAME' },
      { field: 'role', header: 'ROLE' },
      { field: 'employeeId', header: 'EMP. ID' },
      { field: 'phone', header: 'CONTACT' },
      { field: 'gender', header: 'GENDER' }
    ];
  }

  ngOnInit() {
    this.empService.getEmployees().subscribe(
      (result) => {
        console.log(result);
        this.employees = result.employees;
        this.employeeCount = result.employees.length;
      },
      (err) => {
        console.log(err);
      }
    );
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
  });
  }

  onPhotoUpload(event: any) {
    var reader = new FileReader();
    reader.readAsDataURL(event.files[0]);
    reader.onload = () => {
      this.employee.imageBase64 = reader.result;
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  showDialogAdd() {
    this.display = true;
    this.addEditEmployeeHeader = "Create New Employee";
  }

  showDialogEdit(emp: any) {
    console.log(emp);
    this.addEditEmployeeHeader = "Edit Employee";
    this.display = true;
    this.employee = emp;
  }

  showSendSMSDialog() {
    this.sendSMSDisplay = true;
  }

  closeSendSMSGropuDailog() {
    this.sendSMSDisplay = false;
  }

  sendGroupSMS() {

  }

  get f() { return this.registerForm.controls; }
  addEmployee(f) {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.employee))
    this.closeEmpDialog();
  }

  closeEmpDialog() {
    //console.log(this.userFrm);
    this.display = false;
  }

  showActivatePasswordDialog(emp) {
    this.activatePasswordDisplay = true;
    this.employee = emp;
  }

  sendTemporaryPassword() {

  }
  closeActivatePassDialog() {
    this.activatePasswordDisplay = false;
  }
}
