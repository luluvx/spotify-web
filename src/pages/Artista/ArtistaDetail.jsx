import axios from "axios";
import { useEffect, useState } from "react";
import {  Alert, Card, Col, Container, Row  } from "react-bootstrap";
import {   useParams } from "react-router-dom";
import './ArtistaDetail.css';
import ClientHeader from "../../components/ClientHeader";


const ArtistaDetail = () => {

    


    const { id } = useParams();

    const [artista, setArtista] = useState({});

    const [albumList, setAlbumList] = useState([]);
    const [cancionSeleccionada, setCancionSeleccionada] = useState(null);

    useEffect(() => {
        // Verifica si hay un fragmento en la URL (por ejemplo, #album-1)
        if (window.location.hash) {
            const element = document.querySelector(window.location.hash);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [albumList]); 

    useEffect(() => {
        getArtistaById();
    }, [id]);

    const getArtistaById = async () => {
        axios.get(`http://localhost:3000/artistas/${id}/albums/canciones`)
        .then(res => {
            const artista = res.data;
            setArtista(artista);
            setAlbumList(artista.albums);
        })
        .catch(err => {
            console.log(err);
        });
    }

    const reproducirCancion = (cancion) => {
        setCancionSeleccionada(cancion);
    }

    return (
        <>
        <ClientHeader />
        {/*<Container>
            <Card className=" text-white" style={{ backgroundColor: " #222222" }}>
            <Card.Body className="m-0">
                <Row>
                    <Col md={8} className="text-center">
                        <Card.Title className="mb-0 fs-2 text-start" style={{fontFamily: 'AvantGarde'}} >Spoñify</Card.Title>
                    </Col>
                    <Col md={4} className="text-center">
                        <SearchBar />
                    </Col>
                </Row>
                </Card.Body>
            </Card>
        </Container>*/}
        <br />
        <Container>
            <Row className="d-flex flex-row">
                <Col md={12} className="text-center">
                    <Card id="card-artista" >
                    <Card.Img
                            id="artistaImg"
                            variant="top"
                            src={"http://localhost:3000/public/artistas/" + artista.id + ".jpg"}
                            alt="Imagen del artista"
                            style={{
                                width:'240px',
                                height:'240px',
                                borderRadius:'50%',
                                marginLeft:'20px',
                                marginRight:'20px',
                                marginBottom:'20px',
                                padding:'10px 10px 0 10px  ',
                                objectFit: 'cover',
                            }}

                            />
                        <Card.Body className="pb-5" >
                            <Card.Title className="mb-2 ps-2 text-start" style={{fontFamily: 'Jost-Regular', color:'#B4B4B8'}} >Artista</Card.Title>
                            <Card.Title id="artistaNombre" className="m-0 ">{artista.nombre}</Card.Title>
                        </Card.Body>

                    </Card>
                </Col>
            </Row>
        </Container>

        <Container >
            <Row id="contenido-container">
                {albumList.map(album => (

                    <Col key={album.id} xl={12}>
                    <Card id={`album-${album.id}`}
                        className="card-album"
                        style={{
                        backgroundImage: `url("http://localhost:3000/public/albums/${album.id}.jpg")`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        color: 'white', 
                        height: '130px', 
                    }}
                    >
                        <Card.Body className="p-4" >
                            <Card.Title id="albumNombre" className="m-0 ">{album.titulo}</Card.Title>
                        </Card.Body>

                    </Card>
                    <Row className="mb-3 mt-3">
                        {album.canciones.length === 0 && <Alert variant="danger" className="mt-4">No se encontraron canciones</Alert>}
                        {album.canciones.map((cancion, index) => (
                            <Col key={cancion.id} xl={12} className="mb-3">
                                <Card id={`cancion-${cancion.id}`} className="card-cancion" onClick={() => reproducirCancion(cancion)}>
                                    <Card.Text id="cancionIndex" className="m-0"> 0{index +1}</Card.Text>
                                        <Card.Img
                                        id="cancionImg"
                                        className="imgPhoto"
                                        variant="top"
                                        src={"http://localhost:3000/public/canciones/imagenes/" + cancion.id + ".jpg"}

                                        style={{width:'50px', height:'50px' }}  
                                        />
                                        <Card.Text id="cancionNombre" className="m-0">{cancion.titulo}</Card.Text>
                                </Card>
                            </Col>
                            ))}
                    </Row>

                </Col>
                ))}
            </Row>
        </Container>
        {cancionSeleccionada && (
                <footer className="fixed-bottom text-white p-3" style={{backgroundColor:'#181818', height:'100px'}} >
                    <Container className="d-flex align-items-center justify-content-between" >
                        <div className="d-flex align-items-center">
                            <img
                                src={`http://localhost:3000/public/canciones/imagenes/${cancionSeleccionada.id}.jpg`}
                                alt={cancionSeleccionada.titulo}
                                style={{ width: '50px', height: '50px', marginRight: '30px' }}
                            />
                            <div>
                                <h5 className="mb-1 text-start" style={{ fontFamily:'Jost-Medium', fontSize:'18px'}}>{cancionSeleccionada.titulo}</h5>
                                <p className="m-0  text-start "style={{ fontFamily:'Jost-Medium', fontSize:'14px', color:'GrayText'}} >{artista.nombre}</p>
                            </div>
                        </div>
                        <audio controls autoPlay src={`http://localhost:3000/public/canciones/${cancionSeleccionada.id}.mp3`} style={{width:'70%', backgroundColor:'#181818'}}>
                            Tu navegador no soporta el elemento de audio.
                        </audio>
                    </Container>
                </footer>
            )}
        </>

    );
}

export default ArtistaDetail;