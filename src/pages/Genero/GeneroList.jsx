import axios from "axios";
import { useEffect, useState } from "react";
import {  Card, Col, Container, Row  } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ClientHeader from "../../components/ClientHeader";
import './GeneroList.css'

const GeneroList = () => {

    const navigate = useNavigate();

    const [generoList, setGeneroList] = useState([]);




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
    return (
        <>
        <ClientHeader />
        <Container className="mt-5" >
            <Card className=" text-white" style={{ backgroundColor: " #222222" }}>
            <Card.Body className="m-0">
                <Card.Title>
                    Banner
                </Card.Title>
                </Card.Body>
            </Card>
        </Container>
        <br />
        <Container className="mt-6">
            <Row >
                {generoList.map((genero) => (
                    <Col md={3} key={genero.id}>
                        <Card id="card-genero" className="text-white" onClick={() => navigate("/generos/" + genero.id +"/detail")}
                        style={{
                            backgroundImage: `url("http://localhost:3000/public/generos/${genero.id}.jpg")`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',

                        }}
                        >
                            <Card.Body>
                                <Card.Title id="genero-titulo">{genero.nombre}</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
        </>

     );
}

export default GeneroList;