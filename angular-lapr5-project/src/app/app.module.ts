import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NodeComponent } from './node/node.component';
import { DriverTypeComponent } from './driver-type/driver-type.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PathComponent } from './path/path.component';
import { LineComponent } from './line/line.component';
import { VehicleTypeComponent } from './vehicle-type/vehicle-type.component';
import { ImportComponent } from './import/import.component';


@NgModule({
  declarations: [
    AppComponent,
    NodeComponent,
    DriverTypeComponent,
    DashboardComponent,
    PathComponent,
    LineComponent,
    VehicleTypeComponent,
    ImportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
