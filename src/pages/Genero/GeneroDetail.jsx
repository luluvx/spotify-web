import axios from "axios";
import { useEffect, useState } from "react";
import { Alert, Card, Col, Container, Row  } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import ClientHeader from "../../components/ClientHeader";


const GeneroDetail = () => {

    const navigate = useNavigate();

    const { id } = useParams();
    const [genero, setGenero] = useState({});
     const [artistaList, setArtistaList] = useState([]);

    useEffect(() => {
        getGeneroById();
    }, [id]);

    const getGeneroById = async () => {
        axios.get(`http://localhost:3000/generos/${id}`)
        .then(res => {
            const genero = res.data;
            setGenero(genero);
            setArtistaList(genero.artistas);

        })
        .catch(err => {
            console.log(err);
        });
    }



    return (
        <>
        <ClientHeader />

        <Container className="mt-5" >
            <Row className="d-flex flex-row">
                <Col md={12} className="text-center">

                <Card className="p-6 d-flex flex-row align-items-center justify-content-between" style={{backgroundColor:' #181818',height: '250px', border:'none', marginBottom:'20px'}}>
                    <Card.Img
                    className="imgPhoto"
                    variant="top"
                    src={"http://localhost:3000/public/generos/" + genero.id + ".jpg"}
                    alt="Imagen del genero"
                    style={{
                        width:'180px', 
                        height:'180px' , 
                        margin:'10px 50px 10px 30px',
                        borderRadius:'50%'
                    }}
                    />
                    <Card.Body className="m-0 p-0 " style={{width:'100px'}}>
                        <Card.Text className="mb-2 text-start" style={{fontFamily: 'Jost-Bold', fontSize:'20px', color:'#E6E6E6'}}>Genero</Card.Text>
                        <Card.Title className="m-0 text-start" style={{fontFamily: 'AvantGarde', fontSize:'60px', color:'white', textTransform : 'capitalize'}}>{genero.nombre}</Card.Title>
                        <div></div>
                    </Card.Body>
                </Card>
                

                </Col>
            </Row>

            <Row className="d-flex flex-row">
                {artistaList.length === 0 &&  <Alert variant="danger" className="mt-4">No se encontraon artistas</Alert>}
                {artistaList.map(artista => (
                    <Col key={artista.id} md={3}>
                        <Card className="p-2 d-flex flex-column  "style={{backgroundColor:' #181818', width:'180px', height:'240px', boxShadow:'rgba(0, 0, 0, 0.15) 0px 5px 15px 0px', border:'none', marginBottom:'20px'}}>
                            <Card.Img onClick={() => navigate("/artistas/" + artista.id +"/detail")}
                            className="imgPhoto"
                            variant="top"
                            src={"http://localhost:3000/public/artistas/" + artista.id + ".jpg"}
                            alt="Imagen del artista"
                            style={{
                                width:'75%', 
                                height:'60%' , 
                                borderRadius:'50%',
                                margin:'20px auto',
                                objectFit: 'cover',
                            }}
                            />
                            <Card.Title className="mb-2 ps-3 pe-3 text-start" style={{fontFamily: 'AvantGarde', fontSize:'15px', color:'white',textTransform:'capitalize'}}>{artista.nombre}</Card.Title>
                            <Card.Text className="ps-3 pe-3 text-start" style={{fontFamily: 'Jost-Regular', fontSize:'12px', color:'#B4B4B8'}}>Artista</Card.Text>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
        


        </>

     );
}
 
export default GeneroDetail;