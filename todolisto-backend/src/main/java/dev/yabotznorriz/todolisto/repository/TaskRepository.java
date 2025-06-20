package dev.yabotznorriz.todolisto.repository;

import dev.yabotznorriz.todolisto.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Interface de repositório para a entidade Task.
 * Estende JpaRepository para fornecer operações CRUD padrão.
 */
public interface TaskRepository extends JpaRepository<Task, Long> {

    /**
     * Busca todas as tarefas com base no seu status de conclusão.
     * O Spring Data JPA implementa este método automaticamente com base no nome.
     * @param completado true para tarefas completas, false para pendentes.
     * @return Uma lista de tarefas que correspondem ao status.
     */
    List<Task> findByCompletado(boolean completado);

    /**
     * Busca tarefas cujo título contenha uma determinada string, ignorando maiúsculas e minúsculas.
     * @param titulo A string a ser procurada no título da tarefa.
     * @return Uma lista de tarefas correspondentes.
     */
    List<Task> findByTituloContainingIgnoreCase(String titulo);
}
