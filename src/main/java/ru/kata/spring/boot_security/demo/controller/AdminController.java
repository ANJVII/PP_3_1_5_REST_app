package ru.kata.spring.boot_security.demo.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;

import javax.validation.Valid;
import java.security.Principal;
import java.util.Collection;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping(value = "/admin")
public class AdminController {

    private final UserService userService;

    public AdminController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping(value = "/users")
    public ResponseEntity<List<User>> showAllUsers(Model model, Principal principal) {
        List<User> allUsers = userService.findAllUsers();
//        User user = userService.findByEmail(principal.getName());
//        User newUser = new User();
//        Collection<Role> roles = userService.getRoles();
//        model.addAttribute("users", allUsers);
//        model.addAttribute("profile", user);
//        model.addAttribute("newUser", newUser);
//        model.addAttribute("access", roles);
//        return "all-users";
        return new ResponseEntity<>(allUsers, HttpStatus.OK);
    }

    @PostMapping(value = "/saveUser")
//    public String saveUser(@Valid @ModelAttribute("user") User user) {
//        userService.saveUser(user);
//        return "redirect:/admin/users";
    public User saveUser(@RequestBody User user) {
        userService.saveUser(user);
        return user;
    }

//    @PatchMapping(value = "/updateUser-{id}")
@PatchMapping(value = "/updateUser")
//    public String updateUser(@ModelAttribute("user") User user) {
//        userService.updateUser(user);
//        return "redirect:/admin/users";
    public User updateUser(@RequestBody User user) {
        userService.saveUser(user);
        return user;
    }

//    @DeleteMapping(value = "/deleteUser")
//    public String deleteUser(@RequestParam(value = "id") Long id, Principal principal) {
//        Long idPrincipal = userService.findByEmail(principal.getName()).getId();
//        userService.deleteUser(id);
//        return Objects.equals(id, idPrincipal)?"/index":"redirect:/admin/users";
//    }
@DeleteMapping(value = "/deleteUser-{id}")
public String deleteUser(@PathVariable Long id) {
    userService.deleteUser(id);
    return "Employee with ID = " + id + " was deleted";
}
}
