package com.trabalho3.demo.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;

@ToString
@Getter
@Setter
@NoArgsConstructor
@Entity
public class Serie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String descricao;
    private Integer temporadas;
    private Integer episodios;
    private Categoria categoria;
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate dataDeLancamento;

    public Serie(String nome, String descricao, Integer temporadas, Integer episodios, Categoria categoria, LocalDate dataDeLancamento) {
        this.nome = nome;
        this.descricao = descricao;
        this.temporadas = temporadas;
        this.episodios = episodios;
        this.categoria = categoria;
        this.dataDeLancamento = dataDeLancamento;
    }
}
