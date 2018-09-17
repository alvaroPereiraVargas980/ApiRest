package com.login.demologin.UserPermission;

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
        private Integer id_permission;

        private String update_permission;

        private String delete_permission;

        private String view_permission;

        private Integer id_calendar;

        private Integer id_user;


        public UserPermission() {
        }
        public UserPermission(Integer id_permission) {
            this.id_permission = id_permission;
        }

        public UserPermission(String update_permission, String delete_permission, String view_permission, Integer id_user, Integer id_calendar){
            this.update_permission = update_permission;
            this.delete_permission = delete_permission;
            this.view_permission = view_permission;
            this.id_user=id_user;
            this.id_calendar=id_calendar;

        }

        public Integer getId_permission() {
            return id_permission;
        }

        public void setId_permission(Integer id_permission) {
            this.id_permission = id_permission;
        }

        public String getUpdate_permission() {
            return update_permission;
        }

        public void setUpdate_permission(String update_permission) {
            this.update_permission = update_permission;
        }

        public String getDelete_permission() {
            return delete_permission;
        }

        public void setDelete_permission(String delete_permission) {
            this.delete_permission = delete_permission;
        }

        public String getView_permission() {
            return view_permission;
        }

        public void setView_permission(String view_permission) {
            this.view_permission = view_permission;
        }

        public Integer getId_calendar() {
            return id_calendar;
        }

        public void setId_calendar(Integer id_calendar) {
            this.id_calendar = id_calendar;
        }

        public Integer getId_user() {
            return id_user;
        }

        public void setId_user(Integer id_user) {
            this.id_user = id_user;
        }
    }

