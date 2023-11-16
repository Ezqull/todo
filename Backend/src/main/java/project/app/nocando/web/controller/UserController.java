package project.app.nocando.web.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.app.nocando.business.payload.request.UserRequest;
import project.app.nocando.business.payload.response.UserResponse;
import project.app.nocando.business.service.UserService;

import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin("http://localhost:5173")
@RequestMapping("/user")
public class UserController implements BaseController<UserRequest, UserResponse> {

    private final UserService service;

    @Override
    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getById(@PathVariable String id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @Override
    @GetMapping("")
    public ResponseEntity<List<UserResponse>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @Override
    @PostMapping("")
    public ResponseEntity<UserResponse> add(@RequestBody UserRequest request) {
        return ResponseEntity.ok(service.save(request));
    }

    @Override
    @PutMapping("/{email}")
    public ResponseEntity<UserResponse> update(@RequestBody UserRequest request, @PathVariable String email) {
        return ResponseEntity.ok(service.update(request, email));
    }

    @Override
    @DeleteMapping("/{id}")
    public ResponseEntity<UserResponse> delete(@PathVariable String id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
