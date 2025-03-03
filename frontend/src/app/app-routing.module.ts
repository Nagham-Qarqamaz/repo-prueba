import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentComponent } from './appointment/appointment.component';
import { HomeComponent } from './home/home.component';
import { AppointmentsListingComponent } from './appointment/components/appointments-listing/appointments-listing.component';
import { AppointmentFormComponent } from './appointment/components/appointment-form/appointment-form.component';
import { AppointmentDetailsComponent } from './appointment/components/appointment-details/appointment-details.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'book-appointment', component: AppointmentFormComponent },
    { path: 'appointments', component: AppointmentsListingComponent },
    { path: 'appointments/:id', component: AppointmentDetailsComponent }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
