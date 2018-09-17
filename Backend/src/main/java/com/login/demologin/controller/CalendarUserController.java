package com.login.demologin.controller;

import com.login.demologin.CalendarUserRepository.CalendarUserRepository;
import com.login.demologin.CalendarUser.CalendarUser;
import com.login.demologin.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

    @CrossOrigin(origins = "http://localhost:4200")
    @RestController
    @RequestMapping("/")
    public class CalendarUserController {
        @Autowired
        private CalendarUserRepository calendarUserRepository;


        @GetMapping("/GetCalendarUsers")
        public List<CalendarUser> getAllCalendar(){

            return (List<CalendarUser>) calendarUserRepository.findAll();
        }
        @GetMapping("/GetUserCalendar/{name}")
        public List<CalendarUser> test(@PathVariable(value = "name") String name){

          return (List<CalendarUser>) calendarUserRepository.findByTitle(name);
        }

        @PostMapping("/CreateCalendarUsers")
        public CalendarUser createCalendar(@Valid @RequestBody CalendarUser calendar) {

            return calendarUserRepository.save(calendar);
        }
        @GetMapping("/GetsCalendarUsers/{id}")
        public CalendarUser getCalendarById(@PathVariable(value = "id") Integer noteId) {
            return calendarUserRepository.findById(noteId)
                    .orElseThrow(() -> new ResourceNotFoundException("Calendar", "id", noteId));
        }
        @PutMapping("/PutCalendarUsers/{id}")
        public CalendarUser updateCalendar(@PathVariable(value = "id") Integer noteId,
                                       @Valid @RequestBody CalendarUser calendarDetails) {

            CalendarUser calendar = calendarUserRepository.findById(noteId)
                    .orElseThrow(() -> new ResourceNotFoundException("Calendar", "id", noteId));

            calendar.setTitle(calendarDetails.getTitle());
            calendar.setStart(calendarDetails.getStart());
            calendar.setEnd(calendarDetails.getEnd());
            calendar.setOwner(calendarDetails.getOwner());


            CalendarUser updateCalendar = calendarUserRepository.save(calendar);
            return updateCalendar;
        }
        @DeleteMapping("/DeleteCalendarUsers/{id}")
        public ResponseEntity<?> deleteNote(@PathVariable(value = "id") Integer noteId) {
            CalendarUser calendar = calendarUserRepository.findById(noteId)
                    .orElseThrow(() -> new ResourceNotFoundException("Calendar", "id", noteId));

            calendarUserRepository.delete(calendar);

            return ResponseEntity.ok().build();
        }
}
