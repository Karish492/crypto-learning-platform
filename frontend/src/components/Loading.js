import {Col, Row , COntainer, Container} from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner'
function Loading(props){
        return (
            <Container fluid className='vh-100 f-flex justify-content: center align-items-center'>
                <Row>
                    <Col className = 'text-center'>
                        <Spinner animation= "border" role = "status"/>
                        <p> {props.message} </p>
                    </Col>
                </Row>
            </Container>
        )
}
export default Loading