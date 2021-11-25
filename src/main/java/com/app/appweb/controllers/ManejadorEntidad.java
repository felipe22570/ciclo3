package com.app.appweb.controllers;

import com.app.appweb.controllers.model.Admin;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import com.app.appweb.controllers.model.Category;
import com.app.appweb.controllers.model.Client;
import com.app.appweb.controllers.model.Messages;
import com.app.appweb.controllers.model.Partyroom;
import com.app.appweb.controllers.model.Reservations;
import com.app.appweb.controllers.model.Score;

import org.springframework.stereotype.Repository;



@Repository
@Transactional
public class ManejadorEntidad {
    @PersistenceContext
    private EntityManager manejador;
    
    public void CategoriasPost(Category category){
        manejador.persist(category);
    }

    public List<Category> todos() {
        return manejador.createQuery("select C from Category C" , Category.class).getResultList();
    }

     public void PartyroomPost(Partyroom partyroom){
        manejador.persist(partyroom);
    }
    
    public List<Partyroom> PartyroomGet(){
        return manejador.createQuery("select P from Partyroom P" , Partyroom.class).getResultList();
    }

    public void MessagesPost(Messages messages){
        manejador.persist(messages);
    }

    public List<Messages> messageGet(){
        return manejador.createQuery("select M from Messages M", Messages.class).getResultList();
    }

    public void ReservationsPost(Reservations reservations){
        manejador.persist(reservations);
    }

    public List<Reservations> ReservationsGet(){
        return manejador.createQuery("select R from Reservations R" , Reservations.class).getResultList();
    }

    public void ClientPost(Client client) {
        manejador.persist(client);
    }

    public List<Client> ClientGet() {
        return manejador.createQuery("select C from Client C" , Client.class).getResultList();
    }
    
    public void AdminPost(Admin admin){
        manejador.persist(admin);
    }
    
    public List<Admin> AdminGet(){
        return manejador.createQuery("select A from Admin A" , Admin.class).getResultList();
    }
    
    public void ScorePost(Score score){
        manejador.persist(score);
    }
    
    public List<Score> ScoreGet(){
        return manejador.createQuery("select S from Score S" , Score.class).getResultList();
    }

}
