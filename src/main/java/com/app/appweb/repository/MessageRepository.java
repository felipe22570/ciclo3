/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.app.appweb.repository;

import com.app.appweb.controllers.model.Messages;
import com.app.appweb.repository.crud.MessageCrudRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author felip
 */
@Repository
public class MessageRepository {
    @Autowired
    private MessageCrudRepository messageCrudRepository;
    public List<Messages> getAll(){
        return (List<Messages>) messageCrudRepository.findAll();
    }
    public Optional<Messages> getMessage(int id){
        return messageCrudRepository.findById(id);
    }
    public Messages save(Messages m){
        return messageCrudRepository.save(m);
    }
}
