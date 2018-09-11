package com.login.demologin.controller;


import com.login.demologin.CalendarUserRepository.CalendarUserRepository;
import com.login.demologin.Repository.UserRespository;
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

        @Autowired
         private UserRespository userRespository;

        @Autowired
         private CalendarUserRepository calendarUserRepository;


        @PostMapping("/posts/{userId}")
        public UserPermission createPermission(@PathVariable (value = "userId") Long userId,
                                               @Valid @RequestBody UserPermission userPermission) {
            return userRespository.findById(userId).map(user -> {
                userPermission.setUser(user);
                //long id=userId;
                return userPermissionRepository.save(userPermission);
            }).orElseThrow(() -> new ResourceNotFoundException("PostId " + userId + " not found"));
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
