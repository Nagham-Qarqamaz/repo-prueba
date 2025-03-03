import { Component, Input, SimpleChanges } from '@angular/core';
import { CreatedAppointment } from '../../models/appointment-form.model';
import { Appointment } from '../../../../models/appointment.model';

@Component({
    selector: 'date-time',
    standalone: false,
    templateUrl: './date-time.component.html',
    styleUrl: './date-time.component.css'
})
export class DateTimeComponent {
    @Input() appointments: Appointment[] = [];
    @Input() newAppointment: CreatedAppointment = {
        customer: '',
        pet: '',
        reason: '',
        date: ''
    }
    @Input() hours: { time: number, isSelected: boolean, isDisabled: boolean }[] = [];
    @Input() inputErrors: {
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

    ngOnInit(): void {
        document.addEventListener("DOMContentLoaded", () => {
            const dateInput = <HTMLInputElement>document.querySelector('input[name="selected-date"]');
            if (dateInput) {
                dateInput.min = this.formatDateTime(new Date()).split('T')[0];
            }
        });

        for (let i = 8; i < 20; i++) {
            this.hours.push({
                time: i,
                isSelected: false,
                isDisabled: true
            });
        }
    }

    formatDateTime(date: Date): string {
        const pad = (num: number) => num.toString().padStart(2, '0');

        const year = date.getFullYear();
        const month = pad(date.getMonth() + 1);
        const day = pad(date.getDate());
        const hours = pad(date.getHours());
        const minutes = pad(date.getMinutes());
        const seconds = pad(date.getSeconds());

        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    }

    setDisabledTimes(): void {
        const dateInput = <HTMLInputElement>document.querySelector('input[name="selected-date"]');
        const dateValue = dateInput.value;

        this.hours.forEach((hour) => {
            hour.isDisabled = dateValue == "" ? true : false;
        });
        const targetDate = new Date(dateValue);

        this.appointments.forEach((appointment) => {
            const appointmentDate = new Date(appointment.date);

            if (appointmentDate.toDateString() === targetDate.toDateString()) {
                const appointmentHour = appointmentDate.getHours();
                this.hours.forEach((hour) => {
                    if (hour.time == appointmentHour)
                        hour.isDisabled = true;
                })
            }
        });
    }

    onDateChange(): void {
        const dateInput = <HTMLInputElement>document.querySelector('input[name="selected-date"]');
        const selectedDate = new Date(dateInput.value);
        this.newAppointment.date = this.formatDateTime(selectedDate);
        this.setDisabledTimes();
    }

    updateTime(selectedHour: number): void {
        const selectedDate = new Date(this.newAppointment.date);
        selectedDate.setHours(selectedHour, 0, 0, 0);
        this.newAppointment.date = this.formatDateTime(selectedDate);

        const timeInput = <HTMLInputElement>document.querySelector('input[name="selected-time"]');
        timeInput.value = `${selectedHour.toString().padStart(2, '0')}:00`;

        this.hours.forEach((hour) => {
            if (hour.time == selectedHour)
                hour.isSelected = true;
            else
                hour.isSelected = false;
        })

        console.log("updated time: ", selectedHour);
    }
}
