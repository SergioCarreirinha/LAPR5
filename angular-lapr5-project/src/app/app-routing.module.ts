import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DriverTypeComponent } from './driver-type/driver-type.component';
import { ImportComponent } from './import/import.component';
import { LineComponent } from './line/line.component';
import { MapComponent } from './map/map.component';
import { NodeComponent } from './node/node.component';
import { CreateNodeComponent } from './node/node.component';
import { PathComponent } from './path/path.component';
import { VehicleTypeComponent } from './vehicle-type/vehicle-type.component';
 
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'driverType', component: DriverTypeComponent },
  { path: 'node', component: NodeComponent},
  { path: 'createNode', component: CreateNodeComponent},
  { path: 'line', component: LineComponent},
  { path: 'path', component: PathComponent},
  { path: 'vehicleType', component: VehicleTypeComponent},
  { path: 'import', component: ImportComponent},
  { path: 'view', component: MapComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
