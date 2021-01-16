import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateNodeComponent, NodeComponent } from './node/node.component';
import { DriverTypeComponent } from './driver-type/driver-type.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PathComponent, ListPathsComponent } from './path/path.component';
import { CreateLineComponent, LineComponent } from './line/line.component';
import { VehicleTypeComponent } from './vehicle-type/vehicle-type.component';
import { ImportComponent } from './import/import.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { MapComponent } from './map/map.component';
import { SolutionsComponent } from './solutions/solutions.component';
import { DriverComponent } from './driver/driver.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { VehicleDutyComponent, ListVehicleDutyComponent } from './vehicle-duty/vehicle-duty.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth/auth.service';
import { AuthInterceptor } from './auth.guard/auth.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AdminComponent } from './admin/admin.component';
import { ClientnavbarComponent } from './clientnavbar/clientnavbar.component';
import { HomenavbarComponent } from './homenavbar/homenavbar.component';
import { WorkBlockComponent } from './work-block/work-block.component';
import { TripComponent, CreateTripComponent } from './trip/trip.component';
import { PassingTimeComponent, CreatePassingTimeComponent } from './passing-time/passing-time.component';
import { PlanningSprintCComponent } from './planning-sprint-c/planning-sprint-c.component';


@NgModule({
  declarations: [
    AppComponent,
    NodeComponent,
    DriverTypeComponent,
    DashboardComponent,
    PathComponent,
    LineComponent,
    VehicleTypeComponent,
    TripComponent,
    ImportComponent,
    NavbarComponent,
    FooterComponent,
    MapComponent,
    SolutionsComponent,
    DriverComponent,
    ListPathsComponent,
    VehicleComponent,
    VehicleDutyComponent,
    ListVehicleDutyComponent,
    LoginComponent,
    RegisterComponent,
    ForbiddenComponent,
    AdminComponent,
    ClientnavbarComponent,
    HomenavbarComponent,
    CreateLineComponent,
    CreateNodeComponent,
    WorkBlockComponent,
    PassingTimeComponent,
    CreatePassingTimeComponent,
    CreateTripComponent,
    PlanningSprintCComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  providers: [AuthService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
