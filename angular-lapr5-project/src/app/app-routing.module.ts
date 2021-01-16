import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DriverTypeComponent } from './driver-type/driver-type.component';
import { DriverComponent } from './driver/driver.component';
import { ImportComponent } from './import/import.component';
import { LineComponent, CreateLineComponent } from './line/line.component';
import { MapComponent } from './map/map.component';
import { NodeComponent } from './node/node.component';
import { CreateNodeComponent } from './node/node.component';
import { ListPathsComponent, PathComponent } from './path/path.component';
import { SolutionsComponent } from './solutions/solutions.component';
import { VehicleDutyComponent, ListVehicleDutyComponent } from './vehicle-duty/vehicle-duty.component';
import { VehicleTypeComponent } from './vehicle-type/vehicle-type.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { WorkBlockComponent } from './work-block/work-block.component';
import { AuthGuard } from './auth.guard/auth.guard';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AdminComponent } from './admin/admin.component';
import { CreateTripComponent, TripComponent } from './trip/trip.component'
import { CreatePassingTimeComponent, PassingTimeComponent } from './passing-time/passing-time.component';
import { PlanningSprintCComponent } from './planning-sprint-c/planning-sprint-c.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin'] } },
  { path: 'listPassingTimes', component: PassingTimeComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin'] } },
  { path: 'createPassingTimes', component: CreatePassingTimeComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin'] } },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'createDriverType', component: DriverTypeComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin'] } },
  { path: 'listNode', component: NodeComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin'] } },
  { path: 'createNode', component: CreateNodeComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin'] } },
  { path: 'listLine', component: LineComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin'] } },
  { path: 'createPath', component: PathComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin'] } },
  { path: 'createVehicleType', component: VehicleTypeComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin'] } },
  { path: 'createWorkBlock', component: WorkBlockComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin'] } },
  { path: 'import', component: ImportComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin'] } },
  { path: 'view', component: MapComponent, canActivate: [AuthGuard] },
  { path: 'planning', component: SolutionsComponent, canActivate: [AuthGuard] },
  { path: 'genetic', component: PlanningSprintCComponent, canActivate: [AuthGuard] },
  { path: 'createDriver', component: DriverComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin'] } },
  { path: 'listLinePaths', component: ListPathsComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin'] } },
  { path: 'createLine', component: CreateLineComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin'] } },
  { path: 'createVehicle', component: VehicleComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin'] } },
  { path: 'createvehicleDuty', component: VehicleDutyComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin'] } },
  { path: 'listVehicleDuty', component: ListVehicleDutyComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin'] } },
  { path: 'createTrip', component: CreateTripComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin'] } },
  { path: 'listTrip', component: TripComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin'] } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
