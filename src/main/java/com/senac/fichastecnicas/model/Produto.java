
package com.senac.fichastecnicas.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "produto")
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_produto")
    private Integer id;

    @Column(nullable = false, length = 45)
    private String nome;

    @Column(nullable = false, length = 45)
    private String categoria;

    @Column(name = "tipo_tecido", nullable = false, length = 45)
    private String tipoTecido;

    @Column(name = "data_fechamento")
    private LocalDate data;

    @Column(length = 45)
    private String observacoes;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_ficha_tecnica")
    private FichaTecnica fichaTecnica;

    public Produto() {
    }

    public Integer getId() {
       return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public String getTipoTecido() {
        return tipoTecido;
    }

    public void setTipoTecido(String tipoTecido) {
        this.tipoTecido = tipoTecido;
    }

    public LocalDate getData() {
        return data;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public String getObservacoes() {
        return observacoes;
    }

    public void setObservacoes(String observacoes) {
        this.observacoes = observacoes;
    }

    public FichaTecnica getFichaTecnica() {
        return fichaTecnica;
    }

    public void setFichaTecnica(FichaTecnica fichaTecnica) {
        this.fichaTecnica = fichaTecnica;
    }
}
