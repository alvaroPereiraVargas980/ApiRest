package com.login.demologin.controller;

import com.login.demologin.Calrepository.CaleRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.login.demologin.calendar.Calendar;
import com.login.demologin.Repository.UserRespository;
import javax.validation.Valid;
import java.util.List;
import com.login.demologin.exception.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/Calendar")
public class CalendarConrtroller {
    @Autowired
    private CaleRespository caleRespository;


    @GetMapping("/GetCalendar")
    public List<Calendar> getAllCalendar(){

        return (List<Calendar>) caleRespository.findAll();
    }
    @PostMapping("/CreateCalendar")
    public Calendar createCalendar(@Valid @RequestBody Calendar calendar) {

        return caleRespository.save(calendar);
    }
    @GetMapping("/GetsCalendar/{id}")
    public Calendar getCalendarById(@PathVariable(value = "id") Long noteId) {
        return caleRespository.findById(noteId)
                .orElseThrow(() -> new ResourceNotFoundException("Calendar", "id", noteId));
    }
    @PutMapping("/PutCalendar/{id}")
    public Calendar updateCalendar(@PathVariable(value = "id") Long noteId,
                           @Valid @RequestBody Calendar calendarDetails) {

        Calendar calendar = caleRespository.findById(noteId)
                .orElseThrow(() -> new ResourceNotFoundException("Calendar", "id", noteId));

        calendar.setTitle(calendarDetails.getTitle());
        calendar.setStart(calendarDetails.getStart());
        calendar.setEnd(calendarDetails.getEnd());


        Calendar updateCalendar = caleRespository.save(calendar);
          return updateCalendar;
    }
    @DeleteMapping("/DeleteCalendar/{id}")
    public ResponseEntity<?> deleteNote(@PathVariable(value = "id") Long noteId) {
        Calendar calendar = caleRespository.findById(noteId)
                .orElseThrow(() -> new ResourceNotFoundException("Calendar", "id", noteId));

       caleRespository.delete(calendar);

        return ResponseEntity.ok().build();
    }
}
