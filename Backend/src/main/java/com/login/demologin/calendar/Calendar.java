package com.login.demologin.calendar;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;


@Entity
@Table(name = "calendar")
public class Calendar {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @NotBlank
    private String title;
    @NotBlank
    private String start;
    @NotBlank
    private String end;

    public Calendar() {
    }

    public Calendar(long id) {
        this.id = id;
    }

    public Calendar(String title, String start, String end) {
        this.title = title;
        this.start = start;
        this.end = end;
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
}