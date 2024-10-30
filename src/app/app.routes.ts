import { Routes } from '@angular/router';
import { HomeComponent } from './public/pages/home/home.component';
import { PageNotFoundComponent } from './public/pages/page-not-found/page-not-found.component';
import { DriverManagementComponent } from './drivers/pages/driver-management/driver-management.component';
import { OrdersOnTripManagementComponent } from './orders-on-trip/pages/orders-on-trip-management/orders-on-trip-management.component';
import { ListRequestTripComponent } from './request-service/components/list-request-trip/list-request-trip.component';
import { VehiclesManagementComponent } from './vehicles/pages/vehicles-management/vehicles-management.component';
import { StatisticsComponent } from './company/components/statistics/statistics.component';
import { LoginComponent } from './iam/login/login.component';

import { AuthGuard } from './auth/guards/auth.guard';
import {EntrepreneurGuard} from "./auth/guards/entrepreneur.guard";
import {
  ToolbarEntrepreneurContentComponent
} from "./public/components/toolbar-entrepreneur-content/toolbar-entrepreneur-content.component";
import {RequestComponent} from "./request-service/components/request/request.component";
import {
  DriversEditComponent
} from "./drivers/components/drivers-edit/drivers-edit.component";
import {AddDriverManagementComponent} from "./drivers/pages/add-driver-management/add-driver-management.component";
import {
  AddVehiclesManagementComponent
} from "./vehicles/pages/add-vehicles-management/add-vehicles-management.component";
import {
  ListRequestStatusComponent
} from "./request-service/components/list-request-status/list-request-status.component";
import {
  ListTripsEntrepreneurComponent
} from "./trip/components/list-trips-entrepreneur/list-trips-entrepreneur.component";
import {AddDetailsTripComponent} from "./trip/components/add-details-trip/add-details-trip.component";
import {DetailsTripComponent} from "./trip/components/details-trip/details-trip.component";
import {SignupComponent} from "./iam/pages/signup/signup.component";
import {SignupEntrepreneurComponent} from "./iam/pages/signup-entrepreneur/signup-entrepreneur.component";
import {SignupCompanyComponent} from "./iam/pages/signup-company/signup-company.component";


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },

//IAM
  {path: 'login', component: LoginComponent},
  {path: 'register', component: SignupComponent},
  {path: 'register/entrepreneur', component: SignupEntrepreneurComponent},
  {path: 'register/company', component: SignupCompanyComponent},

  //notfound

  { path: 'pages', component: PageNotFoundComponent },

  //driver management
  { path: 'drivers/management', component: DriverManagementComponent },
  {path: 'management/driver/new',component: AddDriverManagementComponent},

  //vehicles management
  {path: 'management/vehicle/new',component: AddVehiclesManagementComponent},
  { path: 'vehicles/management', component: VehiclesManagementComponent },

//add new order
  { path: 'ordersOnTrip', component: OrdersOnTripManagementComponent },


  { path: 'list-request-trip', component: ListRequestTripComponent },
  { path: 'stadistics', component: StatisticsComponent},




  //ENTREPRENEUR
  {path:'a', component: ToolbarEntrepreneurContentComponent },
  {path:'request/trip/new', component: RequestComponent},
  {path:'list-request-trip', component:ListRequestTripComponent},
  {path:'list-request-history', component: ListRequestStatusComponent},

  {path:'list-trips', component: ListTripsEntrepreneurComponent},
  { path: 'add-trip-details', component: AddDetailsTripComponent },
  { path: 'trip/details/:id', component: DetailsTripComponent },
  { path: '**', component: PageNotFoundComponent },
];
//,canActivate: [AuthGuard]
