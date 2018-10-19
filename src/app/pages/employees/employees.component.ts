import { Component, OnInit,ViewChild} from '@angular/core';
import { EmployeeListObject, Employee } from '../../models/Employee';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
  providers: [MessageService]
})
export class EmployeesComponent implements OnInit {

  display: boolean = false;
  activatePasswordDisplay: boolean = false;
  sendSMSDisplay: boolean = false;

  employees: EmployeeListObject[];
  selectedEmployees: EmployeeListObject[];
  cols: any[];
  addEditEmployeeHeader: String;

  employee: Employee;

  smsTemplates: any[];
  selectedSmsTemplate: string;

  employeeGroup: any[];
  selectedEmpGroupToSendSMS: any[];

  cities: any[];
  states: any[];
  //@ViewChild('f') public userFrm: NgForm;
  constructor(private messageService: MessageService) {
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
    let emp: EmployeeListObject = {
      profileImage: 'http://images1.fanpop.com/images/image_uploads/Naruto-Uzumaki-uzumaki-naruto-964976_692_659.jpg',
      name: 'Manish Kumar',
      role: 'Counter Staff',
      empId: 1764,
      contact: '8328006820',
      email: 'manish.9119@gmail.com',
      gender: 'male',
      isActivated: false,
    }
    let emp2: EmployeeListObject = {
      profileImage: 'http://images1.fanpop.com/images/image_uploads/Naruto-Uzumaki-uzumaki-naruto-964976_692_659.jpg',
      name: ' Kumar',
      role: 'Counter Staff',
      empId: 1764,
      contact: '8328006820',
      gender: 'male',
      isActivated: false,
      email: "kottamanishkumar@gmail.com"
    }
    this.employees = [];
    this.employees.push(emp);
    this.employees.push(emp2);

    this.cols = [
      { field: 'name', header: 'NAME' },
      { field: 'role', header: 'ROLE' },
      { field: 'empId', header: 'EMP. ID' },
      { field: 'contact', header: 'CONTACT' },
      { field: 'gender', header: 'GENDER' }
    ];
  }

  ngOnInit() {

  }

  onPhotoUpload(event: any) {
    this.employee.profileImage = event.files[0];
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

  addEmployee() {
    console.log(this.employee);
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
