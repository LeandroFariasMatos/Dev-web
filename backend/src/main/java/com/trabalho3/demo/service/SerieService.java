package com.trabalho3.demo.service;

import com.trabalho3.demo.exception.EntidadeDestacadaException;
import com.trabalho3.demo.exception.EntidadeNaoEncontradaException;
import com.trabalho3.demo.exception.EntidadeTransienteException;
import com.trabalho3.demo.model.Avaliacao;
import com.trabalho3.demo.model.Filme;
import com.trabalho3.demo.model.Serie;
import com.trabalho3.demo.repository.AvaliacaoRepository;
import com.trabalho3.demo.repository.SerieRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SerieService {

    @Autowired
    private SerieRepository serieRepository;

    @Autowired
    private AvaliacaoRepository avaliacaoRepository;

    public List<Serie> recuperarSeries(){
        return serieRepository.findAll();
    }

    public Serie cadastrarSerie(Serie serie){
        if(serie.getId() == null){
            return serieRepository.save(serie);
        }else{
            throw new EntidadeDestacadaException("Tentando cadastrar um objeto destacado.");
        }
    }

    @Transactional
    public Serie alterarSerie(Serie serie){
        if (serie.getId() == null) {
            throw new EntidadeTransienteException("Tentando alterar um objeto transiente.");
        }
        else {
            serieRepository.recuperarPorIdComLock(serie.getId())
                    .orElseThrow(() -> new EntidadeNaoEncontradaException(
                            "Serie número " + serie.getId() + " não encontrado."));
            return serieRepository.save(serie);
        }
    }

    public void removerSerie(Long id) {
        Serie s = serieRepository.findById(id)
                .orElseThrow(() -> new EntidadeNaoEncontradaException(
                        "Serie número " + id + " não encontrado."));

        List<Avaliacao> avaliacoes = avaliacaoRepository.findAllByIdSerie(s.getId());
        avaliacaoRepository.deleteAll(avaliacoes);
        serieRepository.delete(s);
    }

    public Page<Serie> recuperarSeriesComPaginacao(String nome, Pageable pageable) {
        return serieRepository.recuperarSeriesComPaginacao(nome, pageable);
    }

    public Serie recuperarSerieById(Long id) {
        return serieRepository.findById(id).orElseThrow(() -> new EntidadeNaoEncontradaException(
                "Serie número " + id + " não encontrado."));
    }
}
