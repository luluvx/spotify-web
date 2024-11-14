
import {  Card, Col, Container, Row  } from "react-bootstrap";

import SearchBar from './SearchBar';
import { useNavigate } from "react-router-dom";

const ClientHeader = () => {
    const navigate = useNavigate();
    return ( 
        <>
        <Container>
            <Card className="text-white" style={{backgroundColor:'transparent', border:'none', padding: '0'}}>
                <Row>
                    <Col md={8} className="text-center">

                        <Card.Title onClick={()=> navigate("/generos")} className="mb-0 fs-1 text-start" style={{fontFamily: 'AvantGarde', color:'#1fdf64'}} ><i className="bi bi-spotify"></i>  Spoñify</Card.Title>
                    </Col>
                    <Col md={4} className="text-center d-flex flex-column align-items-center justify-content-center">
                        <SearchBar />
                    </Col>
                </Row>

            </Card>
        </Container>
        </>
     );
}
 
export default ClientHeader;