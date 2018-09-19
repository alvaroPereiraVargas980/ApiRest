package com.login.demologin.UserPermissionRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import com.login.demologin.UserPermission.UserPermission;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;


public interface UserPermissionRepository extends CrudRepository<UserPermission, Integer>{
    @Query(value = "SELECT id_user FROM user  WHERE nickname=:nickname",nativeQuery = true)
    public List<Object> findIdByNickname(@Param("nickname") String nickname);

    @Query(value = "SELECT  permission.id_permission, permission.update_permission, permission.view_permission, user.nickname FROM permission INNER JOIN user ON permission.id_user=user.id_user WHERE permission.id_calendar=:id_calendar",nativeQuery = true)
    public List<Object> findAllById(@Param("id_calendar") Integer id_calendar);

    @Query(value = "SELECT  permission.update_permission, permission.view_permission FROM permission INNER JOIN user ON permission.id_user=user.id_user WHERE permission.id_calendar=:id_calendar AND permission.id_user=:id_user",nativeQuery = true)
    public List<Object> findIdByCalendar(@Param("id_calendar") Integer id_calendar,@Param("id_user") Integer id_user);

    @Query(value = "SELECT id_permission FROM permission  WHERE id_calendar=:id_calendar",nativeQuery = true)
    public List<Object> findIdPermissionByCalendar(@Param("id_calendar") Integer id_calendar);

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM permission WHERE permission.id_calendar=:id_calendar AND permission.id_permission=:id_permission",nativeQuery = true)
    public void deleteCalendarPermission(@Param("id_calendar") Integer id_calendar,@Param("id_permission") Integer id_permission);
}
