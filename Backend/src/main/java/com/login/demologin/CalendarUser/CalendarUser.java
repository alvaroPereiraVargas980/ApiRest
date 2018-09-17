package com.login.demologin.CalendarUser;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;


@Entity
@Table(name = "Calendar")
public class CalendarUser {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id_calendar;
    @NotBlank
    private String title;
    @NotBlank
    private String start;
    @NotBlank
    private String end;
    @NotBlank
    private String owner;


    public CalendarUser() {
    }

    public CalendarUser(Integer id_calendar) {
        this.id_calendar = id_calendar;
    }

    public CalendarUser(String title, String start, String end, String owner) {
        this.title = title;
        this.start = start;
        this.end = end;
        this.owner= owner;
    }

    public long getId() {
        return id_calendar;
    }

    public void setId(Integer id_calendar) {
        this.id_calendar = id_calendar;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getStart() {
        return start;
    }

    public void setStart(String start) {
        this.start = start;
    }

    public String getEnd() {
        return end;
    }

    public void setEnd(String end) {
        this.end = end;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }
}