package com.trabalho3.demo.service;

import com.trabalho3.demo.exception.EntidadeDestacadaException;
import com.trabalho3.demo.exception.EntidadeNaoEncontradaException;
import com.trabalho3.demo.exception.EntidadeTransienteException;
import com.trabalho3.demo.model.Avaliacao;
import com.trabalho3.demo.model.Filme;
import com.trabalho3.demo.model.Serie;
import com.trabalho3.demo.repository.AvaliacaoRepository;
import com.trabalho3.demo.repository.FilmeRepository;
import com.trabalho3.demo.repository.SerieRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AvaliacaoService {

    @Autowired
    private AvaliacaoRepository avaliacaoRepository;

    @Autowired
    private SerieRepository serieRepository;

    @Autowired
    private FilmeRepository filmeRepository;

    public List<Avaliacao> recuperarAvaliacoes(){
        return avaliacaoRepository.findAll();
    }

    public Avaliacao cadastrarAvaliacao(Avaliacao avaliacao){
        if(avaliacao.getId() == null){
            if(!avaliacao.getTipo()){
                if(filmeRepository.findById(avaliacao.getId_tipo()).isPresent()){
                    return avaliacaoRepository.save(avaliacao);
                }else{
                    throw new EntidadeDestacadaException("Tentando cadastrar um objeto destacado.");
                }
            }else{
                if(serieRepository.findById(avaliacao.getId_tipo()).isPresent()){
                    return avaliacaoRepository.save(avaliacao);
                }else{
                    throw new EntidadeDestacadaException("Tentando cadastrar um objeto destacado.");
                }
            }

        }else{
            throw new EntidadeDestacadaException("Tentando cadastrar um objeto destacado.");
        }
    }

    @Transactional
    public Avaliacao alterarAvaliacao(Avaliacao avaliacao){
        if (avaliacao.getId() == null) {
            throw new EntidadeTransienteException("Tentando alterar um objeto transiente.");
        }
        else {
            avaliacaoRepository.recuperarPorIdComLock(avaliacao.getId())
                    .orElseThrow(() -> new EntidadeNaoEncontradaException(
                            "Avaliacao número " + avaliacao.getId() + " não encontrado."));
            return avaliacaoRepository.save(avaliacao);
        }
    }

    public void removerAvaliacao(Long id) {
        Avaliacao a = avaliacaoRepository.findById(id)
                .orElseThrow(() -> new EntidadeNaoEncontradaException(
                        "Avaliacao número " + id + " não encontrado."));
        avaliacaoRepository.delete(a);
    }

    public List<Avaliacao> recuperarAvaliacoesFilmeById(Long id){
        if(filmeRepository.findById(id).isPresent()){
            return avaliacaoRepository.recuperarAvaliacoesFilmeById(id);
        }else{
            throw new EntidadeNaoEncontradaException(
                    "Filme número " + id + " não encontrado."
            );
        }
    }

    public List<Avaliacao> recuperarAvaliacoesSerieById(Long id){
        if(serieRepository.findById(id).isPresent()){
            return avaliacaoRepository.recuperarAvaliacoesSerieById(id);
        }else{
            throw new EntidadeNaoEncontradaException(
                    "Serie número " + id + " não encontrado."
            );
        }
    }

    public Page<Avaliacao> recuperarAvaliacoesFilmesComPaginacao(Long id, Pageable pageable) {
        return avaliacaoRepository.recuperarAvaliacoesFilmesComPaginacao(id, pageable);
    }

    public Page<Avaliacao> recuperarAvaliacoesSeriesComPaginacao(Long id, Pageable pageable) {
        return avaliacaoRepository.recuperarAvaliacoesSeriesComPaginacao(id, pageable);
    }
}
