
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
const FormGenero = () => {
    const navigate = useNavigate();

    const { id } = useParams();

    const [nombre, setNombre] = useState('');
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        if (id) {
            getGeneroById();
        }
    }, [id]);

    const getGeneroById = async () => {
        axios.get(`http://localhost:3000/generos/${id}`)
            .then(res => {
                setNombre(res.data.nombre);
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

        const genero = {
            nombre: nombre
        }
        if(id){
            editGenero(genero);
        } else {
            insertGenero(genero);
        }
    }

    const insertGenero = async (genero) => {
        axios.post('http://localhost:3000/generos', genero)
            .then(res => {
                console.log(res);
                navigate('/admin/generos');
            })
            .catch(err => {
                console.log(err);
            });
    }

    const editGenero = async (genero) => {
        axios.put(`http://localhost:3000/generos/${id}`, genero)
            .then(res => {
                console.log(res);
                navigate('/admin/generos');
            })
            .catch(err => {
                console.log(err);
            }
        );
    }





    return (
        <>
            <Container>
                <Card className=" text-white" style={{ backgroundColor: " #222222" }}>
                    <Card.Body className="m-0">
                        <Row>
                            <Col md={8} className="text-center">
                                <Card.Title className="mb-0 fs-2 text-start" style={{ fontFamily: 'AvantGarde' }} >Genero</Card.Title>
                            </Col>
                        </Row>
                        <Row className="mt-4">
                            <Col md={12}>
                                <Form noValidate validated={validated} onSubmit={onGuardarClick}>
                                    <Form.Group className="mb-3" controlId="nombre">
                                        <Form.Label>Nombre</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="Ingrese el nombre del genero"
                                            value={nombre}
                                            onChange={(e) => setNombre(e.target.value)}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor ingrese un nombre.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mb-3" >
                                        <Button variant="primary" type="submit">
                                            Guardar
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        </>

     );
}
 
export default FormGenero;