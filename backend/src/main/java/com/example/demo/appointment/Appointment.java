package com.example.demo.appointment;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String customer;
    private String pet;
    private String reason;
    private LocalDateTime date;


    public Appointment() {
    }

    public Appointment(String customer, String pet, String reason, LocalDateTime date) {
        this.customer = customer;
        this.pet = pet;
        this.reason = reason;
        this.date = date;
    }

    public String getCustomer() {
        return customer;
    }

    public void setCustomer(String customer) {
        this.customer = customer;
    }

    public String getPet() {
        return pet;
    }

    public void setPet(String pet) {
        this.pet = pet;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public Long getId() {
        return id;
    }

    @Override
    public String toString() {
        return "Appointment{" +
                "id=" + id +
                ", customer='" + customer + '\'' +
                ", pet='" + pet + '\'' +
                ", reason='" + reason + '\'' +
                ", date=" + date +
                '}';
    }

    public boolean updateWith(Appointment appointment){
        boolean isUpdated = false;

        if (!this.getCustomer().equals(appointment.getCustomer())) {
            appointment.setCustomer(appointment.getCustomer());
            isUpdated = true;
        }

        if (!this.getPet().equals(appointment.getPet())) {
            appointment.setPet(appointment.getPet());
            isUpdated = true;
        }

        if (!this.getReason().equals(appointment.getReason())) {
            appointment.setReason(appointment.getReason());
            isUpdated = true;
        }

        if (!this.getDate().equals(appointment.getDate())) {
            appointment.setDate(appointment.getDate());
            isUpdated = true;
        }

        return  isUpdated;
    }
}
