package com.example.demo.appointment;

import com.example.demo.api.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "api/v1/appointments")
public class AppointmentController {

    private final AppointmentService appointmentService;

    @Autowired
    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @GetMapping()
    public ApiResponse<Page<Appointment>> getAppointments(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return appointmentService.getAppointments(page, size);
    }

    @GetMapping("/{id}")
    public ApiResponse<Appointment> getAppointment(@PathVariable("id") Long id) {
        return appointmentService.getAppointment(id);
    }

    @PostMapping()
    public ApiResponse<Appointment> postAppointment(@RequestBody Appointment appointment) {
        return appointmentService.postAppointment(appointment);
    }

    @PutMapping("/{id}")
    public ApiResponse<Appointment> putAppointment(@PathVariable("id") Long id, @RequestBody Appointment appointment) {
        return appointmentService.putAppointment(id, appointment);
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Appointment> deleteAppointment(@PathVariable("id") Long id) {
        return appointmentService.deleteAppointment(id);
    }
}
