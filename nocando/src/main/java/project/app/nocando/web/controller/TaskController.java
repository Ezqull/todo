package project.app.nocando.web.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.app.nocando.business.payload.request.TaskPeriodRequest;
import project.app.nocando.business.payload.request.TaskRequest;
import project.app.nocando.business.payload.response.TaskResponse;
import project.app.nocando.business.service.TaskService;

import java.time.LocalDate;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/task")
public class TaskController implements BaseController<TaskRequest, TaskResponse> {

    private final TaskService service;

    @Override
    @GetMapping("/{id}")
    public ResponseEntity<TaskResponse> getById(@PathVariable String id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping("/period")
    public ResponseEntity<List<TaskResponse>> getAllByIsDoneAndFinishDateBetween(@RequestBody TaskPeriodRequest request){
        return ResponseEntity.ok(service.getAllByIsDoneAndFinishDateBetween(request));
    }

    @GetMapping("/today")
    public ResponseEntity<List<TaskResponse>> getAllByFinishDate(){
        return ResponseEntity.ok(service.getAllByFinishDate());
    }

    @Override
    @GetMapping("")
    public ResponseEntity<List<TaskResponse>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @Override
    @PostMapping("")
    public ResponseEntity<TaskResponse> add(@RequestBody TaskRequest request) {
        return ResponseEntity.ok(service.save(request));
    }

    @Override
    @PutMapping("/{id}")
    public ResponseEntity<TaskResponse> update(@PathVariable String id, @RequestBody TaskRequest request) {
        return ResponseEntity.ok(service.update(request, id));
    }

    @Override
    @DeleteMapping("/{id}")
    public ResponseEntity<TaskResponse> delete(@PathVariable String id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
