import { Injectable } from '@angular/core';
import { environment, Response } from '../../../../models/app.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from '../../../models/appointment.model';

@Injectable({
    providedIn: 'root'
})
export class AppointmentsDetailsService {

    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) { }

    public getAppointment(id: number): Observable<Response<Appointment>> {
        return this.http.get<Response<Appointment>>(`${this.apiServerUrl}/api/v1/appointments/${id}`);
    }

    public deleteAppointment(id: number): Observable<Response<void>> {
        return this.http.delete<Response<void>>(`${this.apiServerUrl}/api/v1/appointments/${id}`);
    }
}
