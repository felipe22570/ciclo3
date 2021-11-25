package com.app.appweb.controllers.model;

import java.util.HashSet;
import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;




@Entity
@Table(name = "category")
public class Category implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String description;
    
    
    @OneToMany(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "id")
    @JsonIgnoreProperties("category")
    private Set<Partyroom> partyrooms = new HashSet<Partyroom>();
   

    public Set<Partyroom> getPartyrooms() {
        return partyrooms;
    }


    public void setPartyrooms(Set<Partyroom> partyrooms) {
        this.partyrooms = partyrooms;
    }


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    


}
