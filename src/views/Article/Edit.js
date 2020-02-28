import React, { Component } from 'react'
import {Form, Icon, Input, Button, Checkbox } from 'antd';
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
      render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item      
                    hasFeedback={this.state.hasFeedback}
                    validateStatus={this.state.validateStatus}
                    help={this.state.help}
                >
                {getFieldDecorator('username', {
                    rules: [
                    { required: true, message: '用户名是必填的!' },
                    { required: true, message: '用户名是必填的!' },
                    {min:3,message: '最小长度是3' },
                    {max:6, message: '最小长度是6!' },
                    {validator:this.validatorClick}
                ],
                })(
                    <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Username"
                    />,
                )}
                    
                </Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
            </Form>
          )
      }
         
}
export default Edit