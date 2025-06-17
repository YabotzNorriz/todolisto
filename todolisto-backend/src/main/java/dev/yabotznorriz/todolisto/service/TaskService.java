package dev.yabotznorriz.todolisto.service;

import dev.yabotznorriz.todolisto.model.Task;
import dev.yabotznorriz.todolisto.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class TaskService {
    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public List<Task> getCompletedTasks() {
        return taskRepository.findByCompletado(true);
    }

    public List<Task> getPendingTasks() {
        return taskRepository.findByCompletado(false);
    }

    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    public Task updateTask(Long id, Task taskDetails) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setTitulo(taskDetails.getTitulo());
        task.setDescricao(taskDetails.getDescricao());
        task.setCompletado(taskDetails.isCompletado());
        task.setDataVencimento(taskDetails.getDataVencimento());

        return taskRepository.save(task);
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    public Task toggleTaskCompletion(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setCompletado(!task.isCompletado());
        LocalDateTime dataAgora = LocalDateTime.now();
        task.setDataVencimento(dataAgora);
        return taskRepository.save(task);
    }

    public Optional<Task> getTaskById(Long id) {
        return taskRepository.findById(id);
    }
}
