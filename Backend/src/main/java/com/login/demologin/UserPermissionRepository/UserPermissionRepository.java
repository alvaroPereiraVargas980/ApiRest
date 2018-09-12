package com.login.demologin.UserPermissionRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import com.login.demologin.UserPermission.UserPermission;
import org.springframework.data.repository.query.Param;



public interface UserPermissionRepository extends CrudRepository<UserPermission, Long>{

}
