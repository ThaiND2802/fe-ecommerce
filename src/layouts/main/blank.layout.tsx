import React from 'react';
import { Row, Col } from 'antd';
import { Outlet } from 'react-router-dom';
import styles from './blank.layout.module.less';

const BlankLayout: React.FC = () => {
    return (
        <>
            <Row>
                <Col span={24}>
                    <Outlet />
                </Col>
            </Row>
        </>
    )
};

export default BlankLayout;