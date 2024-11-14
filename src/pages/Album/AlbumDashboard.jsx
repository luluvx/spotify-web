import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

const AlbumDashboard = () => {

    const navigate = useNavigate();
    const [albumList, setAlbumList] = useState([]);

    useEffect(() => {
        getAlbumList();
    }, []);

    const getAlbumList = async () => {
        axios.get('http://localhost:3000/albumes')
        .then(res => {
            setAlbumList(res.data);
        })
        .catch(err => {
            console.log(err);
        });
    }

    const onDeleteAlbum = async (id) => {

        const confirm = window.confirm('¿Está seguro que desea eliminar el album?');
        if(!confirm){
            return;
        }

        axios.delete(`http://localhost:3000/albumes/${id}`)
            .then(res => {
                console.log(res);
                getAlbumList();
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
                    <Card.Title className="mb-0 fs-2 text-start" style={{fontFamily: 'AvantGarde', color:'#1fdf64'}} >Album Dashboard</Card.Title>
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
                        <Link to="/admin/albums/create" className="btn mt-3" style={{backgroundColor:'#1fdf64', fontFamily:'Jost-Bold'}}>Crear Album</Link>
                    </Col>
                </Row>
                </Card.Body>
            </Card>
        </Container>
        <br/>
        <Container>
            <Row className="d-flex flex-row align-items-center justify-content-start">
                {albumList.map((album) => (
                    <Col md={3} key={album.id}>
                        <Card className="p-3 d-flex flex-column align-items-center justify-content-between  " style={{backgroundColor:' #272727', width:'220px', height:'230px', boxShadow:'rgba(0, 0, 0, 0.15) 0px 5px 15px 0px', border:'none', marginBottom:'20px'}}>
                        <Card.Img
                                className="imgPhoto"
                                variant="top"
                                src={"http://localhost:3000/public/albums/" + album.id + ".jpg"}
                                alt="Imagen del album"
                                style={{width:'60%', height:'60%' , margin:'0px auto', objectFit: 'cover'}}
                                />
                            <Card.Body className="m-0 d-flex flex-column align-items-center justify-content-between gap-2 ">
                                <Card.Title className="m-0 fs-6 text-white ">{album.titulo}</Card.Title>
                                <div className=" d-flex flex-row justify-content-between align-items-center gap-4">
                                    <Button className="btn-control" onClick={() => navigate("/admin/albums/" + album.id + "/photo")} >
                                        <i className="bi bi-image-fill"></i></Button>
                                    <Button className="btn-control" onClick={() => navigate("/admin/albums/edit/" + album.id)} >
                                        <i className="bi bi-pencil"></i></Button>
                                    <Button className="btn-control" onClick={() => {onDeleteAlbum(album.id)}} >
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
 
export default AlbumDashboard;