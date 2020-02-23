import React, { Component } from 'react'
import { Card ,Button,Table, Divider, Tag} from "antd"
import { getArticles } from '../../requests'
export default class Article extends Component {
  constructor(){
    super()
    this.state={
      offset: 0,
      limited: 10,
      dataSource : [
        {
          key: '1',
          name: '胡彦斌',
          age: 32,
          address: '西湖区湖底公园1号'
        },
        {
          key: '2',
          name: '胡彦祖',
          age: 42,
          address: '西湖区湖底公园1号'
        },
        {
          key: '2',
          name: '胡彦',
          age: 46,
          address: '西湖1号'
        },
      ],
      columns :[
        {
          title: '姓名',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '年龄',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: '住址',
          dataIndex: 'address',
          key: 'address',
        },
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            render:(text, record, index)=>{
              return (
                  <Button>操作</Button>
              )
            }
        },
      ]
    }
  }
  componentDidMount(){
    this.getData()
  }
  getData(){
    getArticles(this.state.offset,this.state.limited).then((res)=>{
      console.log(res.list);
        // this.setState({
        //   dataSource:res.list,
        //   total:res.total
        // })
    })
  }
    toExcel(){
        alert("导出excel")
    }
    render() {
        return (
        <Card title="文章列表" extra={<Button onClick={this.toExcel}>导出excel</Button>} style={{ height:'100%' }}>
            <Table columns={this.state.columns} dataSource={this.state.dataSource}
            // 可在Table中使用pagination配置分页器
            pagination={{pageSize:2,total:100}} />
        </Card>
        )
    }
}