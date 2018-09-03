package com.login.demologin.CalendarUser;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;


@Entity
@Table(name = "CalendarUser")
public class CalendarUser {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
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

    public CalendarUser(long id) {
        this.id = id;
    }

    public CalendarUser(String title, String start, String end, String owner) {
        this.title = title;
        this.start = start;
        this.end = end;
        this.owner= owner;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
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