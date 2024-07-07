package com.trabalho3.demo.controller;

import com.trabalho3.demo.model.Filme;
import com.trabalho3.demo.model.ResultadoPaginado;
import com.trabalho3.demo.model.Serie;
import com.trabalho3.demo.service.FilmeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("filmes")
public class FilmeController {
    @Autowired
    private FilmeService filmeService;

    @GetMapping
    public List<Filme> recuperaFilmes() {
        return filmeService.recuperarFilmes();
    }

    @PostMapping
    public Filme cadastrarFilme(@RequestBody Filme filme) {
        return filmeService.cadastrarFilme(filme);
    }

    @PutMapping
    public ResponseEntity<Filme> alterarFilme(@RequestBody Filme filme) {
        Filme umFilme = filmeService.alterarFilme(filme);
        return new ResponseEntity<Filme>(umFilme, HttpStatus.OK);
    }

    @DeleteMapping ("{idFilme}")     // http://localhost:8080/filmes/1
    public void removerFilme(@PathVariable("idFilme") Long id) {
        filmeService.removerFilme(id);
    }

    @GetMapping("paginacao")
    public ResultadoPaginado<Filme> recuperarFilmesComPaginacao(
            @RequestParam(value = "pagina", defaultValue = "0") int pagina,
            @RequestParam(value = "tamanho", defaultValue = "3") int tamanho,
            @RequestParam(value = "nome", defaultValue = "") String nome) {
        Pageable pageable = PageRequest.of(pagina, tamanho);
        Page<Filme> page = filmeService.recuperarFilmesComPaginacao(nome, pageable);
        ResultadoPaginado<Filme> resultadoPaginado = new ResultadoPaginado<>(
                page.getTotalElements(),
                page.getTotalPages(),
                page.getNumber(),
                page.getContent());
        return resultadoPaginado;
    }

    @GetMapping("/FilmeById/{id}")
    public Filme recuperarFilmeById(@PathVariable("id") Long id){
        return filmeService.recuperarFilmeById(id);

    }
}
