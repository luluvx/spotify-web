import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card, Col, Container, Form } from 'react-bootstrap';

const FormAlbum = () => {
    const navigate = useNavigate();

    const { id } = useParams();

    const [titulo, setTitulo] = useState('');
    const [artistaId, setArtistaId] = useState('');

    const [artistaList, setArtistaList] = useState([]);

    const [validated, setValidated] = useState(false);

    useEffect(() => {
        if (!id) return;
        getAlbumById();
        
    }, [id]);

    useEffect(() => {
        getArtistaList();
    }, []);


    const getArtistaList = async () => {
        axios.get('http://localhost:3000/artistas')
            .then(res => {
                setArtistaList(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const getAlbumById = async () => {
        axios.get(`http://localhost:3000/albumes/${id}`)
            .then(res => {
                const album = res.data;
                
                console.log(album);
                setTitulo(album.titulo);
                setArtistaId(album.artista.id);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const onGuardarClick = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        e.stopPropagation();

        setValidated(true);

        if (form.checkValidity() === false) {
            return;
        }

        const album = {
            titulo: titulo,
            artistaId: Number(artistaId)
        }

        if(id){
            editAlbum(album);
        }else{
            insertAlbum(album);
        }
    }

    const insertAlbum = async (album) => {
        console.log(album);
        axios.post('http://localhost:3000/albumes', album)
            .then(res => {
                console.log(res);
                navigate('/admin/albums');
            })
            .catch(err => {
                console.log(err);
            });
    }

    const editAlbum = async (album) => {
        axios.put(`http://localhost:3000/albumes/${id}`, album)
            .then(res => {
                console.log(res);
                navigate('/admin/albums');
            })
            .catch(err => {
                console.log(err);
            });
    }


    return (
        <Container>
            <Col md={8} className="text-center">
            <Card>
                <Card.Body>
                    <Card.Title className="mb-0 fs-2 text-start" style={{fontFamily: 'AvantGarde'}} >Form Album</Card.Title>
                    <Card.Text>
                    <Form noValidate validated={validated} onSubmit={onGuardarClick}>
                            <Form.Group>
                                <Form.Label>Titulo</Form.Label>
                                <Form.Control type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
                                <Form.Control.Feedback type="invalid">
                                        Por favor ingrese un titulo.
                                    </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Artista</Form.Label>
                                <Form.Select required value={artistaId} onChange={(e) => {
                                            setArtistaId(e.target.value);
                                        }} >
                                            <option value="">Seleccione un artista...</option>
                                            {artistaList.map(artista =>
                                                <option key={artista.id} value={artista.id}>{artista.nombre}</option>
                                            )}
                                        </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                        Por favor seleccione un artista.
                                    </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group>
                                <Button type="submit" >Save</Button>
                            </Form.Group>
                        </Form>
                    </Card.Text>
                </Card.Body>
            </Card>
            </Col>


        </Container>

     );
}
 
export default FormAlbum;