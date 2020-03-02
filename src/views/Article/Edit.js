import React, { Component } from 'react'
import {Form, Icon, Input, Button, Checkbox ,DatePicker ,Card} from 'antd';
import E from "wangeditor"
import  './edit.less'
import { getArticleById  } from '../../requests'
import moment from 'moment'
@Form.create()
class Edit extends Component {
    constructor(){
        super()
        
        this.state={
            validateStatus :"",
            help :"",
            hasFeedback:false
        }
    }

    componentDidMount(){

 

        // console.log(this.refs.aaa,"this.refs.child");
        // 1.先实例
        var editor = new E(this.refs.aaa)
        // 2.添加监听事件
         editor.customConfig.onchange = (html) =>{
            // 监控变化，同步更新到 textarea
            // 你不应该用 setState，可以使用 this.props.form.setFieldsValue 来动态改变表单值。
            html = html.trim()
            console.log( html);
            
            if(html=="<p><br></p>"){
                html = ""
             }
              this.props.form.setFieldsValue({
                  content: html
              })
        }
        // document.onkeydown = function (e) { // 回车提交表单
        //     // 兼容FF和IE和Opera
        //         var theEvent = window.event || e;
        //         var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
        //         alert(code)
        //         if (code == 8||code == 46) {
        //            alert(1)
        //         }
        //     }

        // 3.最后在创建
        editor.create();
        getArticleById(this.props.match.params.id)
        .then(resp => {
          const { id, ...data } = resp
          data.createAt = moment(data.createAt)
          this.props.form.setFieldsValue(data)
          console.log(editor,"this.editor");
          editor.txt.html(data.content)
        })
        .finally(() => {
          this.setState({
            isLoading: false
          })
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }else{
              console.log(12);
              
          }
        });
      };
    //   添加自定义校验
    validatorClick=(rule, value, callback)=>{
        // console.log(rule,"1111111111", value,"2222222", callback,"----------");
        if(value!=="123"){
            this.setState({
                validateStatus :"error",
                help :"输入错误拉",
                hasFeedback:true,
            })
        }else{
            this.setState({
                validateStatus :"",
                help :"",
                hasFeedback:false
            })
        }
        callback()
    }

        //选择时间
     onChange = (value, dateString) => {
        // console.log('Selected Time: ', value);
        // console.log('Formatted Selected Time: ', dateString);
      }
      
       onOk = (value) => {
        // console.log('onOk: ', value);
      }

      close(){
          alert("点击取消")
      }
      render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <Card    
                title="编辑文章"
                bordered={false}
                extra={<Button onClick={this.close}>取消</Button>} style={{ height:'100%' }}>
            <Form 
            labelCol = {{
                span: 4
              }}
              wrapperCol = {{
                span: 16
              }}
            onSubmit={this.handleSubmit} className="login-form">
                <Form.Item     
                    label="标题" 
                    // hasFeedback={this.state.hasFeedback}
                    // validateStatus={this.state.validateStatus}
                    // help={this.state.help}
                >
                {getFieldDecorator('title', {
                    rules: [
                    { required: true, message: '标题是必填的!' },
                    // { required: true, message: '用户名是必填的!' },
                    // {min:3,message: '最小长度是3' },
                    // {max:6, message: '最小长度是6!' },
                    // {validator:this.validatorClick}
                ],
                })(
                    <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="请填写标题"
                    />,
                )}
                    
                </Form.Item>

                <Form.Item      
                    label="作者"
                >
                {getFieldDecorator('author', {
                    rules: [
                    { required: true, message: '作者是必填的!' }
                ],
                })(
                    <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="请填写作者"
                    />,
                )}
                    
                </Form.Item>
                <Form.Item      
                    label="阅读量"
                >
                {getFieldDecorator('amount', {
                    rules: [
                    { required: true, message: '阅读量是必填的!' }
                ],
                })(
                    <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="阅读量是"
                    />,
                )}
                    
                </Form.Item>
                <Form.Item      
                    label="创建时间"
                >
                {getFieldDecorator('createAt', {
                    rules: [
                    { required: true, message: '创建时间是必填的!' }
                ],
                })(
                    <DatePicker showTime placeholder="Select Time" onChange={this.onChange} onOk={this.onOk} />,
                )}
                    
                </Form.Item>

                <Form.Item      
                    label="内容"
                >
                {getFieldDecorator('content', {
                    rules: [
                    { required: true, message: '内容是必填的!' },
                ],
                })(
                    // <textarea name="" id="" cols="30" rows="10"></textarea>,
                    <>
                        <div className="lp-edit" ref="aaa"></div>
                    </>
                  
                   
                )}
                    
                </Form.Item>
                <Form.Item wrapperCol = {{  offset: 4 }}>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in  
                    </Button>
                </Form.Item>
            </Form>
         </Card>
          )
      }
         
}
export default Edit