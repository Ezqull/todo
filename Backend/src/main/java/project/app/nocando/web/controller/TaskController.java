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
@CrossOrigin("http://localhost:5173")
@RequestMapping("/task")
public class TaskController implements BaseController<TaskRequest, TaskResponse> {

    private final TaskService service;

    @Override
    @GetMapping("/{id}")
    public ResponseEntity<TaskResponse> getById(@PathVariable String id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping("/finishDate")
    public ResponseEntity<List<TaskResponse>> getAllByFinishDate(@RequestBody LocalDate finishDate){
        return ResponseEntity.ok(service.getAllByFinishDate(finishDate));
    }

    @GetMapping("/today/{email}")
    public ResponseEntity<List<TaskResponse>> getTodaysTasks(@PathVariable String email){
        return ResponseEntity.ok(service.getTodaysTasks(email));
    }

    @GetMapping("/today/all/{email}")
    public ResponseEntity<List<TaskResponse>> getAllTasksForToday(@PathVariable String email){
        return ResponseEntity.ok(service.getAllTasksForToday(email));
    }

    @GetMapping("/archived/{email}")
    public ResponseEntity<List<TaskResponse>> getAllArchived(@PathVariable String email) {
        return ResponseEntity.ok(service.getAllArchived(email));
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

    @PostMapping("/period/{email}")
    public ResponseEntity<List<TaskResponse>> getTaskDatePeriod(@RequestBody TaskPeriodRequest request, @PathVariable String email){
        return ResponseEntity.ok(service.getTaskDatePeriod(request, email));
    }

    @PostMapping("/finish/{email}")
    public ResponseEntity<List<TaskResponse>> getFinishDatePeriod(@RequestBody TaskPeriodRequest request, @PathVariable String email){
        return ResponseEntity.ok(service.getFinishDatePeriod(request, email));
    }

    @Override
    @PatchMapping("/{id}")
    public ResponseEntity<TaskResponse> update(@RequestBody TaskRequest request, @PathVariable String id) {
        System.out.println(request);
        return ResponseEntity.ok(service.update(request, id));
    }

    @PatchMapping("/archive/{id}")
    public ResponseEntity<TaskResponse> finishTask(@PathVariable String id) {
        return ResponseEntity.ok(service.finishTask(id));
    }
    @PatchMapping("/unarchive")
    public ResponseEntity<List<TaskResponse>> unarchiveTasks(@RequestBody List<TaskRequest> request) {
        return ResponseEntity.ok(service.unarchiveTasks(request));
    }

    @Override
    @DeleteMapping("/{id}")
    public ResponseEntity<TaskResponse> delete(@PathVariable String id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
