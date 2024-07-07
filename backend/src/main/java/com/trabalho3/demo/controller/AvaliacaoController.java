package com.trabalho3.demo.controller;

import com.trabalho3.demo.model.Avaliacao;
import com.trabalho3.demo.model.Filme;
import com.trabalho3.demo.model.ResultadoPaginado;
import com.trabalho3.demo.model.Serie;
import com.trabalho3.demo.service.AvaliacaoService;
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
@RequestMapping("avaliacoes")
public class AvaliacaoController {

    @Autowired
    private AvaliacaoService avaliacaoService;

    @GetMapping
    public List<Avaliacao> recuperarAvaliacoes(){
        return avaliacaoService.recuperarAvaliacoes();
    }

    @PostMapping
    public Avaliacao cadastrarAvaliacao(@RequestBody Avaliacao avaliacao){
        return avaliacaoService.cadastrarAvaliacao(avaliacao);
    }

    @PutMapping
    public ResponseEntity<Avaliacao> alterarSerie(@RequestBody Avaliacao avaliacao) {
        Avaliacao umAvaliacao = avaliacaoService.alterarAvaliacao(avaliacao);
        return new ResponseEntity<Avaliacao>(umAvaliacao, HttpStatus.OK);
    }

    @DeleteMapping ("{idAvaliacao}")     // http://localhost:8080/avaliacoes/1
    public void removerAvaliacao(@PathVariable("idAvaliacao") Long id) {
        avaliacaoService.removerAvaliacao(id);
    }

    @GetMapping("filmes")
    public List<Avaliacao> recuperarAvaliacoesFilmeById(@RequestParam(value = "id") Long id){
        return avaliacaoService.recuperarAvaliacoesFilmeById(id);
    }

    @GetMapping("series")
    public List<Avaliacao> recuperarAvaliacoesSerieById(@RequestParam(value = "id") Long id){
        return avaliacaoService.recuperarAvaliacoesSerieById(id);
    }

    @GetMapping("paginacao/filmes")
    public ResultadoPaginado<Avaliacao> recuperarAvaliacoesFilmesComPaginacao(
            @RequestParam(value = "pagina", defaultValue = "0") int pagina,
            @RequestParam(value = "tamanho", defaultValue = "3") int tamanho,
            @RequestParam(value = "id", defaultValue = "") Long id) {
        Pageable pageable = PageRequest.of(pagina, tamanho);
        Page<Avaliacao> page = avaliacaoService.recuperarAvaliacoesFilmesComPaginacao(id, pageable);
        ResultadoPaginado<Avaliacao> resultadoPaginado = new ResultadoPaginado<>(
                page.getTotalElements(),
                page.getTotalPages(),
                page.getNumber(),
                page.getContent());
        return resultadoPaginado;
    }

    @GetMapping("paginacao/series")
    public ResultadoPaginado<Avaliacao> recuperarAvaliacoesSeriesComPaginacao(
            @RequestParam(value = "pagina", defaultValue = "0") int pagina,
            @RequestParam(value = "tamanho", defaultValue = "3") int tamanho,
            @RequestParam(value = "id", defaultValue = "") Long id) {
        Pageable pageable = PageRequest.of(pagina, tamanho);
        Page<Avaliacao> page = avaliacaoService.recuperarAvaliacoesSeriesComPaginacao(id, pageable);
        ResultadoPaginado<Avaliacao> resultadoPaginado = new ResultadoPaginado<>(
                page.getTotalElements(),
                page.getTotalPages(),
                page.getNumber(),
                page.getContent());
        return resultadoPaginado;
    }

}
