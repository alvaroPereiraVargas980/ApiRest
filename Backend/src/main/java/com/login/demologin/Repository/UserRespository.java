package com.login.demologin.Repository;

//import com.login.demologin.calendar.Calendar;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.jpa.repository.Query;
import com.login.demologin.User.User;
import java.util.List;

public interface UserRespository extends CrudRepository<User, Long> {
    @Query(value = "SELECT DISTINCT nickname FROM user",nativeQuery = true)
    public List<Object> findByNickname();
}