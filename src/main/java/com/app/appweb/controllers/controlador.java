package com.app.appweb.controllers;

import com.app.appweb.controllers.model.Admin;
import java.util.List;
import com.app.appweb.controllers.model.Category;
import com.app.appweb.controllers.model.Client;
import com.app.appweb.controllers.model.Messages;
import com.app.appweb.controllers.model.Partyroom;
import com.app.appweb.controllers.model.Reservations;
import com.app.appweb.controllers.model.Score;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;




@RestController
@RequestMapping
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST,RequestMethod.PUT,RequestMethod.DELETE})
public class controlador {

    @Autowired
    private ManejadorEntidad manejador;



    @RequestMapping(value = "/api/Category/save" , method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public void categoriasPublicar(@RequestBody Category category){
        manejador.CategoriasPost(category);
    }    

   
    @RequestMapping(value = "/api/Category/all" , method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public List<Category> categoriasGet(){
        return manejador.todos();
    }
    
    @RequestMapping(value = "/api/Partyroom/save" , method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public void PartyroomPost(@RequestBody Partyroom partyroom){
        manejador.PartyroomPost(partyroom);
    
    }
    
    @RequestMapping(value = "/api/Partyroom/all" , method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public List<Partyroom> PartyroomGet(){
        return manejador.PartyroomGet();
    }

    @RequestMapping(value = "/api/Message/save" , method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
        public void Messages(@RequestBody Messages messages){
            manejador.MessagesPost(messages);
        }
    
    @RequestMapping(value="/api/Message/all", method=RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public List<Messages> requestMethodName() {
        return manejador.messageGet();
    }

    @RequestMapping(value = "/api/Reservation/save" , method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public void ReservationsPost(@RequestBody Reservations reservations){
        manejador.ReservationsPost(reservations);
    }
    
    @RequestMapping(value = "/api/Reservation/all" , method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public List<Reservations> ReservationGet(){
        return manejador.ReservationsGet();
    }

    @RequestMapping(value = "/api/Client/save" , method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public void ClientPost(@RequestBody Client client){
        manejador.ClientPost(client);
    }

    @RequestMapping(value = "/api/Client/all" , method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public List<Client> ClientGet(){
        return manejador.ClientGet();
    }
    
    @RequestMapping(value = "/api/Admin/save" , method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public void AdminPost(@RequestBody Admin admin){
        manejador.AdminPost(admin);
    }
    
    @RequestMapping(value = "/api/Admin/all" , method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public List<Admin> AdminGet(){
        return manejador.AdminGet();
    }
    
    @RequestMapping(value = "/api/Score/save" , method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public void ScorePost(@RequestBody Score score){
        manejador.ScorePost(score);
    }
    
    @RequestMapping(value = "/api/Score/all" , method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public List<Score> ScoreGet(){
        return manejador.ScoreGet();
    }


}
