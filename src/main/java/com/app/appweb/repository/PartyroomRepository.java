/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.app.appweb.repository;

import com.app.appweb.controllers.model.Partyroom;
import com.app.appweb.repository.crud.PartyroomCrudRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author felip
 */
@Repository
public class PartyroomRepository {
    @Autowired
    private PartyroomCrudRepository partyroomCrudRepository;
    
    public List<Partyroom> getAll(){
        
        return(List<Partyroom>) partyroomCrudRepository.findAll();
        
    }
    
    public Optional<Partyroom> getPartyroom(int id){
        return partyroomCrudRepository.findById(id);
    }
    
    public Partyroom save(Partyroom p){
        return partyroomCrudRepository.save(p);
    }
}
