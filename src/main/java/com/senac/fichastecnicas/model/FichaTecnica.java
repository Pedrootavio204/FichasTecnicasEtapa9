
package com.senac.fichastecnicas.model;

import jakarta.persistence.*;

@Entity
@Table(name = "ficha_tecnica")
public class FichaTecnica {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_ficha_tecnica")
    private Integer id;

    @Column(name = "composicao_tecido")
    private String composicaoTecido;

    @Column(name = "tipo_costura")
    private String tipoCostura;

    @Column(name = "processo_fabricacao")
    private String processoFabricacao;

    public FichaTecnica() {
    }

    public Integer getId() {
      return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getComposicaoTecido() {
        return composicaoTecido;
    }

    public void setComposicaoTecido(String composicaoTecido) {
        this.composicaoTecido = composicaoTecido;
    }

    public String getTipoCostura() {
        return tipoCostura;
    }

    public void setTipoCostura(String tipoCostura) {
        this.tipoCostura = tipoCostura;
    }

    public String getProcessoFabricacao() {
        return processoFabricacao;
    }

    public void setProcessoFabricacao(String processoFabricacao) {
        this.processoFabricacao = processoFabricacao;
    }
}
