import React, { Component } from 'react'
import { Card ,Button,Table, Divider,Tooltip, Tag} from "antd"
import moment from 'moment'
import { getArticles } from '../../requests'
const ButtonGroup = Button.Group
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
      isLoading:true,
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
      if(item === 'createAt') {
        return {
          title: titleMap[item],
          key: item,
          render: (text, record) => {
            const { createAt } = record
            return  moment(createAt).format('YYYY年MM月DD日 HH:mm:ss')
          }
        }
      }
     return {
        title: titleMap[item],
        dataIndex: item,
        // dataIndex是用来组什么的呢？
        key: item
      }
    })
    columns.push({
      title: "操作",
      key: "action",
      render: (text, record) => {
        const { createAt } = record
        return  (
          <ButtonGroup>
            <Button size="small" type="primary" >编辑</Button>
            <Button size="small" type="danger" >删除</Button>
          </ButtonGroup>
        )
      }
    })
    return columns
  }
  onPageChange = (page, pageSize) =>{
    console.log(page, pageSize,"page, pageSize");
    this.setState({
      offset: pageSize * (page - 1), 
      limited: pageSize,
    }, () => {
      this.getData()
    })
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
    .catch(err => {
      // 处理错误
    })
    .finally(() => {
      if(!this.updater.isMounted(this)) return
      this.setState({
        isLoading: false
      })
    })
  }
    toExcel(){
        alert("导出excel")
    }
    render() {
        return (
        <Card title="文章列表" extra={<Button onClick={this.toExcel}>导出excel</Button>} style={{ height:'100%' }}>
            <Table loading={this.state.isLoading} rowKey={record => record.id} columns={this.state.columns} dataSource={this.state.dataSource}
            // 可在Table中使用pagination配置分页器
            pagination={{
              current: this.state.offset / this.state.limited + 1,
              total:this.state.total,
              onChange:this.onPageChange ,
              showQuickJumper: true, // showQuickJumper: true 显示跳至到多少页组件
              showSizeChanger: true, //showSizeChanger: true显示一页显示几条组件
              onShowSizeChange:this.onShowSizeChange, //pageSize 变化的回调
              pageSizeOptions: ['10', '15', '20', '30'] , //手动修改默认值
            }}
           />
        </Card>
        )
    }
}