import { Card, Col, Container, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';


const PhotoAlbum = () => {

    const navigate = useNavigate();
    const { id } = useParams();

    const [photoAlbum, setPhotoAlbum] = useState(null);
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
        formData.append('albumImagen', photoAlbum);

        axios.post(`http://localhost:3000/albumes/${id}/imagen`, formData)
            .then(res => {
                console.log(res);
                navigate('/admin/albums');
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
                    <Card.Title className="mb-0 fs-2 text-start" style={{fontFamily: 'AvantGarde'}} >Photo Album</Card.Title>
                    <Card.Text>
                    <Form noValidate validated={validated} onSubmit={onGuardarClick}>
                            <Form.Group>
                                <Form.Label>Seleccione una foto por favor </Form.Label>
                                <Form.Control type="file" onChange={(e) => setPhotoAlbum(e.target.files[0])} />
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
 
export default PhotoAlbum;