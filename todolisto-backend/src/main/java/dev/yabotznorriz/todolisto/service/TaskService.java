package dev.yabotznorriz.todolisto.service;

import dev.yabotznorriz.todolisto.model.Task;
import dev.yabotznorriz.todolisto.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

/**
 * Camada de serviço que contém a lógica de negócios para as operações de tarefas.
 */
@Service
public class TaskService {
    private final TaskRepository taskRepository;

    /**
     * Construtor para injeção de dependência do TaskRepository.
     * @param taskRepository O repositório de tarefas.
     */
    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    /**
     * Retorna todas as tarefas.
     * @return Lista de todas as tarefas.
     */
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    /**
     * Retorna apenas as tarefas concluídas.
     * @return Lista de tarefas concluídas.
     */
    public List<Task> getCompletedTasks() {
        return taskRepository.findByCompletado(true);
    }

    /**
     * Retorna apenas as tarefas pendentes.
     * @return Lista de tarefas pendentes.
     */
    public List<Task> getPendingTasks() {
        return taskRepository.findByCompletado(false);
    }

    /**
     * Cria uma nova tarefa.
     * @param task O objeto Task a ser criado.
     * @return A tarefa criada e salva no banco de dados.
     */
    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    /**
     * Atualiza uma tarefa existente.
     * @param id O ID da tarefa a ser atualizada.
     * @param taskDetails Os novos detalhes da tarefa.
     * @return A tarefa atualizada.
     * @throws RuntimeException se a tarefa não for encontrada.
     */
    public Task updateTask(Long id, Task taskDetails) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setTitulo(taskDetails.getTitulo());
        task.setDescricao(taskDetails.getDescricao());
        task.setCompletado(taskDetails.isCompletado());
        task.setDataVencimento(taskDetails.getDataVencimento());

        return taskRepository.save(task);
    }

    /**
     * Deleta uma tarefa.
     * @param id O ID da tarefa a ser deletada.
     */
    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    /**
     * Alterna o status de conclusão de uma tarefa.
     * @param id O ID da tarefa.
     * @return A tarefa com o status alterado.
     * @throws RuntimeException se a tarefa não for encontrada.
     */
    public Task toggleTaskCompletion(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setCompletado(!task.isCompletado());
        LocalDateTime dataAgora = LocalDateTime.now();
        task.setDataVencimento(dataAgora);
        return taskRepository.save(task);
    }

    /**
     * Busca uma tarefa pelo seu ID.
     * @param id O ID da tarefa.
     * @return Um Optional contendo a tarefa, se encontrada.
     */
    public Optional<Task> getTaskById(Long id) {
        return taskRepository.findById(id);
    }
}
