import { Routes } from '@angular/router';
import { HomeComponent } from './public/pages/home/home.component';
import { PageNotFoundComponent } from './public/pages/page-not-found/page-not-found.component';
import { DriverManagementComponent } from './drivers/pages/driver-management/driver-management.component';
import { OrdersOnTripManagementComponent } from './orders-on-trip/pages/orders-on-trip-management/orders-on-trip-management.component';
import { ListTripComponent } from './trip/components/list-trip/list-trip.component';
import { TripTrackingComponent } from './trip/components/trip-tracking/trip-tracking.component';
import { VehiclesManagementComponent } from './vehicles/pages/vehicles-management/vehicles-management.component';
import { MerchandiseItemComponent } from './merchandise/components/merchandise-item/merchandise-item.component';
import { StatisticsComponent } from './company/components/statistics/statistics.component';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';

import { AuthGuard } from './auth/guards/auth.guard';
import {EntrepreneurGuard} from "./auth/guards/entrepreneur.guard";
import {
  ToolbarEntrepreneurContentComponent
} from "./public/components/toolbar-entrepreneur-content/toolbar-entrepreneur-content.component";
import {RequestComponent} from "./request-service/component/request/request.component";


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'pages', component: PageNotFoundComponent },
  { path: 'drivers/management', component: DriverManagementComponent },
  { path: 'vehicles/management', component: VehiclesManagementComponent },
  { path: 'ordersOnTrip', component: OrdersOnTripManagementComponent },
  { path: 'list-trip', component: ListTripComponent },
  { path: 'trip-track', component: TripTrackingComponent },
  { path: 'added-merchandise', component: MerchandiseItemComponent },
  { path: 'stadistics', component: StatisticsComponent},




  //ENTREPRENEUR
  {path:'a', component: ToolbarEntrepreneurContentComponent },
  {path:'request/trip/new', component: RequestComponent},
  {path:'list-trip', component:ListTripComponent},
  { path: '**', component: PageNotFoundComponent },


];
//,canActivate: [AuthGuard]
