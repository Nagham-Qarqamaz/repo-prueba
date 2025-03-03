import { Component } from '@angular/core';
import { Appointment } from '../../models/appointment.model';
import { AppointmentsDetailsService } from './services/appointments-details.service';
import { Response } from '../../../models/app.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-appointment-details',
    standalone: false,
    templateUrl: './appointment-details.component.html',
    styleUrl: './appointment-details.component.css'
})
export class AppointmentDetailsComponent {
    appointment: Appointment = {
        id: 0,
        customer: '',
        pet: '',
        reason: '',
        date: ''
    };
    isDeleted = false

    constructor(
        private appointmentsDetailsService: AppointmentsDetailsService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        if (id) {
            this.getAppointment(id);
        }
    }

    public getAppointment(id: number): void {
        this.appointmentsDetailsService.getAppointment(id).subscribe({
            next: (response: Response<Appointment>) => {
                this.appointment = response.data;
            },
            error: (error: HttpErrorResponse) => {
                alert(error.message);
            }
        });
    }

    public deleteAppointment(id: number): void {
        this.appointmentsDetailsService.deleteAppointment(id).subscribe({
            next: (response: Response<void>) => {
                this.isDeleted = true;
                console.log(response.status + ":", response.message);
            },
            error: (error: HttpErrorResponse) => {
                alert(error.message);
            }
        });
    }
}
