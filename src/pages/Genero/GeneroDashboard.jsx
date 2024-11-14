import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from "react-router-dom";
import '../../styles/controladores.css';

const GeneroDashboard = () => {

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

    const onDeleteGenero = async (id) => {
        const confirm = window.confirm('¿Está seguro que desea eliminar el genero?');
        if(!confirm){
            return;
        }
        axios.delete(`http://localhost:3000/generos/${id}`)
            .then(res => {
                console.log(res);
                getGeneroList();
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
                    <Card.Title className="mb-0 fs-2 text-start" style={{fontFamily: 'AvantGarde', color:'#1fdf64'}} >Genero Dashboard</Card.Title>
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
                <Row >
                    {/*<Col md={8}>
                        <Form>
                            <FormControl
                            type="text"
                            placeholder="Buscar pokemon"
                            className="mr-sm-2"
                            value={nombrePokemoBuscar}
                            onChange={buscarPokemonPorNombreONumero}
                            />
                        </Form>
                    </Col>
                    <Col md={3}>
                    <FormSelect onChange={buscarPokemonPorTipo} value={tipoPokemonBuscar}>
                        <option value="" >Select type</option>
                        {tipoList.map(tipo => (
                            <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
                        ))}
                    </FormSelect>
                    </Col>*/}
                    <Col md={2} className="text-center">
                    <Link to="/admin/generos/create" className="btn  mt-3" style={{backgroundColor:'#1fdf64', fontFamily:'Jost-Bold'}}>Crear Genero</Link>
                    </Col>
                </Row>
                </Card.Body>
            </Card>

            </Container>
            <br />
            <Container>
                <Row className="d-flex flex-row align-items-center justify-content-start"  >
                    {generoList.length === 0 &&  <Alert variant="danger" className="mt-4">No se encontraon generos</Alert>}
                    {generoList.map(genero => (
                        <Col key={genero.id} xl={3} className="mb-4 " >
                            <Card className="p-3 d-flex flex-column align-items-center justify-content-between  " style={{backgroundColor:' #272727', width:'220px', height:'230px', boxShadow:'rgba(0, 0, 0, 0.15) 0px 5px 15px 0px', border:'none', marginBottom:'20px'}}>
                                <Card.Img onClick={() => navigate("/admin/generos/" + genero.id +"/detail")}
                                className="imgPhoto"
                                variant="top"
                                src={"http://localhost:3000/public/generos/" + genero.id + ".jpg"}
                                alt="Imagen del genero"
                                style={{width:'60%', height:'60%' , margin:'0px auto'}}
                                />

                                <Card.Body className="m-0 d-flex flex-column align-items-center justify-content-between gap-2 ">
                                    <Card.Title className="m-0 fs-6 text-white ">{genero.nombre}</Card.Title>
                                    <div className=" d-flex flex-row justify-content-between align-items-center gap-4">
                                        <Button  onClick={() => navigate("/admin/generos/" + genero.id + "/photo")} className=" p-2 btn-control">
                                            <i className="bi bi-image-fill"></i>
                                        </Button>
                                        <Button className="btn-control" onClick={() => navigate("/admin/generos/edit/" + genero.id)} >
                                            <i className="bi bi-pencil"></i></Button>
                                        <Button className="btn-control" onClick={() => {onDeleteGenero(genero.id)}} >
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
 
export default GeneroDashboard;