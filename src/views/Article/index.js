import React, { Component } from 'react'
import { Card ,Button,Table, Divider,Tooltip, Tag} from "antd"
import { getArticles } from '../../requests'
const titleMap = {
    id:"id",
    title:"标题",
    author:"作者",
    amount:"阅读量",
    createAt:"创建时间"
}
export default class Article extends Component {
  constructor(){
    super()
    this.state={
      offset: 0,
      limited: 10,
      dataSource : [],
      columns :[]
    }
  }
  componentDidMount(){
    this.getData()
  }
  getcolumns(obj){
    const columnKeys = Object.keys(obj)
    const columns = columnKeys.map(item =>{
      if(item === 'amount') {
        return {
          title: titleMap[item],
          key: item,
          render: (text, record) => {
            const { amount } = record;
            return (
              <Tooltip title={amount > 230 ? '超过230' : '没超过230'}>
                <Tag color={amount > 230 ? 'red' : 'green'}>{record.amount}</Tag>
              </Tooltip>
            )
          }
        }
      }
     return {
        title: titleMap[item],
        dataIndex: item,
        key: item
      }
    })
    return columns
  }
  getData(){
    getArticles(this.state.offset,this.state.limited).then((res)=>{
      console.log(res.list);

      const columns = this.getcolumns(res.list[0]);
      
      console.log(columns,'columns');
        this.setState({
          dataSource:res.list,
          total:res.total,
          columns
        })
    })
  }
    toExcel(){
        alert("导出excel")
    }
    render() {
        return (
        <Card title="文章列表" extra={<Button onClick={this.toExcel}>导出excel</Button>} style={{ height:'100%' }}>
            <Table  rowKey={record => record.id} columns={this.state.columns} dataSource={this.state.dataSource}
            // 可在Table中使用pagination配置分页器
            pagination={{pageSize:6,total:100}} />
        </Card>
        )
    }
}