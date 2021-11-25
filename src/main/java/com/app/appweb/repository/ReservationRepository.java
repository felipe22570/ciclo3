/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.app.appweb.repository;

import com.app.appweb.controllers.model.Reservations;
import com.app.appweb.repository.crud.ReservationCrudRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author felip
 */
@Repository
public class ReservationRepository {
    @Autowired
    private ReservationCrudRepository reservationCrudRepository;
    public List<Reservations> getAll(){
        return (List<Reservations>) reservationCrudRepository.findAll();
    }
    public Optional<Reservations> getReservation(int id){
        return reservationCrudRepository.findById(id);
    }
    public Reservations save(Reservations r){
        return reservationCrudRepository.save(r);
    }
}
