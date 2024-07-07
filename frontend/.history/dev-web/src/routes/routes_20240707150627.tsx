import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom"
import { Home } from "../pages/Home"
import Filmes from "../pages/Filmes"
import Series from "../pages/Series"
import Filme from "../pages/Filme"
import Serie from "../pages/Serie"
import AvaliarFilme  from "../pages/AvaliarFilme"
import AvaliarSerie  from "../pages/AvaliarSerie"
import Login from "../pages/Login"
import Cadastro from "../pages/Cadastro"
import { useEffect } from "react"

export const AppRoutes = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/login');
    }, [navigate]);
    
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/Home' element={<Home />}></Route>
                <Route path='/Filmes' element={<Filmes />}></Route>
                <Route path='/Series' element={<Series />}></Route>
                <Route path="/Filme/:id" element={<Filme />}></Route>
                <Route path="/Serie/:id" element={<Serie />}></Route>
                <Route path="/Avaliar/Filme/:id" element={<AvaliarFilme />}></Route>
                <Route path="/Avaliar/Serie/:id" element={<AvaliarSerie />}></Route>
                <Route path="/" element={<Home />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Cadastro" element={<Cadastro />} />
            </Routes>
        </BrowserRouter>
    )
}