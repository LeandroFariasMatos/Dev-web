package com.trabalho3.demo.service;

import com.trabalho3.demo.exception.EntidadeDestacadaException;
import com.trabalho3.demo.exception.EntidadeNaoEncontradaException;
import com.trabalho3.demo.exception.EntidadeTransienteException;
import com.trabalho3.demo.model.Avaliacao;
import com.trabalho3.demo.model.Filme;
import com.trabalho3.demo.model.Serie;
import com.trabalho3.demo.repository.AvaliacaoRepository;
import com.trabalho3.demo.repository.FilmeRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FilmeService {

    @Autowired
    private FilmeRepository filmeRepository;

    @Autowired
    private AvaliacaoRepository avaliacaoRepository;

    public List<Filme> recuperarFilmes() {
        return filmeRepository.findAll();
    }

    public Filme cadastrarFilme(Filme filme){
        if(filme.getId() == null){
            return filmeRepository.save(filme);
        }else{
            throw new EntidadeDestacadaException("Tentando cadastrar um objeto destacado.");
        }
    }

    @Transactional
    public Filme alterarFilme(Filme filme){
        if (filme.getId() == null) {
            throw new EntidadeTransienteException("Tentando alterar um objeto transiente.");
        }
        else {
            filmeRepository.recuperarPorIdComLock(filme.getId())
                    .orElseThrow(() -> new EntidadeNaoEncontradaException(
                            "Filme número " + filme.getId() + " não encontrado."));
            return filmeRepository.save(filme);
        }
    }

    public void removerFilme(Long id) {
        Filme f = filmeRepository.findById(id)
                .orElseThrow(() -> new EntidadeNaoEncontradaException(
                        "Filme número " + id + " não encontrado."));

        List<Avaliacao> avaliacoes = avaliacaoRepository.findAllByIdFilme(f.getId());
        avaliacaoRepository.deleteAll(avaliacoes);
        filmeRepository.delete(f);
    }

    public Page<Filme> recuperarFilmesComPaginacao(String nome, Pageable pageable) {
        return filmeRepository.recuperarFilmesComPaginacao(nome, pageable);
    }

    public Filme recuperarFilmeById(Long id) {
        return filmeRepository.findById(id).orElseThrow(() -> new EntidadeNaoEncontradaException(
                "Filme número " + id + " não encontrado."));
    }
}
