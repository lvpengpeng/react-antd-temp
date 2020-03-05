import actionTypes from './actionTypes'


export const markNotificationAsReadById = (id) => {
    return dispatch => {
    //   dispatch(startPost())
      // 这里是模拟的一个服务端的请求
      setTimeout(() => {
        dispatch({
          type: actionTypes.MARK_NOTIFICATION_AS_READ_BY_ID,
          payload: {
            id
          }
        })
        // dispatch(finishPost())
      }, 2000)
    }
  }

  export const markAllNotificationsAsRead = () => {
    return dispatch => {
    //   dispatch(startPost())
      // 这里是模拟的一个服务端的请求
      setTimeout(() => {
        dispatch({
          type: actionTypes.MARK_ALL_NOTIFICATIONS_AS_READ
        })
        // dispatch(finishPost())
      }, 2000)
    }
  }