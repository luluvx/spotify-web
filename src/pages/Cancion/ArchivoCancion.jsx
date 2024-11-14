import { Card, Col, Container, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

const ArchivoCancion = () => {
    
    const navigate = useNavigate();
    const { id } = useParams();

    const [archivoCancion, setArchivoCancion] = useState(null);
    const [validated, setValidated] = useState(false);

    const onGuardarClick = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        e.stopPropagation();

        setValidated(true);

        if (form.checkValidity() === false) {
            return;
        }

        const formData = new FormData();
        formData.append('archivo', archivoCancion);

        axios.post(`http://localhost:3000/canciones/${id}/archivo`, formData)
            .then(res => {
                console.log(res);
                navigate('/admin/canciones');
            })
            .catch(err => {
                console.log(err);
            }
        );
    }

    return (
        <>
        <Container>
            <Col md={8} className="text-center">
            <Card>
                <Card.Body>
                    <Card.Title className="mb-0 fs-2 text-start" style={{fontFamily: 'AvantGarde'}} >Archivo Cancion</Card.Title>
                    <Card.Text>
                    <Form noValidate validated={validated} onSubmit={onGuardarClick}>
                            <Form.Group>
                                <Form.Label>Seleccione una cancion por favor </Form.Label>
                                <Form.Control type="file" onChange={(e) => setArchivoCancion(e.target.files[0])} />
                                <Form.Control.Feedback type="invalid">
                                        Por favor seleccione un archivo.
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
 
export default ArchivoCancion;