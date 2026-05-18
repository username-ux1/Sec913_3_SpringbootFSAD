package mth.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import mth.models.Users;
import mth.models.Tasks;
import mth.services.UsersService;

@CrossOrigin("*")
@RestController
@RequestMapping("/authservice")
public class UsersController {

    @Autowired
    UsersService US;

    @PostMapping("/signup")
    public Object signup(@RequestBody Users U) {
        return US.signup(U);
    }

    @PostMapping("/signin")
    public Object signin(@RequestBody Map<String, Object> data) {
        return US.signin(data);
    }

    // UPDATED (supports both header + browser)
    @GetMapping("/uinfo")
    public Object uinfo(
            @RequestHeader(value = "Token", required = false) String headerToken,
            @RequestParam(value = "token", required = false) String paramToken) {

        String token = headerToken != null ? headerToken : paramToken;

        if (token == null) {
            return Map.of(
                "code", 400,
                "message", "Token is required"
            );
        }

        return US.uinfo(token);
    }

    // Swagger test
    @GetMapping("/test")
    public String test(@RequestParam String input) {
        return input + " message";
    }

    // Setup API
    @GetMapping("/setup")
    public Object setup() {
        return US.setupTaskData();
    }

    // ADD ROLE API
    @PostMapping("/addrole")
    public Object addRole(@RequestParam String rolename) {

        US.addRole(rolename);

        return Map.of(
            "code", 200,
            "message", "Role Added Successfully"
        );
    }

    // LIST ROLES API
    @GetMapping("/listroles")
    public Object listRoles() {
        return US.listRoles();
    }

    // ADD TASK API
    @PostMapping("/addtask")
    public Object addTask(@RequestBody Tasks T) {
        return US.addTask(T);
    }

    // LIST TASKS API
    @GetMapping("/listtasks")
    public Object listTasks() {
        return US.listTasks();
    }

    // DELETE TASK API
    @DeleteMapping("/deletetask/{id}")
    public Object deleteTask(@PathVariable Long id) {
        return US.deleteTask(id);
    }

    // LIST USERS API
    @GetMapping("/listusers")
    public Object listUsers() {
        return US.listUsers();
    }
 // LIST MENUS API
    @GetMapping("/listmenus")
    public Object listMenus() {
        return US.listMenus();
    }

    // MAP MENU API
    @PostMapping("/mapmenu")
    public Object mapMenu(@RequestParam int role, @RequestParam int mid) {
        return US.mapMenu(role, mid);
    }

}