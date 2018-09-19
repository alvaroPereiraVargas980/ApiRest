package com.login.demologin.Repository;

//import com.login.demologin.calendar.Calendar;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.jpa.repository.Query;
import com.login.demologin.User.User;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRespository extends CrudRepository<User, Integer> {
    @Query(value = "SELECT DISTINCT nickname FROM user",nativeQuery = true)
    public List<Object> findByNickname();

    @Query(value = "SELECT calendar.id_calendar, calendar.title, calendar.owner FROM calendar INNER JOIN permission ON permission.id_calendar=calendar.id_calendar WHERE permission.id_user=:id_user",nativeQuery = true)
    public List<Object> findUserByPermission(@Param("id_user") Integer id_user);

}