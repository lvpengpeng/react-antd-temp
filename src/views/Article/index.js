import React, { Component } from 'react'
import { Card ,Button} from "antd"

export default class Article extends Component {
    toExcel(){
        alert("导出excel")
    }
    render() {
        return (
        <Card title="文章列表" extra={<Button onClick={this.toExcel}>导出excel</Button>} style={{ height:'100%' }}>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
        </Card>
        )
    }
}