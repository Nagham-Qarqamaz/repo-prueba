import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Appointment } from '../../models/appointment.model';
import { Response } from '../../../models/app.model';
import { HttpErrorResponse } from '@angular/common/http';
import { AppointmentsListingService } from './services/appointments-listing.service';

@Component({
    selector: 'appointments-listing',
    standalone: false,
    templateUrl: './appointments-listing.component.html',
    styleUrl: './appointments-listing.component.css'
})
export class AppointmentsListingComponent {
    appointments: Appointment[] = [];
    currentPage: number = 0;
    pageSize: number = 8;
    totalPages: number = 1;

    constructor(private appointmentsListingService: AppointmentsListingService) { }

    ngOnInit(): void {
        this.getAppointments();
    }

    public getAppointments(): void {
        this.appointmentsListingService.getAppointments(this.currentPage, this.pageSize).subscribe({
            next: (response) => {
                console.log(response.status + ":", response.message);
                this.appointments = response.data.content;
                this.totalPages = response.data.totalPages;
            },
            error: (error: HttpErrorResponse) => {
                alert(error.message);
            }
        });
    }

    public nextPage(): void {
        if (this.currentPage < this.totalPages - 1) {
            this.currentPage++;
            this.getAppointments();
        }
    }

    public prevPage(): void {
        if (this.currentPage > 0) {
            this.currentPage--;
            this.getAppointments();
        }
    }

    public deleteAppointment(id: number): void {
        this.appointmentsListingService.deleteAppointment(id).subscribe({
            next: (response: Response<void>) => {
                this.getAppointments();
                console.log(response.status + ":", response.message);
            },
            error: (error: HttpErrorResponse) => {
                alert(error.message);
            }
        });
    }
}
