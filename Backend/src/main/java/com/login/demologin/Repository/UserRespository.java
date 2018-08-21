package com.login.demologin.Repository;

import com.login.demologin.calendar.Calendar;
import org.springframework.data.repository.CrudRepository;

import com.login.demologin.User.User;

public interface UserRespository extends CrudRepository<User, Long> {

}