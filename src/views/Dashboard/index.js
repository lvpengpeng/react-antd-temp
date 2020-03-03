import React, { Component } from 'react'
import { Card ,Row, Col  } from 'antd'
import echarts from 'echarts'
import './index.less'
import { getArticleAmount } from '../../requests'
export default class Dashboard extends Component {
    initArticleChart(){
        var myChart = echarts.init(document.getElementById('main'));
        // 绘制图表
        // myChart.setOption({
        //     // title: {
        //     //     text: 'ECharts 入门示例'
        //     // },
        //     xAxis: {
        //         type: 'category',
        //         boundaryGap: false,
        //         data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        //     },
        //     yAxis: {
        //         type: 'value'
        //     },
        //     series: [{
        //         data: [820, 932, 901, 934, 1290, 1330, 1320],
        //         type: 'line',
        //         areaStyle: {}
        //     }]
        // });
        getArticleAmount()
        .then(resp => {
          const option = {
            grid: {  
              left: '10',  
              right: '10',  
              bottom: '10',
              top: '10',
              containLabel: true  
            },        
            tooltip: {
              trigger: 'axis'
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: resp.amount.map(item => item.month)
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: resp.amount.map(item => item.value),
                type: 'line',
                areaStyle: {}
            }]
          }
          myChart.setOption(option)
        })
    }
    componentDidMount(){
        // 初始化echarts
      this.initArticleChart()
    }
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
                <div id="main" style={{height: '400px'}}></div>
            </>
        )
    }
}
