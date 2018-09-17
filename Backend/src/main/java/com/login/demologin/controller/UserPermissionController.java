package com.login.demologin.controller;

import com.login.demologin.UserPermissionRepository.UserPermissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.login.demologin.UserPermission.UserPermission;

import javax.validation.Valid;
import java.util.List;
import com.login.demologin.exception.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/")
public class UserPermissionController {

             @Autowired
             private UserPermissionRepository userPermissionRepository;


             @PostMapping("/CreatePermission")
             public UserPermission createPermission(@Valid @RequestBody UserPermission userPermission) {

                 return userPermissionRepository.save(userPermission);
            }

            @GetMapping("/GetUserPermission")
            public List<UserPermission> getAllP(){

                return (List<UserPermission>)userPermissionRepository.findAll();
            }

            @GetMapping("/GetIdPermission/{nickname}")
            public List<Object> getId(@PathVariable(value = "nickname") String nickname){

                return (List<Object>)userPermissionRepository.findIdByNickname(nickname);
            }

            @GetMapping("/GetIdCalendar/{id_calendar}")
            public List<Object> getIdCalendar(@PathVariable(value = "id_calendar") Integer id_calendar){

                return (List<Object>)userPermissionRepository.findAllById(id_calendar);
            }



            @DeleteMapping("/DeleteUsersPermission/{id}")
            public ResponseEntity<?> deletePermission(@PathVariable(value = "id") Integer noteId) {
                UserPermission user = userPermissionRepository.findById(noteId)
                        .orElseThrow(() -> new ResourceNotFoundException("User", "id", noteId));

                userPermissionRepository.delete(user);

                return ResponseEntity.ok().build();
            }

        }
