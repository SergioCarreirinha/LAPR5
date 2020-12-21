import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NodeComponent } from './node/node.component';
import { DriverTypeComponent } from './driver-type/driver-type.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PathComponent, ListPathsComponent } from './path/path.component';
import { LineComponent } from './line/line.component';
import { VehicleTypeComponent } from './vehicle-type/vehicle-type.component';
import { ImportComponent } from './import/import.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { MapComponent } from './map/map.component';
import { SolutionsComponent } from './solutions/solutions.component';
import { DriverComponent } from './driver/driver.component';


@NgModule({
  declarations: [
    AppComponent,
    NodeComponent,
    DriverTypeComponent,
    DashboardComponent,
    PathComponent,
    LineComponent,
    VehicleTypeComponent,
    ImportComponent,
    NavbarComponent,
    FooterComponent,
    MapComponent,
    SolutionsComponent,
    DriverComponent,
    ListPathsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
