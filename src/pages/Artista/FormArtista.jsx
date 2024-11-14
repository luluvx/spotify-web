import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card, Col, Container, Form } from 'react-bootstrap';

const FormArtista = () => {
    const navigate = useNavigate();

    const { id } = useParams();

    const [nombre, setNombre] = useState('');
    const [generoId, setGeneroId] = useState('');

    const [generoList, setGeneroList] = useState([]);

    const [validated, setValidated] = useState(false);

    useEffect(() => {
        if (!id) return;
        getArtistaById();
        
    }, [id]);

    useEffect(() => {
        getGeneroList();
    }, []);

    const getGeneroList = async () => {
        axios.get('http://localhost:3000/generos')
            .then(res => {
                setGeneroList(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const getArtistaById = async () => {
        axios.get(`http://localhost:3000/artistas/${id}`)
            .then(res => {
                const artista = res.data;
                
                console.log(artista);
                setNombre(artista.nombre);
                setGeneroId(artista.genero.id);
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

        const artista = {
            nombre: nombre,
            generoId: Number(generoId)
        }
        if(id){
            editArtista(artista);
        } else {
            insertArtista(artista);
        }
    }

    const insertArtista = async (artista) => {
        console.log(artista);
        axios.post('http://localhost:3000/artistas', artista)
            .then(res => {
                console.log(res);
                navigate('/admin/artistas');
            })
            .catch(err => {
                console.log(err);
            });
    }

    const editArtista = async (artista) => {
        axios.put(`http://localhost:3000/artistas/${id}`, artista)
            .then(res => {
                console.log(res);
                navigate('/admin/artistas');
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <>
        <Container>
            <Col md={8} className="text-center">
            <Card>
                <Card.Body>
                    <Card.Title className="mb-0 fs-2 text-start" style={{fontFamily: 'AvantGarde'}} >Form Artista</Card.Title>
                    <Card.Text>
                    <Form noValidate validated={validated} onSubmit={onGuardarClick}>
                            <Form.Group>
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                                <Form.Control.Feedback type="invalid">
                                        Por favor ingrese un nombre.
                                    </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Genero</Form.Label>
                                <Form.Select required value={generoId} onChange={(e) => {
                                            setGeneroId(e.target.value);
                                        }} >
                                            <option value="">Seleccione un genero...</option>
                                            {generoList.map(genero =>
                                                <option key={"user-" + genero.id} value={genero.id}>{genero.nombre}</option>
                                            )}
                                        </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                        Por favor seleccione un genero.
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
        </>

     );
}
 
export default FormArtista;