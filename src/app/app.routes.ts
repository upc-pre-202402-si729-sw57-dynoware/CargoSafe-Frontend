import { Routes } from '@angular/router';
import {ListTripComponent} from "./trip/components/list-trip/list-trip.component";
import {TripTrackingComponent} from "./trip/components/trip-tracking/trip-tracking.component";

export const routes: Routes = [
  { path: 'list-trip',component: ListTripComponent },
  { path: 'trip-track',component: TripTrackingComponent },

];
