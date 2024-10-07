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


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'pages', component: PageNotFoundComponent, canActivate: [AuthGuard] },
  { path: 'drivers/management', component: DriverManagementComponent, canActivate: [AuthGuard] },
  { path: 'vehicles/management', component: VehiclesManagementComponent, canActivate: [AuthGuard] },
  { path: 'ordersOnTrip', component: OrdersOnTripManagementComponent, canActivate: [AuthGuard] },
  { path: 'list-trip', component: ListTripComponent, canActivate: [AuthGuard] },
  { path: 'trip-track', component: TripTrackingComponent, canActivate: [AuthGuard] },
  { path: 'added-merchandise', component: MerchandiseItemComponent, canActivate: [AuthGuard, EntrepreneurGuard] },
  { path: 'stadistics', component: StatisticsComponent, canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent }
];
