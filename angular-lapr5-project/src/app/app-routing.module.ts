import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DriverTypeComponent } from './driver-type/driver-type.component';
import { DriverComponent } from './driver/driver.component';
import { ImportComponent } from './import/import.component';
import { LineComponent } from './line/line.component';
import { MapComponent } from './map/map.component';
import { NodeComponent } from './node/node.component';
import { CreateNodeComponent } from './node/node.component';
import { PathComponent } from './path/path.component';
import { SolutionsComponent } from './solutions/solutions.component';
import { VehicleTypeComponent } from './vehicle-type/vehicle-type.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'createDriverType', component: DriverTypeComponent },
  { path: 'listNode', component: NodeComponent },
  { path: 'createNode', component: CreateNodeComponent },
  { path: 'createLine', component: LineComponent },
  { path: 'createPath', component: PathComponent },
  { path: 'createVehicleType', component: VehicleTypeComponent },
  { path: 'import', component: ImportComponent },
  { path: 'view', component: MapComponent },
  { path: 'planning', component: SolutionsComponent },
  { path: 'createDriver', component: DriverComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
