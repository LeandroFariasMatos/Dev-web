package com.trabalho3.demo.repository;

import com.trabalho3.demo.model.Filme;
import jakarta.persistence.LockModeType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface FilmeRepository extends JpaRepository<Filme, Long> {

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("select f from Filme f where f.id = :id")
    Optional<Filme> recuperarPorIdComLock(Long id);

    @Query(
            value = "select f from Filme f " +
                    "where f.nome like %:nome% " +
                    "order by f.id",
            countQuery = "select count(f) " +
                    "from Filme f " +
                    "where f.nome like %:nome% "
    )
    Page<Filme> recuperarFilmesComPaginacao(String nome, Pageable pageable);
}
