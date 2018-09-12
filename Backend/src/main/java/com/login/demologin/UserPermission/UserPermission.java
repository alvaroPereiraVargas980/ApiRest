package com.login.demologin.UserPermission;

import com.login.demologin.CalendarUser.CalendarUser;
import com.login.demologin.User.User;
import javax.persistence.*;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

    @Entity
    @Table(name = "permission")
    public class UserPermission {
        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        private long id;

        private String update;

        private String delete;

        private String view;
        @ManyToOne
        @JoinColumn(name = "id_user")
        private User id_user;

        @ManyToOne
        @JoinColumn(name = "id_calendar")
        private CalendarUser id_calendar;

        public UserPermission() {
        }
        public UserPermission(long id) {
            this.id = id;
        }

        public UserPermission(String update, String delete, String view, User user, CalendarUser calendarUser) {
            this.id_user = user;
            this.id_calendar = calendarUser;
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

        public User getId_user() {
            return id_user;
        }

        public void setId_user(User id_user) {
            this.id_user = id_user;
        }

        public CalendarUser getId_calendar() {
            return id_calendar;
        }

        public void setId_calendar(CalendarUser id_calendar) {
            this.id_calendar = id_calendar;
        }
    }

