
package com.senac.fichastecnicas.controller;

import com.senac.fichastecnicas.model.Produto;
import com.senac.fichastecnicas.repository.ProdutoRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/produtos")
public class ProdutoController {

    private final ProdutoRepository repository;

    public ProdutoController(ProdutoRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Produto> listar(
            @RequestParam(required = false) String busca) {

        if (busca != null && !busca.isBlank()) {
            return repository.findByNomeContainingIgnoreCase(busca);
        }

        return repository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Produto> buscarPorId(@PathVariable Long id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Produto cadastrar(@RequestBody Produto produto) {
        produto.setId(null);
        return repository.save(produto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Produto> atualizar(
            @PathVariable Long id,
            @RequestBody Produto dados) {

        return repository.findById(id).map(produto -> {
            produto.setNome(dados.getNome());
            produto.setCategoria(dados.getCategoria());
            produto.setTipoTecido(dados.getTipoTecido());
            produto.setData(dados.getData());
            produto.setObservacoes(dados.getObservacoes());

            return ResponseEntity.ok(repository.save(produto));
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {

        if (!repository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
