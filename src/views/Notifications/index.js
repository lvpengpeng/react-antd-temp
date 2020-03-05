import React, { Component } from 'react'
import { Card , List, Avatar, Button ,Badge} from 'antd'
import { connect } from 'react-redux'
import { markNotificationAsReadById ,markAllNotificationsAsRead} from '../../actions/notifications'


const mapState = state =>{
  const {
    list
  } = state.notifications
  return {
    list
  }
}
@connect(mapState,{markNotificationAsReadById,markAllNotificationsAsRead})
class Notifications extends Component {
    render() {
      console.log(this.props,111111111);
      
        return (
            <Card 
            title="通知中心"
            bordered={false}
            extra={
              <Button
              disabled={this.props.list.every(item => item.hasRead === true)}
              onClick={this.props.markAllNotificationsAsRead}
            >全部标记为已读</Button>
            } //extra 额外内容,
          >
                <List
                    itemLayout="horizontal"
                    dataSource={this.props.list}
                    renderItem={item => (
                        // extra 额外内容
                    <List.Item extra={ 
                      item.hasRead
                      ?
                      null
                      :
                      <Button
                        onClick={this.props.markNotificationAsReadById.bind(this, item.id)}
                      >
                        标记为已读
                      </Button>
                    }> 
                        <List.Item.Meta
                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        title={<Badge dot={!item.hasRead}>{item.title}</Badge>}
                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                        >
                        
                        </List.Item.Meta>
                    </List.Item>
                    )}
                />
            </Card>
        )
    }
}


export default  Notifications