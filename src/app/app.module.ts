import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

/* App components */
import { EmployeesComponent } from './pages/employees/employees.component';
import { ScheduleTicketComponent } from './pages/schedule-ticket/schedule-ticket.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './pages/login/login.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { MainComponent } from 'src/app/pages/main/main.component';
import { ScheduleHoursComponent } from './components/schedule-hours/schedule-hours.component';
import { CalenderComponent } from './components/calender/calender.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { DarshanReportComponent } from './components/darshan-report/darshan-report.component';
import { LiveDevoteeReportComponent } from './components/live-devotee-report/live-devotee-report.component';
import { LiveDevoteeInOutComponent } from './components/live-devotee-in-out/live-devotee-in-out.component';

/* PrimeNg Imports */
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { TabViewModule } from 'primeng/tabview';
import { CalendarModule } from 'primeng/calendar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FieldsetModule } from 'primeng/fieldset';


/* Services */
import { TitleService } from './services/title.service';
import { EmployeeService } from './services/employee.service';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { ScheduleService } from 'src/app/services/schedule.service';
import { ReportsService } from 'src/app/services/reports.service';

const routes: Routes = [
  {
    path: 'admin', component: MainComponent, canActivate: [AuthGuardService], children: [
      { path: 'employees', component: EmployeesComponent, data: { title: "Employees" }, },
      { path: 'schedule-ticket', component: ScheduleTicketComponent, data: { title: "Schedule & Ticket Management" }, },
      {
        path: 'reports', component: ReportsComponent, data: { title: 'reports' },
        children: [
          { path: 'darshan-report', component: DarshanReportComponent },
          { path: 'online-walkin-report', component: LiveDevoteeReportComponent },
          { path: 'live-in-out', component: LiveDevoteeInOutComponent }
        ]
      },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: '', component: LoginComponent },
];

const APP_TITLE = 'KASHI!';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ScheduleTicketComponent,
    ScheduleHoursComponent,
    CalenderComponent,
    ReportsComponent,
    DarshanReportComponent,
    LiveDevoteeReportComponent,
    LiveDevoteeInOutComponent,
    LoginComponent,
    ForgotPasswordComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    RouterModule.forRoot(routes),
    TableModule,
    DialogModule,
    ToastModule,
    ButtonModule,
    DropdownModule,
    TabViewModule,
    InputTextareaModule,
    MultiSelectModule,
    FileUploadModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CalendarModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    RadioButtonModule,
    FieldsetModule
  ],
  providers: [TitleService, EmployeeService, ReportsService, ScheduleService],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(titleService: TitleService, private titleNgService: Title, ) {
    titleService.init().subscribe((pathString) => this.titleNgService.setTitle(`${APP_TITLE} ${pathString}`));
  }
}
