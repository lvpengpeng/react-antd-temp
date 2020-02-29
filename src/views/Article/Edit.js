import React, { Component } from 'react'
import {Form, Icon, Input, Button, Checkbox ,DatePicker } from 'antd';
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
        console.log(rule,"1111111111", value,"2222222", callback,"----------");
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
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
      }
      
       onOk = (value) => {
        console.log('onOk: ', value);
      }

      render(){
        const { getFieldDecorator } = this.props.form;
        return (
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
                {getFieldDecorator('username', {
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
                {getFieldDecorator('num', {
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
                {getFieldDecorator('time', {
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
                {getFieldDecorator('text', {
                    rules: [
                    { required: true, message: '内容是必填的!' },
                ],
                })(
                    <textarea name="" id="" cols="30" rows="10"></textarea>,
                )}
                    
                </Form.Item>
                <Form.Item wrapperCol = {{  offset: 4 }}>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in  
                    </Button>
                </Form.Item>
            </Form>
          )
      }
         
}
export default Edit