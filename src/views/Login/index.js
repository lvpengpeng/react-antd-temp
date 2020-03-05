import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox ,Card} from 'antd';
import "./index.less"



@Form.create()
class Login extends Component {

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
        if (!err) {
            console.log('Received values of form: ', values);
        }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Card
            title="ADMIN登录"
            className="lp-login-wrapper"
          > 
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="用户名"
                        />,
                    )}
                    </Form.Item>
                    <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="密码"
                        />,
                    )}
                    </Form.Item>
                    <Form.Item>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(<Checkbox>记住我</Checkbox>)}
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        登录
                    </Button>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}

export default  Login

 