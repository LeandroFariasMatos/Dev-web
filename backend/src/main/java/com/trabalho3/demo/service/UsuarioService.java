package com.trabalho3.demo.service;

import com.trabalho3.demo.exception.EntidadeDestacadaException;
import com.trabalho3.demo.model.Role;
import com.trabalho3.demo.model.Usuario;
import com.trabalho3.demo.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario cadastrarUsuario(Usuario usuario){
        if(usuario.getId() == null){
            usuario.setRole(Role.USER);
            return usuarioRepository.save(usuario);
        }else{
            throw new EntidadeDestacadaException("Tentando cadastrar um objeto destacado.");
        }
    }

    public Usuario cadastrarAdmin(Usuario usuario){
        if(usuario.getId() == null){
            usuario.setRole(Role.ADMIN);
            return usuarioRepository.save(usuario);
        }else{
            throw new EntidadeDestacadaException("Tentando cadastrar um objeto destacado.");
        }
    }

    public Usuario logarUsuario(Usuario usuario){
        Usuario usuarioCadastrado = usuarioRepository.findUsuarioByEmail(usuario.getEmail());
        System.out.println(usuarioCadastrado);
        if(usuarioCadastrado != null){
            if(Objects.equals(usuario.getSenha(), usuarioCadastrado.getSenha())){
                return usuarioCadastrado;

            }else{
                throw new EntidadeDestacadaException("Senha incorretos");
            }
        }else{
            throw new EntidadeDestacadaException("email incorretos");
        }
    }
}
