package dev.yabotznorriz.todolisto.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "task")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String grupo;
    private String titulo;
    private String descricao;
    private boolean completado;
    private LocalDateTime dataCriada;
    private LocalDateTime dataCompleta;
    private LocalDateTime dataVencimento;

    public Long getId() {
        return id;
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

    public void setId(Long id) {
        this.id = id;
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
