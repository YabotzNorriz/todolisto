package dev.yabotznorriz.todolisto.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "task")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="task_id",nullable = false,insertable = false)
    private Long taskId;

    @Column(name="grupo", nullable = true)
    private String grupo;

    @Column(name = "titulo", nullable = false)
    private String titulo;

    @Column(name="descricao", nullable = false)
    private String descricao;

    @Column(name="completado", nullable = false)
    private boolean completado;

    @Column(name="data_criada", nullable = false)
    private LocalDateTime dataCriada;

    @Column(name="data_vencimento", nullable = false)
    private LocalDateTime dataVencimento;

    @Column(name="data_completa", nullable = true, columnDefinition = "True")
    private LocalDateTime dataCompleta;

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

    @PrePersist
    protected void onCreate() {
        dataCriada = LocalDateTime.now();
    }
}
