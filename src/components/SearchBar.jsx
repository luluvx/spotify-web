import axios from "axios";
import {  useState } from "react";
import { Container, Row, Col,  Form, FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import './SearchBar.css';


const SearchBar = () => {

    const navigate = useNavigate();

    const [nombreBuscar, setNombreBuscar] = useState('');
    const [resultadosBusqueda, setResultadosBusqueda] = useState({
        artistas: [],
        albumes: [],
        canciones: [],
    });

    const empezarBusqueda = async (e) => {
        const nombre = e.target.value;
        setNombreBuscar(nombre);

        if(nombre){
            axios.get(`http://localhost:3000/search?nombre=${nombre}`)
            .then(res => {
                setResultadosBusqueda(res.data);
            })
            .catch(err => {
                console.log(err);
            });

        }else{
            setResultadosBusqueda({
                artistas: [],
                albumes: [],
                canciones: [],
            });
        }
        

    }
    const llevarAAlbum = (e) => {
        const id = e.target.id;
        getAlbumById(id);
    };

    const llevarCancion = (e) => {
        const id = e.target.id;
        getCancionById(id);
    };
    
    const getAlbumById = async (id) => {
        try {
            const res = await axios.get(`http://localhost:3000/albumes/${id}`);
            const album = res.data;
            navigate(`/artistas/${album.artista.id}/detail#album-${album.id}`);
        } catch (err) {
            console.log(err);
        }
    };

    const getCancionById = async (id
    ) => {
        try {
            const res = await axios.get(`http://localhost:3000/canciones/${id}`);
            const cancion = res.data;
            navigate(`/artistas/${cancion.album.artista.id}/detail#cancion-${cancion.id}`);
        } catch (err) {
            console.log(err);
        }
    }
    


    return (
        <>
        <Container >
                <Row style={{position:'relative'}}>
                    <Col md={12}>
                        <Form>
                            <FormControl
                            id="buscador"
                            type="text"
                            placeholder="Buscar"
                            className="mr-sm-2"
                            value={nombreBuscar}
                            onChange={empezarBusqueda}
                            />
                        </Form>
                        {nombreBuscar && (
                            <ListGroup className="menu-desplegable">
                                {resultadosBusqueda.artistas.map(artista => (
                                    <ListGroupItem
                                        className="item-busqueda"
                                        key={artista.id}
                                        action
                                        onClick={() => navigate("/admin/artistas/edit/" + artista.id)}
                                    >
                                        {artista.nombre}
                                    </ListGroupItem>
                                ))}
                                {resultadosBusqueda.albumes.map(album => (
                                    <ListGroupItem
                                        id={album.id}
                                        className="item-busqueda"
                                        key={album.id}
                                        action
                                        onClick={llevarAAlbum}
                                    >
                                        {album.titulo}
                                    </ListGroupItem>
                                ))}
                                {resultadosBusqueda.canciones.map(cancion => (
                                    <ListGroupItem
                                        id={cancion.id}
                                        className="item-busqueda"
                                        key={cancion.id}
                                        action
                                        onClick={llevarCancion}
                                    >
                                        {cancion.titulo}
                                    </ListGroupItem>
                                ))}
                            </ListGroup>
                        )}
                    </Col>
                </Row>
        </Container>
        </>
    );
}

export default SearchBar;