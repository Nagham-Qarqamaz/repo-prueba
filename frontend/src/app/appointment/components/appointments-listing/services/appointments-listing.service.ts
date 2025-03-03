import { Injectable } from '@angular/core';
import { environment, Response } from '../../../../models/app.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from '../../../models/appointment.model';

@Injectable({
    providedIn: 'root'
})
export class AppointmentsListingService {
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) { }

    public getAppointments(page: number, size: number): Observable<Response<{ content: Appointment[], totalPages: number }>> {
        return this.http.get<Response<{ content: Appointment[], totalPages: number }>>(`${this.apiServerUrl}/api/v1/appointments?page=${page}&size=${size}`);
    }

    public deleteAppointment(id: number): Observable<Response<void>> {
        return this.http.delete<Response<void>>(`${this.apiServerUrl}/api/v1/appointments/${id}`);
    }
}
