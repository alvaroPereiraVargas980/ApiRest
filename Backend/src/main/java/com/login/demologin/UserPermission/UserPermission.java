package com.login.demologin.UserPermission;

import com.login.demologin.CalendarUser.CalendarUser;
import com.login.demologin.User.User;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import com.fasterxml.jackson.annotation.JsonIgnore;

    @Entity
    @Table(name = "permission")
    public class UserPermission {
        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        private long id;

        private String update;

        private String delete;

        private String view;

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "id_user")
        private User user;

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "id_calendar")
        private CalendarUser calendarUser;



        public UserPermission() {
        }

        public UserPermission(long id) {
            this.id = id;
        }

        public UserPermission(String update, String delete, String view) {

            this.delete = delete;
            this.update = update;
            this.view = view;

        }

        public long getId() {
            return id;
        }

        public void setId(long id) {
            this.id = id;
        }

        public String getUpdate() {
            return update;
        }

        public void setUpdate(String update) {
            this.update = update;
        }

        public String getDelete() {
            return delete;
        }

        public void setDelete(String delete) {
            this.delete = delete;
        }

        public String getView() {
            return view;
        }

        public void setView(String view) {
            this.view = view;
        }

        public User getUser() {
            return user;
        }

        public void setUser(User user) {
            this.user = user;
        }

        public CalendarUser getCalendarUser() {
            return calendarUser;
        }

        public void setCalendarUser(CalendarUser calendarUser) {
            this.calendarUser = calendarUser;
        }
    }

