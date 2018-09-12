package com.login.demologin.controller;

import com.login.demologin.CalendarUserRepository.CalendarUserRepository;
import com.login.demologin.Repository.UserRespository;
import com.login.demologin.UserPermissionRepository.PermissionRepository;
import com.login.demologin.UserPermissionRepository.UserPermissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.login.demologin.UserPermission.UserPermission;
import com.login.demologin.UserPermission.Permission;
import javax.validation.Valid;
import java.util.List;
import com.login.demologin.exception.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/")
public class UserPermissionController {
             @Autowired
            private CalendarUserRepository calendarUserRepository;

             @Autowired
             private PermissionRepository permissionRepository;

             @Autowired
             private UserPermissionRepository userPermissionRepository;

             @Autowired
            private UserRespository userRespository;


             /* @PostMapping("/test/{delete}/{update}/{view}/{id_calendar}/{id_user}")
               void List<Object> createPermission(@PathVariable (value = "delete") String delete,
                                                    @PathVariable (value = "update") String update,
                                                    @PathVariable (value = "view") String view,
                                                    @PathVariable (value = "id_calendar") Long id_calendar,
                                                    @PathVariable (value = "id_user") Long id_user,
                                                    @Valid @RequestBody List<Object> permission) {
                     (List<Object>) userPermissionRepository.addPermission(delete,update,view,id_calendar,id_user);
        }*/

       /*@PostMapping("/postsPermission")
        public Permission createPermission(@Valid @RequestBody Permission Permission) {

               return permissionRepository.save(Permission);
       }*/

    @PostMapping("/posts/{id_user}/comments/{id_calendar}")
     public UserPermission createPermission(@PathVariable (value = "id_user") Long id_user,
                                            @PathVariable (value = "Id_calendar") Long id_calendar,
                                            @Valid @RequestBody UserPermission userPermission) {
       /* if(!calendarUserRepository.existsById(id_calendar)) {
            throw new ResourceNotFoundException("PostId ", " not found",id_calendar);
        }*/
        return userRespository.findById(id_user).map(post -> {
            userPermission.setId_user(post);
            return userPermissionRepository.save(userPermission);
        }).orElseThrow(() -> new ResourceNotFoundException("PostId "," not found",id_user));
    }
         @GetMapping("/GetUserPermission")
         public List<UserPermission> getAllPermission(){

        return (List<UserPermission>)userPermissionRepository.findAll();
    }
    @DeleteMapping("/DeleteUsersPermission/{id}")
    public ResponseEntity<?> deletePermission(@PathVariable(value = "id") Long noteId) {
        UserPermission user = userPermissionRepository.findById(noteId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", noteId));

        userPermissionRepository.delete(user);

        return ResponseEntity.ok().build();
    }

}
