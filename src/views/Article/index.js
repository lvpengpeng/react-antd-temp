import React, { Component } from 'react'
import { Card ,Button,Table, Divider,Tooltip, Tag,Modal,Typography, message} from "antd"
import moment from 'moment'
import XLSX from 'xlsx'
import { getArticles ,deleteArticleById } from '../../requests'
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
      offset: 0, //第几条开始
      limited: 10, //一页多少条
      dataSource : [],
      columns :[],
      deleteArticleTitle: '',
      isShowArticleModal: false,
      deleteArticleConfirmLoading: false,
      deleteArticleID: null
    }
  }
  componentDidMount(){
    this.getData()
  }
  heandleDelect=(record)=>{
    // 使用函数的方式调用，定制化没那么强
    // Modal.confirm({
    //   title: '此操作不可逆，请谨慎！！！',
    //   content: <Typography>确定要删除<span style={{color: '#f00'}}>{record.title}</span>吗？</Typography>,
    //   okText: '别磨叽！赶紧删除！',
    //   cancelText: '我点错了！',
    //   onOk() {
    //     deleteArticleById(record.id)
    //       .then(resp => {
    //         console.log(resp)
    //       })
    //   }
    // })
    this.setState({
      isShowArticleModal: true,
      deleteArticleTitle: record.title,
      deleteArticleID: record.id
    })
  }
  // 去标记页面
  goEditPage=(record)=>{
   this.props.history.push(`/admin/article/edit/${record.id}`)
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
            <Button size="small" type="primary" onClick={this.goEditPage.bind(this,record)}>编辑</Button>
            <Button size="small" type="danger" onClick={this.heandleDelect.bind(this,record)} >删除</Button>
          </ButtonGroup>
        )
      }
    })
    return columns
  }
  onPageChange = (page, pageSize) =>{
    // console.log(page, pageSize,"page, pageSize");
    this.setState({
      offset: pageSize * (page - 1), 
      limited: pageSize,
    }, () => {
      this.getData()
    })
  }
  onShowSizeChange = (current, size)=>{
    // console.log(current, size,"current, size");
    this.setState({
      offset: 0,
      // offset: pageSize * (page - 1), 
     limited: size,
    }, () => {
      this.getData()
    })
  }
  deleteArticle = () => {
    this.setState({
      deleteArticleConfirmLoading: true
    })
    deleteArticleById(this.state.deleteArticleID)
      .then(resp => {
        message.success(resp.msg)
        // 这里沟通的时候有坑，究竟是留在当前页还是到第一页？？？
        // 这里的需求是到一页
        this.setState({
          offset: 0
        }, () => {
          this.getData()
        })
      })
      .finally(() => {
        this.setState({
          deleteArticleConfirmLoading: false,
          isShowArticleModal: false
        })
      })
  }
  hideDeleteModal = () => {
    this.setState({
      isShowArticleModal: false,
      deleteArticleTitle: '',
      deleteArticleConfirmLoading: false
    })
  }
  getData(){
    getArticles(this.state.offset,this.state.limited).then((res)=>{
      // console.log(res.list);

      const columns = this.getcolumns(res.list[0]);
      
      // console.log(columns,'columns');
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
    toExcel = ()=>{
    // 在实际的项目中，实际上这个功能是前端发送一个ajax请求到后端，然后后端返回一个文件下载的地址。
    // 组合数据
    // console.log(this.state.dataSource,"this.state.dataSource");
    
    const data = [Object.keys(this.state.dataSource[0])] // [['id', 'title', 'author', 'amount', 'createAt']]
    for (let i = 0; i < this.state.dataSource.length; i++) {
      // data.push(Object.values(this.state.dataSource[i]))
      data.push([
        this.state.dataSource[i].id,
        this.state.dataSource[i].title,
        this.state.dataSource[i].author,
        this.state.dataSource[i].amount,
        moment(this.state.dataSource[i].createAt).format('YYYY年MM月DD日 HH:mm:ss')
      ])
    }
        		/* convert state to workbook */
      const ws = XLSX.utils.aoa_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
      /* generate XLSX file and send to client */
      XLSX.writeFile(wb, `articles-${this.state.offset / this.state.limited + 1}-${moment().format('YYYYMMDDHHmmss')}.xlsx`)
      }
    render() {
        return (
        <Card title="文章列表" extra={<Button onClick={this.toExcel}>导出excel</Button>} style={{ height:'100%' }}>
            <Table loading={this.state.isLoading} rowKey={record => record.id} columns={this.state.columns} dataSource={this.state.dataSource}
            // 可在Table中使用pagination配置分页器
            pagination={{
              current: this.state.offset / this.state.limited + 1, // 当前第几页
              total:this.state.total,
              onChange:this.onPageChange ,
              showQuickJumper: true, // showQuickJumper: true 显示跳至到多少页组件
              showSizeChanger: true, //showSizeChanger: true显示一页显示几条组件
              onShowSizeChange:this.onShowSizeChange, //pageSize 变化的回调
              pageSizeOptions: ['5','8','9','10', '15', '20', '30'] , //手动修改默认值
            }}
           />
        <Modal
          title='此操作不可逆，请谨慎！！！'
          visible={this.state.isShowArticleModal}
          onCancel={this.hideDeleteModal}
          confirmLoading={this.state.deleteArticleConfirmLoading}
          onOk={this.deleteArticle}
        >
          <Typography>
            确定要删除<span style={{color: '#f00'}}>{this.state.deleteArticleTitle}</span>吗？</Typography>
        </Modal>
        </Card>
        )
    }
}