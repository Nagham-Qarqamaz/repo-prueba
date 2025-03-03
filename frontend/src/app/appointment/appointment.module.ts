import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentComponent } from './appointment.component';
import { FormsModule } from '@angular/forms';
import { AppointmentFormComponent } from './components/appointment-form/appointment-form.component';
import { DateTimeComponent } from './components/appointment-form/components/date-time/date-time.component';
import { AppointmentsListingComponent } from './components/appointments-listing/appointments-listing.component';
import { SharedModule } from '../shared/shared.module';
import { AppointmentDetailsComponent } from './components/appointment-details/appointment-details.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [AppointmentComponent, AppointmentFormComponent, DateTimeComponent, AppointmentsListingComponent, AppointmentDetailsComponent],
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        RouterModule
    ],
    exports: [AppointmentComponent]
})
export class AppointmentModule { }
