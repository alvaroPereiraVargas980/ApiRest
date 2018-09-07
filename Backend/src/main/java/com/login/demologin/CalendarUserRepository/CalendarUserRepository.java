package com.login.demologin.CalendarUserRepository;

import com.login.demologin.CalendarUser.CalendarUser;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;


public interface CalendarUserRepository extends CrudRepository<CalendarUser, Long>{
   @Query(value = "SELECT * FROM calendar_user  WHERE owner='alvaropereira980'",nativeQuery = true)
   public List<CalendarUser> findByTitle();
}
