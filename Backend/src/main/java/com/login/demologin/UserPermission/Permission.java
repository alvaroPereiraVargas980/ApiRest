package com.login.demologin.UserPermission;

import javax.persistence.*;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

    @Entity
    @Table(name = "permission")
    public class Permission {
        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        private long id;

        private String update;

        private String delete;

        private String view;

        private long id_user;

        private long id_calendar;

        public Permission() {
        }
        public Permission(long id) {
            this.id = id;
        }

        public Permission(String update, String delete, String view , Long id_user, Long id_calendar){
            this.update=update;
            this.delete=delete;
            this.view=view;
            this.id_user=id_user;
            this.id_calendar=id_calendar;

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

        public long getId_user() {
            return id_user;
        }

        public void setId_user(long id_user) {
            this.id_user = id_user;
        }

        public long getId_calendar() {
            return id_calendar;
        }

        public void setId_calendar(long id_calendar) {
            this.id_calendar = id_calendar;
        }
    }
