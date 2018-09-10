package com.login.demologin.UserPermission;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.*;

    @Entity
    @Table(name = "permission")
    public class UserPermission {
        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        private long id;

        private String update;

        private String delete;

        private String view;

        private long user_id;

        public UserPermission() {
        }

        public UserPermission(long id) {
            this.id = id;
        }

        public UserPermission(String update, String delete, String view, long user_id) {
            this.update = update;
            this.delete = delete;
            this.view = view;
            this.user_id = user_id;

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

        public long getUser_id() {
            return user_id;
        }

        public void setUser_id(long user_id) {
            this.user_id = user_id;
        }
    }

