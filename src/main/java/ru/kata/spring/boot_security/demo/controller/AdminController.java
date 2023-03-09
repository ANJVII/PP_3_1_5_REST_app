package ru.kata.spring.boot_security.demo.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.util.List;

@RestController
public class AdminController {

    private final UserService userService;

    public AdminController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping(value = "/admin/users")
    public ResponseEntity<List<User>> showAllUsers() {
        List<User> allUsers = userService.findAllUsers();
        return new ResponseEntity<>(allUsers, HttpStatus.OK);
    }

    @GetMapping(value = "/admin/roles")
    public ResponseEntity<List<Role>> getAllRoles() {
        List<Role> roles = userService.getRoles().stream().toList();
        return new ResponseEntity<>(roles, HttpStatus.OK);
    }

    @PostMapping(value = "/admin/saveUser")
    public ResponseEntity<Long> saveUser(@RequestBody User user) {
        userService.saveUser(user);
        User newUser = userService.findByEmail(user.getEmail());
        System.out.println(user);
        System.out.println(newUser);
        return new ResponseEntity<>(user.getId(), HttpStatus.OK);
    }

    @PatchMapping(value = "/admin/updateUser")
    public ResponseEntity<Long> updateUser(@RequestBody User user) {
        userService.updateUser(user);
        return new ResponseEntity<>(user.getId(), HttpStatus.OK);
    }

    @DeleteMapping(value = "/admin/deleteUser-{id}")
    public String deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return "Employee with ID = " + id + " was deleted";
    }

    @GetMapping("/admin/profile-{id}")
    public ResponseEntity<User> getUserByIdAdmin(@PathVariable Long id) {
        User user = userService.getUserById(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
}
