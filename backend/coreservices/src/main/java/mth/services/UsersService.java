package mth.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mth.models.Users;
import mth.models.Tasks;
import mth.repository.UsersRepository;
import mth.repository.TasksRepository;

@Service
public class UsersService {
 
 @Autowired
 UsersRepository UR;
 
 @Autowired
 JwtService JWT;

 @Autowired
 TasksRepository TR;
  
 public Object signup(Users U)
 {
  Map<String, Object> response = new HashMap<>();
  try
  {
   Object id = UR.checkByEmail(U.getEmail());
   if(id != null)
   {    
    response.put("code", 501);
    response.put("message", "Email ID already registered");
   }
   else
   {
    U.setRole(1);
    U.setStatus(1);
    UR.save(U);
    
    response.put("code", 200);
    response.put("message", "User account has been created.");
   }
  }catch(Exception e)
  {
   response.put("code", 500);
   response.put("message", e.getMessage());
  }
  return response;
 }
 
 public Object signin(Map<String, Object> data)
 {
  Map<String, Object> response = new HashMap<>();
  try
  {
   Object role = UR.validateCredentials(data.get("username").toString(), data.get("password").toString());
   if(role != null)
   {
    response.put("code", 200);
    response.put("jwt", JWT.generateJWT(data.get("username"), role));
   }
   else
   {
    response.put("code", 404);
    response.put("message", "Invalid Credentials!");
   }
  }catch(Exception e)
  {
   response.put("code", 500);
   response.put("message", e.getMessage());
  }
  return response;
 }
 
 public Object uinfo(String token)
 {
  Map<String, Object> response = new HashMap<>();
  try
  {
   Map<String, Object> payload = JWT.validateJWT(token);
         String email = (String) payload.get("username");
         Users U = UR.findByEmail(email);
         
         List<Object> menuList = UR.getMenus(Long.valueOf(U.getRole()));
   
         response.put("code", 200);
         response.put("fullname", U.getFullname());
         response.put("menulist", menuList);
  }catch(Exception e)
  {
   response.put("code", 500);
   response.put("message", e.getMessage());
  }
  return response;
 }

 public Object setupTaskData() {
     Map<String, Object> response = new HashMap<>();
     try {

         // avoid duplicates
         try { UR.insertMenu(6, "report.png", "Report"); } catch(Exception e) {}
         try { UR.insertRole("Guest"); } catch(Exception e) {}

         // mapping
         try { UR.insertRoleMapping(6, 1); } catch(Exception e) {}
         try { UR.insertRoleMapping(6, 2); } catch(Exception e) {}
         try { UR.insertRoleMapping(6, 3); } catch(Exception e) {}

         try { UR.insertRoleMapping(1, 4); } catch(Exception e) {}
         try { UR.insertRoleMapping(5, 4); } catch(Exception e) {}
         try { UR.insertRoleMapping(6, 4); } catch(Exception e) {}

         response.put("code", 200);
         response.put("message", "Task completed");

     } catch (Exception e) {
         response.put("code", 500);
         response.put("message", e.getMessage());
     }
     return response;
 }

 // ADD ROLE
 public Object addRole(String rolename) {
     Map<String, Object> response = new HashMap<>();

     try {
         UR.insertRole(rolename);

         response.put("code", 200);
         response.put("message", "Role Added Successfully");
     } catch (Exception e) {
         response.put("code", 500);
         response.put("message", e.getMessage());
     }

     return response;
 }

 // LIST ROLES
 public Object listRoles() {
     Map<String, Object> response = new HashMap<>();

     try {
         response.put("code", 200);
         response.put("roles", UR.listRoles());
     } catch (Exception e) {
         response.put("code", 500);
         response.put("message", e.getMessage());
     }

     return response;
 }

 // ADD TASK
 public Object addTask(Tasks T) {
     Map<String, Object> response = new HashMap<>();

     try {
         TR.save(T);

         response.put("code", 200);
         response.put("message",
        		 "Task added successfully");
     } catch (Exception e) {
         response.put("code", 500);
         response.put("message", e.getMessage());
     }

     return response;
 }

 // LIST TASKS
 public Object listTasks() {
     Map<String, Object> response = new HashMap<>();

     try {
         response.put("code", 200);
         response.put("tasks", TR.findAll());
     } catch (Exception e) {
         response.put("code", 500);
         response.put("message", e.getMessage());
     }

     return response;
 }

 // DELETE TASK
 public Object deleteTask(Long id) {
     Map<String, Object> response = new HashMap<>();

     try {
         TR.deleteById(id);

         response.put("code", 200);
         response.put("message", "Task deleted successfully");
     } catch (Exception e) {
         response.put("code", 500);
         response.put("message", e.getMessage());
     }

     return response;
 }

 // LIST USERS
 public Object listUsers() {
     Map<String, Object> response = new HashMap<>();

     try {
         response.put("code", 200);
         response.put("users", UR.findAll());
     } catch (Exception e) {
         response.put("code", 500);
         response.put("message", e.getMessage());
     }

     return response;
 }
 // LIST MENUS
 public Object listMenus() {
     Map<String, Object> response = new HashMap<>();

     try {
         response.put("code", 200);
         response.put("menus", UR.listMenus());
     } catch (Exception e) {
         response.put("code", 500);
         response.put("message", e.getMessage());
     }

     return response;
 }

 // MAP MENU WITH ROLE
 public Object mapMenu(int role, int mid) {
     Map<String, Object> response = new HashMap<>();

     try {
         UR.insertRoleMapping(mid, role);

         response.put("code", 200);
         response.put("message", "Menu mapped successfully");
     } catch (Exception e) {
         response.put("code", 500);
         response.put("message", e.getMessage());
     }

     return response;
 }
}
