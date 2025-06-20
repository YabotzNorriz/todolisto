package dev.yabotznorriz.todolisto.controller;

import dev.yabotznorriz.todolisto.model.Task;
import dev.yabotznorriz.todolisto.repository.TaskRepository;
import dev.yabotznorriz.todolisto.service.TaskService;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

/**
 * Controlador REST para gerenciar as tarefas.
 * Define os endpoints da API para as operações CRUD de tarefas.
 */
@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    private final TaskService taskService;

    /**
     * Construtor para injeção de dependência do TaskService.
     * @param taskService O serviço de tarefas.
     */
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    /**
     * Endpoint para buscar todas as tarefas.
     * @return Uma lista de todas as tarefas.
     */
    @GetMapping
    public List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }

    /**
     * Endpoint para buscar apenas as tarefas concluídas.
     * @return Uma lista de tarefas concluídas.
     */
    @GetMapping("/completed")
    public List<Task> getCompletedTasks() {
        return taskService.getCompletedTasks();
    }

    /**
     * Endpoint para buscar apenas as tarefas pendentes.
     * @return Uma lista de tarefas pendentes.
     */
    @GetMapping("/pending")
    public List<Task> getPendingTasks() {
        return taskService.getPendingTasks();
    }

    /**
     * Endpoint para criar uma nova tarefa.
     * @param task A tarefa a ser criada, vinda do corpo da requisição.
     * @return A tarefa criada.
     */
    @PostMapping
    public Task createTask(@RequestBody Task task) {
        return taskService.createTask(task);
    }

    /**
     * Endpoint para atualizar uma tarefa existente.
     * @param id O ID da tarefa a ser atualizada.
     * @param taskDetails Os novos dados da tarefa.
     * @return A tarefa atualizada.
     */
    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task taskDetails) {
        return taskService.updateTask(id, taskDetails);
    }

    /**
     * Endpoint para deletar uma tarefa.
     * @param id O ID da tarefa a ser deletada.
     */
    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
    }

    /**
     * Endpoint para alternar o status de conclusão de uma tarefa.
     * @param id O ID da tarefa.
     * @return A tarefa com o status alterado.
     */
    @PatchMapping("/{id}/toggle")
    public Task toggleTaskCompletion(@PathVariable Long id) {
        return taskService.toggleTaskCompletion(id);
    }

    /**
     * Endpoint para buscar uma tarefa específica pelo ID.
     * @param id O ID da tarefa.
     * @return Um ResponseEntity com a tarefa (status 200 OK) ou não encontrado (status 404 Not Found).
     */
    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
        Optional<Task> task = taskService.getTaskById(id);
        return task.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
