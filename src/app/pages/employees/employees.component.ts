import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Employee } from '../../models/Employee';
import { MessageService } from 'primeng/api';
import { EmployeeService } from '../../services/employee.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import citiesList from '../../cities';

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
  forgotPaaswordForm: FormGroup;
  submitted = false;

  constructor(private messageService: MessageService, private formBuilder: FormBuilder, private empService: EmployeeService) {
    this.employee = new Employee();

    this.cities = citiesList;
    this.states = citiesList;

    // this.cities = [{"name":"manish",code:"M"},{"name":"Kumar",code:"K"}]

    this.genderGrp = [
      { label: "Select", value: '' },
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
        this.employees = result.employees;
        this.employeeCount = result.employees.length;
      },
      (err) => {
        console.log(err);
      }
    );
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      dob: [''],
      addone: [''],
      addtwo: [''],
      city: [''],
      state: [''],
      pincode: [''],
      education: [''],
      role: [''],
      department: [''],
      workloc: [''],
      mobile: [''],
      idproof: [''],
      addressproof: [''],
      email: ['', [Validators.required, Validators.email]],
    });

    this.forgotPaaswordForm = this.formBuilder.group({
      emailOrPhone: ['', Validators.required]
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

    this.registerForm.controls['firstName'].setValue('');
    this.registerForm.controls['lastName'].setValue('');
    this.registerForm.controls['email'].setValue('');
    this.registerForm.controls['mobile'].setValue('');

    this.registerForm.controls['dob'].setValue('');
    this.registerForm.controls['workloc'].setValue('');
    this.registerForm.controls['idproof'].setValue('');
    this.registerForm.controls['gender'].setValue('');

    this.registerForm.controls['addressproof'].setValue('');
  }

  showDialogEdit(emp: any) {
    this.addEditEmployeeHeader = "Edit Employee";
    this.display = true;
    this.employee = emp;

    this.registerForm.controls['firstName'].setValue(emp.fname);
    this.registerForm.controls['lastName'].setValue(emp.lname);
    this.registerForm.controls['email'].setValue(emp.email);
    this.registerForm.controls['mobile'].setValue(emp.phone);

    this.registerForm.controls['dob'].setValue(emp.dob);
    this.registerForm.controls['workloc'].setValue(emp.workLocation);
    this.registerForm.controls['idproof'].setValue(emp.idProof);
    this.registerForm.controls['gender'].setValue(emp.gender);

    this.registerForm.controls['addressproof'].setValue(emp.idProofNumber);

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

    console.log(this.registerForm)
    Object.keys(this.registerForm.controls).forEach(field => { // {1}
      const control = this.registerForm.get(field);            // {2}
      control.markAsTouched({ onlySelf: true });       // {3}
    });
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    let employeeServiceObject = {
      accessToken: "NWZ78QDTWPRD3GBJDLV7174N6N714NILMTLZ49CKGIS1PZFQS4ZW9ZKEAEOE21KJOETX4D6RBSDI9HCJS7HCRHVL1KQPJ4K7HRQKRKCZ78MXOCQXHJBW1TAMKBBNDWI82YP3KZZX15POQN9EC2BVYA860A3DNTELNIFLIBCTQQTWQDPU5A8BBOOD4RGPA6PDRYIZ7XPKSXTC5PA8MR1STVBGKS47MUV66180S13S0KAX41H3GW1L58ZZA8ESACE7",
      employee: {
        fname: f.firstName,
        lname: f.lastName,
        email: f.email,
        phone: f.mobile,
        employeeTypeId: 4,
        dob: f.dob,
        gender: f.gender,
        counterId: 3,
        departmentId: 2,
        workLocation: f.workloc,
        userTypeId: 2,
        idProof: f.idproof,
        idProofNumber: f.addressproof
      },
      address: {
        address1: f.addone,
        address2: f.addtwo,
        city: f.city ? f.city.name : "",
        state: f.state ? f.state.state : "",
        pinCode: f.pincode
      }
    }
    this.empService.addEmployee(employeeServiceObject).subscribe(
      (result) => {
        this.messageService.add({ severity: 'success', summary: 'Add Employee', detail: 'Employee has been added successfully' })
      },
      (err) => {
        this.messageService.add({ severity: 'error', summary: 'Add Employee', detail: 'Failed to add employee.' })
      }
    )
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

  sendTemporaryPassword(f) {
    if (f.emailOrPhone === "email") {
      this.empService.passwordReset(this.employee.email).subscribe(
        (result) => {
          this.messageService.add({ severity: 'success', summary: 'Password Reset Message', detail: 'Link has been sent to the registered email.' })
        },
        (err) => {
          this.messageService.add({ severity: 'error', summary: 'Password Reset Message', detail: 'Failed to send a reset link to the registered email.' })
        }
      )
    } else {
      this.empService.sendOtp(this.employee.phone).subscribe(
        (result) => {
          this.messageService.add({ severity: 'success', summary: 'Password Reset Message', detail: 'OTP has been sent to the registered mobile number.' })
        },
        (err) => {
          this.messageService.add({ severity: 'error', summary: 'Password Reset Message', detail: 'Failed to send OTP to the registered mobile number.' })
        }
      )
    }
    this.closeActivatePassDialog();
  }

  closeActivatePassDialog() {
    this.activatePasswordDisplay = false;
  }

  filterCity(event: any) {
    if (event.query) {
      this.cities = citiesList.map((s) => {
        if (s.name.includes(event.query))
          return s;
      }).filter(s => s !== undefined)
    }
    else {
      this.cities = citiesList;
    }
  }

  citySelectHndlr(value: any) {
    this.registerForm.controls['state'].setValue(this.registerForm.controls['city'].value);
  }

  filterState(event: any) {
    if (event.query) {
      let statesGrp = citiesList.map((s) => {
        if (s.state.includes(event.query))
          return s;
      }).filter(s => s !== undefined)

      statesGrp.filter((elem, index, self) => {
        return index === self.findIndex((t) => (
          t.state === elem.state
        ))
      })
      this.states = statesGrp;
      console.log(this.states);
    }
    else {
      this.states = citiesList;
    }
  }
}
