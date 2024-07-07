package com.trabalho3.demo.controller;

import com.trabalho3.demo.model.Filme;
import com.trabalho3.demo.model.ResultadoPaginado;
import com.trabalho3.demo.model.Serie;
import com.trabalho3.demo.service.SerieService;
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
@RequestMapping("series")
public class SerieController {

    @Autowired
    private SerieService serieService;

    @GetMapping
    public List<Serie> recuperarSeries(){
        return serieService.recuperarSeries();
    }

    @PostMapping
    public Serie cadastrarSerie(@RequestBody Serie serie){
        return serieService.cadastrarSerie(serie);
    }

    @PutMapping
    public ResponseEntity<Serie> alterarSerie(@RequestBody Serie serie) {
        Serie umSerie = serieService.alterarSerie(serie);
        return new ResponseEntity<Serie>(umSerie, HttpStatus.OK);
    }

    @DeleteMapping ("{idSerie}")     // http://localhost:8080/series/1
    public void removerSerie(@PathVariable("idSerie") Long id) {
        serieService.removerSerie(id);
    }

    @GetMapping("paginacao")
    public ResultadoPaginado<Serie> recuperarSeriesComPaginacao(
            @RequestParam(value = "pagina", defaultValue = "0") int pagina,
            @RequestParam(value = "tamanho", defaultValue = "3") int tamanho,
            @RequestParam(value = "nome", defaultValue = "") String nome) {
        Pageable pageable = PageRequest.of(pagina, tamanho);
        Page<Serie> page = serieService.recuperarSeriesComPaginacao(nome, pageable);
        ResultadoPaginado<Serie> resultadoPaginado = new ResultadoPaginado<>(
                page.getTotalElements(),
                page.getTotalPages(),
                page.getNumber(),
                page.getContent());
        return resultadoPaginado;
    }

    @GetMapping("/SerieById/{id}")
    public Serie recuperarSerieById(@PathVariable("id") Long id){
        return serieService.recuperarSerieById(id);

    }
}
