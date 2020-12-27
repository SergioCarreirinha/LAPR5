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
import { VehicleDutyComponent } from './vehicle-duty/vehicle-duty.component';
import { VehicleTypeComponent } from './vehicle-type/vehicle-type.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { WorkBlockComponent } from './work-block/work-block.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'createDriverType', component: DriverTypeComponent },
  { path: 'listNode', component: NodeComponent },
  { path: 'createNode', component: CreateNodeComponent },
  { path: 'listLine', component: LineComponent },
  { path: 'createPath', component: PathComponent },
  { path: 'createVehicleType', component: VehicleTypeComponent },
  { path: 'createWorkBlock', component: WorkBlockComponent },
  { path: 'import', component: ImportComponent },
  { path: 'view', component: MapComponent },
  { path: 'planning', component: SolutionsComponent },
  { path: 'createDriver', component: DriverComponent },
  { path: 'listLinePaths', component: ListPathsComponent },
  { path: 'createLine', component: CreateLineComponent },
  { path: 'createVehicle', component: VehicleComponent },
  { path: 'createvehicleDuty', component: VehicleDutyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
