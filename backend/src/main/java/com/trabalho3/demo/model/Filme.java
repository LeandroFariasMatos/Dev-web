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
public class Filme {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String descricao;
    private Integer duracao;
    private Categoria categoria;
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate dataDeLancamento;


    public Filme(String nome, String descricao, Integer duracao,Categoria categoria, LocalDate dataDeLancamento) {
        this.nome = nome;
        this.descricao = descricao;
        this.duracao = duracao;
        this.categoria = categoria;
        this.dataDeLancamento = dataDeLancamento;
    }
}
