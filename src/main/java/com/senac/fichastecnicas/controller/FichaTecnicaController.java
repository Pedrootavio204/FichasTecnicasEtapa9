
package com.senac.fichastecnicas.controller;

import com.senac.fichastecnicas.model.FichaTecnica;
import com.senac.fichastecnicas.repository.ProdutoRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/produtos")
public class FichaTecnicaController {

    private final ProdutoRepository produtoRepository;

    public FichaTecnicaController(
            ProdutoRepository produtoRepository) {
        this.produtoRepository = produtoRepository;
    }

    @PutMapping("/{id}/ficha")
    public ResponseEntity<FichaTecnica> salvarFicha(
            @PathVariable Long id,
            @RequestBody FichaTecnica dados) {

        return produtoRepository.findById(id).map(produto -> {

            FichaTecnica ficha = produto.getFichaTecnica();

            if (ficha == null) {
                ficha = new FichaTecnica();
            }

            ficha.setComposicaoTecido(dados.getComposicaoTecido());
            ficha.setTipoCostura(dados.getTipoCostura());
            ficha.setProcessoFabricacao(dados.getProcessoFabricacao());

            produto.setFichaTecnica(ficha);
            produtoRepository.save(produto);

            return ResponseEntity.ok(ficha);

        }).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
