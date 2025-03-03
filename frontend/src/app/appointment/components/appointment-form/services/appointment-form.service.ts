import { Injectable } from '@angular/core';
import { CreatedAppointment } from '../models/appointment-form.model';
import { Observable } from 'rxjs';
import { environment, Response } from '../../../../models/app.model';
import { Appointment } from '../../../models/appointment.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AppointmentFormService {

    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) { }

    public getAppointments(): Observable<Response<{ content: Appointment[] }>> {
        return this.http.get<Response<{ content: Appointment[] }>>(`${this.apiServerUrl}/api/v1/appointments`);
    }

    public postAppointment(appointment: CreatedAppointment): Observable<Response<Appointment>> {
        return this.http.post<Response<Appointment>>(`${this.apiServerUrl}/api/v1/appointments`, appointment);
    }

    public putAppointment(id: number, appointment: Appointment): Observable<Response<Appointment>> {
        return this.http.put<Response<Appointment>>(`${this.apiServerUrl}/api/v1/appointments/${id}`, appointment);
    }
}
