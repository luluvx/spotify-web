import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card, Col, Container, Form } from 'react-bootstrap';

const FormCancion = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const [titulo, setTitulo] = useState('');
    const [artistaId, setArtistaId] = useState('');
    const [artistaList, setArtistaList] = useState([]);
    const [albumId, setAlbumId] = useState('');
    const [albumListByArtistaId, setAlbumListByArtistaId] = useState([]); // Cambia a un nombre consistente

    const [validated, setValidated] = useState(false);

    useEffect(() => {
        if (id) getCancionById();
        getArtistaList();
    }, [id]);

    useEffect(() => {
        if (artistaId) getAlbumListByArtistaId();
    }, [artistaId]);

    const getArtistaList = async () => {
        try {
            const res = await axios.get('http://localhost:3000/artistas');
            setArtistaList(res.data);
        } catch (err) {
            console.error(err);
        }
    }

    const getAlbumListByArtistaId = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/artistas/${artistaId}/albums`);
            const albumList = res.data;
            
            setAlbumListByArtistaId(albumList);
        } catch (err) {
            console.error(err);
        }
    }

    const getCancionById = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/canciones/${id}`);
            const cancion = res.data;
            console.log(cancion);
            setTitulo(cancion.titulo);
            setArtistaId(cancion.album.artista.id);
            setAlbumId(cancion.album.id);
            setAlbumListByArtistaId([cancion.album]);
        } catch (err) {
            console.error(err);
        }
    }

    const onGuardarClick = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        setValidated(true);

        if (!form.checkValidity()) return;

        const cancion = { titulo, albumId: Number(albumId) };
        if(id){
            editCancion(cancion);
        }else{
            insertCancion(cancion);
        }
    }

    const insertCancion = async (cancion) => {
        try {
            await axios.post('http://localhost:3000/canciones', cancion);
            navigate('/admin/canciones');
        } catch (err) {
            console.error(err);
        }
    }

    const editCancion = async (cancion) => {
        try {
            await axios.put(`http://localhost:3000/canciones/${id}`, cancion);
            navigate('/admin/canciones');
        } catch (err) {
            console.error(err);
        }
    }

    const mostrarAlbumsPorArtista = (e) => {
        setArtistaId(e.target.value);

    }

    return (
        <Container>
            <Col md={8} className="text-center">
                <Card>
                    <Card.Body>
                        <Card.Title className="mb-0 fs-2 text-start" style={{fontFamily: 'AvantGarde'}} >Form Cancion</Card.Title>
                        <Card.Text>
                            <Form noValidate validated={validated} onSubmit={onGuardarClick}>
                                <Form.Group>
                                    <Form.Label>Titulo</Form.Label>
                                    <Form.Control type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
                                    <Form.Control.Feedback type="invalid">Por favor ingrese un titulo.</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Artista</Form.Label>
                                    <Form.Select required value={artistaId} onChange={mostrarAlbumsPorArtista}>
                                        <option value="">Seleccione un artista...</option>
                                        {artistaList.map(artista => (
                                            <option key={artista.id} value={artista.id}>{artista.nombre}</option>
                                        ))}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">Por favor seleccione un artista.</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Album</Form.Label>
                                    <Form.Select required value={albumId} onChange={(e) => setAlbumId(e.target.value)}>
                                        <option value="">Seleccione un album...</option>
                                        {albumListByArtistaId.map(album => (
                                            <option key={album.id} value={album.id}>{album.titulo}</option>
                                        ))}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">Por favor seleccione un album.</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group>
                                    <Button type="submit">Save</Button>
                                </Form.Group>
                            </Form>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </Container>
    );
}

export default FormCancion;
