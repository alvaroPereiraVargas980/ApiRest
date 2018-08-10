package com.login.demologin.Repository;

import org.springframework.data.repository.CrudRepository;

import com.login.demologin.User.User;

public interface UserRespository extends CrudRepository<User, Long> {

}