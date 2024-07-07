package com.trabalho3.demo.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
@NoArgsConstructor
@Entity
public class Avaliacao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String comentario;
    private Boolean tipo;
    // 0 eh filme e 1 eh serie
    private float nota;
    private Long id_tipo;

    public Avaliacao(String comentario, Boolean tipo, float nota, Long id_tipo) {
        this.comentario = comentario;
        this.tipo = tipo;
        this.nota = nota;
        this.id_tipo = id_tipo;
    }
}
