import React from 'react'
import { Row, Col } from 'reactstrap';

const Header = () => {
    return (
        <div id="page-header" className="mb-3">
            <Row>
                <Col md="6" sm="auto" className="text-center m-auto">
                    <h1>Read Our Blog</h1>
                    <p>사이트 프로젝트 작업블로그</p>
                </Col>
            </Row>
        </div>
    )
}

export default Header;