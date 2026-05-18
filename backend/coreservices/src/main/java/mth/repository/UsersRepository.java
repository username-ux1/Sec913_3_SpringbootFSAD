package mth.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import mth.models.Users;
import mth.models.Roles;

@Repository
public interface UsersRepository extends JpaRepository<Users, Long> {
 
 @Query("select U.role from Users U where U.email=:username and U.password=:password")
 public Object validateCredentials(@Param("username") String username, @Param("password") String password);
 
 @Query("select U.id from Users U where U.email=:email")
 public Object checkByEmail(@Param("email") String email);
 
 @Query("select U from Users U where U.email=:email")
 public Users findByEmail(@Param("email") String email);
 
 @Query("select M from Menus M join Rolesmapping R on M.mid=R.mid where R.role=:role")
 public List<Object> getMenus(@Param("role") Long role);

 // LIST ROLES
 @Query("select R from Roles R")
 public List<Roles> listRoles();

 // INSERT MENU
 @Modifying
 @Transactional
 @Query(value = "INSERT INTO menus (mid, icon, menu) VALUES (?1, ?2, ?3)", nativeQuery = true)
 void insertMenu(int mid, String icon, String menu);
 // LIST MENUS
 @Query(value = "SELECT * FROM menus ORDER BY mid", nativeQuery = true)
 List<Object> listMenus();

 // INSERT ROLE
 @Modifying
 @Transactional
 @Query(value = "INSERT INTO roles (rolename) VALUES (?1)", nativeQuery = true)
 void insertRole(String rolename);

 // INSERT ROLE MAPPING
 @Modifying
 @Transactional
 @Query(value = "INSERT INTO rolesmapping (mid, role) VALUES (?1, ?2)", nativeQuery = true)
 void insertRoleMapping(int mid, int role);
}