package com.trabalho3.demo.controller;

import com.trabalho3.demo.model.Serie;
import com.trabalho3.demo.model.Usuario;
import com.trabalho3.demo.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("usuario")
public class UsuarioController {
    @Autowired
    private UsuarioService usuarioService;
    @PostMapping("cadastro")
    public Usuario cadastrarUsuario(@RequestBody Usuario usuario){

        return usuarioService.cadastrarUsuario(usuario);
    }

    @PostMapping("cadastroAdmin")
    public Usuario cadastrarAdmin(@RequestBody Usuario usuario){

        return usuarioService.cadastrarAdmin(usuario);
    }

    @PostMapping("login")
    public Usuario logarUsuario(@RequestBody Usuario usuario){
        return usuarioService.logarUsuario(usuario);
    }
}
