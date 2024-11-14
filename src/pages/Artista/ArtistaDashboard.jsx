import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from 'axios';


const ArtistaDashboard = () => {

    const navigate = useNavigate();
    const [artistaList, setArtistaList] = useState([]);

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

    const onDeleteArtista = async (id) => {
        const confirm = window.confirm('¿Está seguro que desea eliminar el artista?');
        if(!confirm){
            return;
        }
        axios.delete(`http://localhost:3000/artistas/${id}`)
            .then(res => {
                console.log(res);
                getArtistaList();
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <>
        <Container>
            <Card className=" text-white" style={{ backgroundColor: " #222222" }}>
             <Card.Body className="m-0">
                <Row >
                <Col md={8} className="text-center">
                    <Card.Title className="mb-0 fs-2 text-start" style={{fontFamily: 'AvantGarde', color:'#1fdf64'}} >Artistas Dashboard</Card.Title>
                    </Col>
                    <Col md={1} className='d-flex flex-direction-row justify-center p-0 '>
                        <Button style={{width:'100%', backgroundColor:'transparent', fontFamily:'Jost-Medium', padding:'0', fontSize:'15px', border:'none'}} onClick={() => navigate("/admin/generos/")}>Generos</Button>
                    </Col>
                    <Col md={1} className='d-flex flex-direction-row justify-center p-0'>
                        <Button style={{width:'100%', backgroundColor:'transparent', fontFamily:'Jost-Medium',padding:'0', fontSize:'15px', border:'none'}} onClick={() => navigate("/admin/artistas/")}>Artistas</Button>
                    </Col>
                    <Col md={1} className='d-flex flex-direction-row justify-center p-0'>
                        <Button style={{width:'100%', backgroundColor:'transparent', fontFamily:'Jost-Medium',padding:'0', fontSize:'14px',border:'none'}} onClick={() => navigate("/admin/albums/")}>Albums  </Button>
                    </Col>
                    <Col md={1} className='d-flex flex-direction-row justify-center p-0'>
                        <Button style={{width:'100%', backgroundColor:'transparent', fontFamily:'Jost-Medium',padding:'0', fontSize:'14px',border:'none'}} onClick={() => navigate("/admin/canciones/")}>Canciones  </Button>
                    </Col>
                </Row>
                <Row>
                <Col md={2} className="text-center">
                    <Link to="/admin/artistas/create" className="btn mt-3" style={{backgroundColor:'#1fdf64', fontFamily:'Jost-Bold'}}>Crear Artista</Link>
                    </Col>
                </Row>
                </Card.Body>
            </Card>
        </Container>
        <br />
        <Container>
            <Row className="d-flex flex-row align-items-center justify-content-start" >
                {artistaList.map(artista => (
                    <Col md={3} key={artista.id} className="mb-4 ">
                        <Card className="p-3 d-flex flex-column align-items-center justify-content-between  " style={{backgroundColor:' #272727', width:'220px', height:'230px', boxShadow:'rgba(0, 0, 0, 0.15) 0px 5px 15px 0px', border:'none', marginBottom:'20px'}}>
                        <Card.Img
                                className="imgPhoto"
                                variant="top"
                                src={"http://localhost:3000/public/artistas/" + artista.id + ".jpg"}
                                alt="Imagen del artista"
                                style={{width:'60%', height:'60%' , margin:'0px auto', objectFit: 'cover'}}
                                />
                            <Card.Body className="m-0 d-flex flex-column align-items-center justify-content-between gap-2 ">
                                <Card.Title className="m-0 fs-6 text-white ">{artista.nombre}</Card.Title>
                                <div className=" d-flex flex-row justify-content-between align-items-center gap-4">
                                    <Button className="btn-control" onClick={() => navigate("/admin/artistas/" + artista.id + "/photo")} >
                                        <i className="bi bi-image-fill"></i></Button>
                                    <Button className="btn-control" onClick={() => navigate("/admin/artistas/edit/" + artista.id)} >
                                        <i className="bi bi-pencil"></i></Button>
                                    <Button className="btn-control" onClick={() => {onDeleteArtista(artista.id)}} >
                                        <i className="bi bi-trash"></i>
                                    </Button>

                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            </Container>
        </>

     );
}
 
export default ArtistaDashboard;