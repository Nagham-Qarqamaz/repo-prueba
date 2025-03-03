package com.example.demo.appointment;

import com.example.demo.api.ApiResponse;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;

    @Autowired
    public AppointmentService(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    public ApiResponse<Page<Appointment>> getAppointments(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Appointment> appointmentsPage = appointmentRepository.findAll(pageable);

        if (appointmentsPage.isEmpty()) {
            return new ApiResponse<>("success", "No appointments found in the database.", Page.empty());
        }

        return new ApiResponse<>("success", "Successfully retrieved appointment(s).", appointmentsPage);
    }

    public ApiResponse<Appointment> getAppointment(Long id) {
        Optional<Appointment> appointment = appointmentRepository.findById(id);
        if (appointment.isPresent()) {
            return new ApiResponse<>("success", "Appointment with ID " + id + " found successfully.", appointment.get());
        } else {
            return new ApiResponse<>("error", "Appointment with ID " + id + " could not be found. the appointment may have already been deleted or never existed.", null);
        }
    }

    public ApiResponse<Appointment> postAppointment(Appointment appointment) {
        if (appointment.getId() != null) {
            return new ApiResponse<>("error", "Appointment ID should not be included in the request body. It will be auto-generated.", null);
        }
        if (appointment.getCustomer() == null || appointment.getCustomer().isEmpty()) {
            return new ApiResponse<>("error", "Customer name is required.", null);
        }
        if (appointment.getPet() == null || appointment.getPet().isEmpty()) {
            return new ApiResponse<>("error", "Pet name is required.", null);
        }
        if (appointment.getReason() == null || appointment.getReason().isEmpty()) {
            return new ApiResponse<>("error", "Appointment reason is required.", null);
        }
        if (appointment.getDate() == null) {
            return new ApiResponse<>("error", "Appointment date is required.", null);
        }
        if (appointment.getDate().getMinute() != 0) {
            return new ApiResponse<>("error", "Appointment minutes must be 00.", null);
        }

        LocalDateTime truncatedAppointmentDate = appointment.getDate().truncatedTo(ChronoUnit.MINUTES);
        List<Appointment> existingAppointments = appointmentRepository.findByDate(truncatedAppointmentDate);

        if (existingAppointments != null && !existingAppointments.isEmpty()) {
            return new ApiResponse<>("error", "An appointment already exists for that date and time.", null);
        }
        LocalDateTime appointmentDate = appointment.getDate();
        if (appointmentDate.isBefore(LocalDateTime.now())) {
            return new ApiResponse<>("error", "Appointment date-time must be in the future.", null);
        }

        Appointment savedAppointment = appointmentRepository.save(appointment);
        return new ApiResponse<>("success", "Appointment created successfully", savedAppointment);
    }

    @Transactional
    public ApiResponse<Appointment> putAppointment(Long id, Appointment updatedAppointment) {
        Optional<Appointment> currentAppointment = appointmentRepository.findById(id);

        if (currentAppointment.isPresent()) {
            Appointment appointment = currentAppointment.get();
            boolean isUpdated = appointment.updateWith(updatedAppointment);
            appointmentRepository.save(appointment);

            if (isUpdated) {
                appointmentRepository.save(appointment);
                return new ApiResponse<>("success", "Appointment with ID " + id + " has been successfully updated.", appointment);
            } else {
                return new ApiResponse<>("info", "No changes detected for Appointment with ID " + id + ".", appointment);
            }
        } else {
            return new ApiResponse<>("error", "Appointment with ID " + id + " could not be found. the appointment may have already been deleted or never existed.", null);
        }
    }

    public ApiResponse<Appointment> deleteAppointment(Long id) {
        Optional<Appointment> appointment = appointmentRepository.findById(id);
        if (appointment.isPresent()) {
            appointmentRepository.deleteById(id);
            return new ApiResponse<>("success", "Appointment with ID " + id + " has been successfully deleted.", null);
        } else {
            return new ApiResponse<>("error", "Appointment with ID " + id + " could not be found. the appointment may have already been deleted or never existed.", null);
        }
    }
}
