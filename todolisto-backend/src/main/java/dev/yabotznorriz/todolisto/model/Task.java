package dev.yabotznorriz.todolisto.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

/**
 * Entidade que representa uma tarefa na aplicação.
 * Mapeada para a tabela "task" no banco de dados.
 */
@Entity
@Table(name = "task")
public class Task {

    /**
     * Identificador único da tarefa.
     * Gerado automaticamente pelo banco de dados.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="task_id",nullable = false,insertable = false)
    private Long taskId;

    /**
     * Grupo ou categoria ao qual a tarefa pertence. Pode ser nulo.
     */
    @Column(name="grupo", nullable = true)
    private String grupo;

    /**
     * Título da tarefa. Campo obrigatório.
     */
    @Column(name = "titulo", nullable = false)
    private String titulo;

    /**
     * Descrição detalhada da tarefa. Campo obrigatório.
     */
    @Column(name="descricao", nullable = false)
    private String descricao;

    /**
     * Indica se a tarefa foi concluída.
     */
    @Column(name="completado", nullable = false)
    private boolean completado;

    /**
     * Data e hora em que a tarefa foi criada.
     * Preenchido automaticamente antes da persistência.
     */
    @Column(name="data_criada", nullable = false)
    private LocalDateTime dataCriada;

    /**
     * Prazo final para a conclusão da tarefa. Campo obrigatório.
     */
    @Column(name="data_vencimento", nullable = false)
    private LocalDateTime dataVencimento;

    /**
     * Data e hora em que a tarefa foi concluída. Pode ser nulo se a tarefa estiver pendente.
     */
    @Column(name="data_completa", nullable = true, columnDefinition = "True")
    private LocalDateTime dataCompleta;

    // Getters e Setters
    public Long getTaskId() {
        return taskId;
    }

    public String getGrupo() {
        return grupo;
    }

    public String getTitulo() {
        return titulo;
    }

    public String getDescricao() {
        return descricao;
    }

    public boolean isCompletado() {
        return completado;
    }

    public LocalDateTime getDataCriada() {
        return dataCriada;
    }

    public LocalDateTime getDataCompleta() {
        return dataCompleta;
    }

    public LocalDateTime getDataVencimento() {
        return dataVencimento;
    }

    public void setTaskId(Long taskId) {
        this.taskId = taskId;
    }

    public void setGrupo(String grupo) {
        this.grupo = grupo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public void setCompletado(boolean completado) {
        this.completado = completado;
    }

    public void setDataCriada(LocalDateTime dataCriada) {
        this.dataCriada = dataCriada;
    }

    public void setDataCompleta(LocalDateTime dataCompleta) {
        this.dataCompleta = dataCompleta;
    }

    public void setDataVencimento(LocalDateTime dataVencimento) {
        this.dataVencimento = dataVencimento;
    }

    /**
     * Método de callback do JPA.
     * É executado antes de uma nova entidade ser salva no banco de dados.
     * Define a data de criação da tarefa.
     */
    @PrePersist
    protected void onCreate() {
        dataCriada = LocalDateTime.now();
    }
}
