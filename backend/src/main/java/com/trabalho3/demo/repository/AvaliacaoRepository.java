package com.trabalho3.demo.repository;

import com.trabalho3.demo.model.Avaliacao;
import jakarta.persistence.LockModeType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface AvaliacaoRepository extends JpaRepository<Avaliacao, Long> {

    @Query("SELECT a from Avaliacao a WHERE a.tipo = false and a.id_tipo = :id")
    List<Avaliacao> findAllByIdFilme(Long id);

    @Query("SELECT a from Avaliacao a WHERE a.tipo = true and a.id_tipo = :id")
    List<Avaliacao> findAllByIdSerie(Long id);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("select a from Avaliacao a where a.id = :id")
    Optional<Object> recuperarPorIdComLock(Long id);

    @Query("select a from Avaliacao a where a.tipo = false and a.id_tipo =:id")
    List<Avaliacao> recuperarAvaliacoesFilmeById(Long id);

    @Query("select a from Avaliacao a where a.tipo = true and a.id_tipo =:id")
    List<Avaliacao> recuperarAvaliacoesSerieById(Long id);

    @Query(
            value = "select a from Avaliacao a " +
                    "where a.tipo = false and a.id_tipo = :id " +
                    "order by a.id",
            countQuery = "select count(a) " +
                    "from Avaliacao a " +
                    "where a.id_tipo = :id  "
    )
    Page<Avaliacao> recuperarAvaliacoesFilmesComPaginacao(Long id, Pageable pageable);

    @Query(
            value = "select a from Avaliacao a " +
                    "where a.tipo = true and a.id_tipo = :id " +
                    "order by a.id",
            countQuery = "select count(a) " +
                    "from Avaliacao a " +
                    "where a.id_tipo = :id  "
    )
    Page<Avaliacao> recuperarAvaliacoesSeriesComPaginacao(Long id, Pageable pageable);


}



