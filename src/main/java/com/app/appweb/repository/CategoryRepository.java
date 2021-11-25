/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.app.appweb.repository;

import com.app.appweb.controllers.model.Category;
import com.app.appweb.repository.crud.CategoryCrudRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author felip
 */
@Repository
public class CategoryRepository {
    
    @Autowired
    private CategoryCrudRepository categoryCrudRepository;
    
    public List<Category> getAll(){
        return(List<Category>) categoryCrudRepository.findAll();
    }
    
    public Optional<Category> getCategory(int id){
        return categoryCrudRepository.findById(id);
    }
    
    public Category save (Category c){
        return categoryCrudRepository.save(c);
    }
}
