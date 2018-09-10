package com.login.demologin.controller;


import com.login.demologin.User.User;
import com.login.demologin.UserPermission.UserPermission;
import com.login.demologin.UserPermissionRepository.UserPermissionRepository;
import com.login.demologin.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/")
public class UserPermissionController {

        @Autowired
        private UserPermissionRepository userPermissionRepository;
        @PostMapping("/CreateUsersPermission")
        public UserPermission createPermission(@Valid @RequestBody UserPermission userPermission) {

            return userPermissionRepository.save(userPermission);
        }
         @GetMapping("/GetUserPermission")
         public List<UserPermission> getAllPermission(){

        return (List<UserPermission>) userPermissionRepository.findAll();
    }
    @DeleteMapping("/DeleteUsersPermission/{id}")
    public ResponseEntity<?> deletePermission(@PathVariable(value = "id") Long noteId) {
        UserPermission user = userPermissionRepository.findById(noteId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", noteId));

        userPermissionRepository.delete(user);

        return ResponseEntity.ok().build();
    }


}
