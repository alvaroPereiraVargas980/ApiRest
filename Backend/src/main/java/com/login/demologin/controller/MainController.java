package com.login.demologin.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.login.demologin.User.User;
import com.login.demologin.Repository.UserRespository;
import javax.validation.Valid;
import java.util.List;
import com.login.demologin.exception.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/demo")
public class MainController {
    @Autowired
    private UserRespository userRespository;
    @PostMapping("/create")
    public User createNote(@Valid @RequestBody User user) {

        return userRespository.save(user);
    }
    @GetMapping("/notes")
    public List<User> getAllNotes(){

        return (List<User>) userRespository.findAll();
    }

    @GetMapping("/notes/{id}")
    public User getNoteById(@PathVariable(value = "id") Long noteId) {
        return userRespository.findById(noteId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", noteId));
    }
    @PutMapping("/notes/{id}")
    public User updateUser(@PathVariable(value = "id") Long noteId,
                           @Valid @RequestBody User userDetails) {

        User user = userRespository.findById(noteId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", noteId));

        user.setUsername(userDetails.getUsername());
        user.setPassword(userDetails.getPassword());

        User updateUser = userRespository.save(user);
        return updateUser;
    }

    @DeleteMapping("/notes/{id}")
    public ResponseEntity<?> deleteNote(@PathVariable(value = "id") Long noteId) {
        User user = userRespository.findById(noteId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", noteId));

        userRespository.delete(user);

        return ResponseEntity.ok().build();
    }
}
