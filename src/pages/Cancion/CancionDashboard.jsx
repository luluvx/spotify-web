import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const CancionDashboard = () => {

    const navigate = useNavigate();
    const [cancionList, setCancionList] = useState([]);

    useEffect(() => {
        getCancionList();
    }, []);

    const getCancionList = async () => {
        axios.get('http://localhost:3000/canciones')
        .then(res => {
            setCancionList(res.data);
        })
        .catch(err => {
            console.log(err);
        });
    }

    const onDeleteCancion = async (id) => {
        const confirm = window.confirm('¿Está seguro que desea eliminar la cancion?');
        if(!confirm){
            return;
        }
        axios.delete(`http://localhost:3000/canciones/${id}`)
            .then(res => {
                console.log(res);
                getCancionList();
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
                <Row>
                    <Col md={8} className="text-center">
                    <Card.Title className="mb-0 fs-2 text-start" style={{fontFamily: 'AvantGarde', color:'#1fdf64'}} >Cancion Dashboard</Card.Title>
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
                        <Link to="/admin/canciones/create" className="btn mt-3" style={{backgroundColor:'#1fdf64', fontFamily:'Jost-Bold'}}>Crear Cancion</Link>
                    </Col>
                </Row>
             </Card.Body>
            </Card>
        </Container>
        <br/>
        <Container>
            <Row>
                {cancionList.length === 0 && <Alert variant="info">No hay canciones</Alert>}
                {cancionList.map(cancion => (
                    <Col md={4} key={cancion.id}>
                        <Card className="mb-4 p-3 d-flex flex-column align-items-center" style={{backgroundColor: "#222222"}}>
                            <Card.Img
                            variant="top"
                            src={`http://localhost:3000/public/canciones/imagenes/${cancion.id}.jpg`}
                            alt="Imagen de la cancion"
                            style={{width:'60%', height:'60%'}}
                            />
                            <br/>
                            
                            <audio controls style={{width:'235px'}}>
                                <source src={`http://localhost:3000/public/canciones/${cancion.id}.mp3`} type="audio/mpeg"/>
                            </audio>
                            <Card.Body className="m-0 p-2 d-flex flex-column align-items-center justify-content-between gap-2 ">
                                    <Card.Title className="m-0 fs-6 text-white ">{cancion.titulo}</Card.Title>
                                    <div className=" d-flex flex-row justify-content-between align-items-center gap-4">
                                        <Button className="btn-control"  onClick={() => navigate("/admin/canciones/" + cancion.id + "/archivo")}>
                                            <i className="bi bi-music-note-beamed"></i>
                                        </Button>
                                        <Button className="btn-control" onClick={() => navigate("/admin/canciones/edit/" + cancion.id)} >
                                            <i className="bi bi-pencil"></i></Button>
                                        <Button className="btn-control" onClick={() => {onDeleteCancion(cancion.id)}} >
                                            <i className="bi bi-trash"></i>
                                        </Button>

                                    </div>

                                </Card.Body>
                            
                        </Card>
                    </Col>
                )
                )}
            </Row>
        </Container>

        </>

     );
}
 
export default CancionDashboard;