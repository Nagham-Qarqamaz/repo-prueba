import { Component, Input } from '@angular/core';
import { CreatedAppointment } from './models/appointment-form.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Response } from '../../../models/app.model';
import { Appointment } from '../../models/appointment.model';
import { AppointmentFormService } from './services/appointment-form.service';

@Component({
    selector: 'appointment-form',
    standalone: false,
    templateUrl: './appointment-form.component.html',
    styleUrl: './appointment-form.component.css'
})
export class AppointmentFormComponent {
    appointments: Appointment[] = [];
    hours: { time: number, isSelected: boolean, isDisabled: boolean }[] = [];
    newAppointment: CreatedAppointment = {
        customer: '',
        pet: '',
        reason: '',
        date: ''
    };
    inputErrors: {
        areEmpty: boolean,
        customer: string,
        pet: string,
        reason: string,
        date: string,
        time: string
    } = {
            areEmpty: true,
            customer: '',
            pet: '',
            reason: '',
            date: '',
            time: ''
        }
    errorMessage: string = '';
    successMessage: string = '';

    constructor(private appointmentFormService: AppointmentFormService) { }

    ngOnInit(): void {
        this.getAppointments();
    }

    public getAppointments(): void {
        this.appointmentFormService.getAppointments().subscribe({
            next: (response: Response<{ content: Appointment[] }>) => {
                console.log(response.status + ":", response.message);
                this.appointments = response.data.content;
            },
            error: (error: HttpErrorResponse) => {
                alert(error.message);
            }
        });
    }

    private resetForm(): void {
        this.newAppointment = {
            customer: '', pet: '', reason: '', date: ''
        };
        this.errorMessage = '';

        const dateInput = document.querySelector('#booking-form input[name="selected-date"]') as HTMLInputElement;
        const timeInput = document.querySelector('#booking-form input[name="selected-time"]') as HTMLInputElement;
        dateInput.value = dateInput.defaultValue;
        timeInput.value = timeInput.defaultValue;

        this.hours.forEach((hour) => {
            hour.isSelected = false;
            hour.isDisabled = true;
        });
    }

    public submit(): void {
        const customerInput = document.querySelector('#booking-form input[name="customer"]') as HTMLInputElement;
        const petInput = document.querySelector('#booking-form input[name="pet"]') as HTMLInputElement;
        const reasonInput = document.querySelector('#booking-form textarea[name="reason"]') as HTMLInputElement;
        const dateInput = document.querySelector('#booking-form input[name="selected-date"]') as HTMLInputElement;
        const timeInput = document.querySelector('#booking-form input[name="selected-time"]') as HTMLInputElement;

        this.inputErrors = {
            areEmpty: true,
            customer: '',
            pet: '',
            reason: '',
            date: '',
            time: ''
        }

        if (customerInput.value == '') {
            this.inputErrors.customer = "Cutsomer's name can't be empty";
            this.inputErrors.areEmpty = false;
        }
        if (petInput.value == '') {
            this.inputErrors.pet = "Pet's name can't be empty";
            this.inputErrors.areEmpty = false;
        }
        if (reasonInput.value == '') {
            this.inputErrors.reason = "Appointment's reason can't be empty";
            this.inputErrors.areEmpty = false;
        }
        if (dateInput.value == '') {
            this.inputErrors.date = "Appointment's date can't be empty";
            this.inputErrors.areEmpty = false;
        }
        if (timeInput.value == '') {
            this.inputErrors.time = "Appointment's time can't be empty";
            this.inputErrors.areEmpty = false;
        }

        if (this.inputErrors.areEmpty) {
            this.createAppointment();
        }
    }

    public createAppointment(): void {
        this.appointmentFormService.postAppointment(this.newAppointment).subscribe({
            next: (response: Response<Appointment>) => {
                console.log(response.status + ":", response.message);
                if (response.status === "success") {
                    this.appointments.push(response.data);
                    this.resetForm();
                    this.successMessage = "Appointment booked successfully!";
                } else if (response.status === "error") {
                    this.errorMessage = response.message;
                }
            },
            error: (error: HttpErrorResponse) => {
                alert(error.message);
            }
        });
    }
}
