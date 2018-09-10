package com.login.demologin.CalendarUserRepository;

import com.login.demologin.CalendarUser.CalendarUser;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface CalendarUserRepository extends CrudRepository<CalendarUser, Long>{
   @Query(value = "SELECT * FROM calendar  WHERE owner=:id",nativeQuery = true)
   public List<CalendarUser> findByTitle(@Param("id") String id);
}
