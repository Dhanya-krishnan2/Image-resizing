import React, { useState, useEffect } from 'react';
import { List, Avatar, Button } from 'antd';
import axios from 'axios';
import { NavLink } from 'react-router-dom'

const All = () => {
const [data, setData] = useState()

useEffect(() => {
  axios.get('http://localhost:4000/api/all')
  .then((res) => setData(res.data.result))
  .catch( err => console.log(err))
}, [])

return(
  <div style={{width: '50%', marginLeft: '20px'}}>
    {data ? 
    <><h1>ALL USERS</h1>
    <List
    itemLayout="horizontal"
    dataSource={data}
    renderItem={item => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar src={`http://localhost:4000/${item.imageUrl}`} />}
          title={<a href="https://ant.design">{item.userName}</a>}
        />
        <NavLink to={`/${item._id}`}>
    <Button type='primary'>
      Edit
    </Button>
    </NavLink>
      </List.Item>
    )}
  />
  </> : <h1>There is no user</h1>}
    </div>
)
}
export default All