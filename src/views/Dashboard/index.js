import React, { Component } from 'react'
import { Card ,Row, Col  } from 'antd'
import './index.less'
export default class Dashboard extends Component {
    render() {
        return (
            <>
                <Card 
                  title="仪表板"
                  bordered={false}
                >
                    <Row type="flex" justify="start" gutter={16}>
                        <Col span={6}>
                            <div className="lp-gutter-box" style={{backgroundColor: '#29B6F6'}}>col-6</div>
                        </Col>
                        <Col span={6}>
                            <div className="lp-gutter-box" style={{backgroundColor: '#AB47BC'}}>col-6</div>
                        </Col>
                        <Col span={6}>
                            <div className="lp-gutter-box" style={{backgroundColor: '#FF7043'}}>col-6</div>
                        </Col>
                        <Col span={6}>
                            <div className="lp-gutter-box" style={{backgroundColor: '#43A047'}}>col-6</div>
                        </Col>
                    </Row>
                </Card>
            </>
        )
    }
}
