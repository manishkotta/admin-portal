export interface EmployeeListObject {
  profileImage: string;
  name: string;
  role: string;
  empId: number;
  contact: string;
  gender: string;
  isActivated: boolean;
  email: string;
}

export class Employee {
  profileImage: File;
  name: String;
  gender: String;
  dateOfBirth: Date;
  addressLine1: String;
  addressLine2: String;
  city: String;
  state: String;
  pincode: String;

  education : String;
  designation : String;
  departmant : String;
  workLocation : String;
  email : String;
  mobile : String;
  idProof : String;
  addressProof : String;

  empId : Number;

  constructor(){
    this.name = "";
    this.gender="";
  }
}