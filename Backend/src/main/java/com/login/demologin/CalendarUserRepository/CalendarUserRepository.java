package com.login.demologin.CalendarUserRepository;

import com.login.demologin.CalendarUser.CalendarUser;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface CalendarUserRepository extends CrudRepository<CalendarUser, Long>{
   @Query(value = "SELECT * FROM accounted.calendar_user  WHERE accounted.calendar_user.owner='alvaropereira980'")
   public List<CalendarUser> findByTitle();
}
