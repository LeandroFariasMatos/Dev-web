package com.trabalho3.demo.repository;

import com.trabalho3.demo.model.Serie;
import jakarta.persistence.LockModeType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface SerieRepository extends JpaRepository<Serie, Long> {
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("select s from Serie s where s.id = :id")
    Optional<Object> recuperarPorIdComLock(Long id);


    @Query(
            value = "select s from Serie s " +
                    "where s.nome like %:nome% " +
                    "order by s.id",
            countQuery = "select count(s) " +
                    "from Serie s " +
                    "where s.nome like %:nome% "
    )
    Page<Serie> recuperarSeriesComPaginacao(String nome, Pageable pageable);
}
