package com.login.demologin.controller;

//import com.login.demologin.Calrepository.CaleRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.login.demologin.User.User;
//import com.login.demologin.calendar.Calendar;
import com.login.demologin.Repository.UserRespository;
import javax.validation.Valid;
import java.util.List;
import com.login.demologin.exception.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/")
public class UserController {
    @Autowired
    private UserRespository userRespository;

    @PostMapping("/CreateUsers")
    public User createNote(@Valid @RequestBody User user) {

        return userRespository.save(user);
    }
    @GetMapping("/GetUsers")
    public List<User> getAllNotes(){

        return (List<User>) userRespository.findAll();
    }
    @GetMapping("/GetAutocomplete")
    public List<Object> testuser(){

        return (List<Object>) userRespository.findByNickname();
    }

    @GetMapping("/GetUsers/{id}")
    public User getNoteById(@PathVariable(value = "id") Long noteId) {
        return userRespository.findById(noteId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", noteId));
    }
    @PutMapping("/PutUsers/{id}")
    public User updateUser(@PathVariable(value = "id") Long noteId,
                           @Valid @RequestBody User userDetails) {

        User user = userRespository.findById(noteId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", noteId));

        user.setName(userDetails.getName());
        user.setNickname(userDetails.getNickname());
        user.setPicture(userDetails.getPicture());
        user.setSub(userDetails.getSub());
        user.setUpdated_at(userDetails.getUpdated_at());

        User updateUser = userRespository.save(user);
        return updateUser;
    }

    @DeleteMapping("/DeleteUsers/{id}")
    public ResponseEntity<?> deleteNote(@PathVariable(value = "id") Long noteId) {
        User user = userRespository.findById(noteId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", noteId));

        userRespository.delete(user);

        return ResponseEntity.ok().build();
    }
}
