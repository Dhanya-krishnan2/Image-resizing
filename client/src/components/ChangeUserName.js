import React, { useState, useEffect } from 'react';
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  Upload,
} from 'antd';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const ChangeUserName = (props) => {
  const [userName, setUserName] = useState();
  const [id, setId] = useState(props.match.params.id)
  const [message, setMessage] = useState()
  const [error, setError] = useState()

  const handleChange = (e, updateValue) => {
    updateValue(e.target.value);
  }

  const handleSubmit = () => {
    // e.preventDefault();
    axios
      .patch('http://localhost:4000/api/changeUsername', {id, userName})
      .then((res) => {
        setError()
        setMessage(res.data.message)
      })
      .catch( err => {
        setMessage()
        setError(err.response && err.response.data.message)
      })
  };
  return (
    <>
    <NavLink to="/">
    <Button type='primary'>
      Home Page
    </Button>
    </NavLink>
    <div id="addImg">
      {error && <h3 style={{color: 'red'}}>{error}</h3>}
      {message && <h3 style={{color: 'green'}}>{message}</h3>}
      <h1>EDIT USER</h1>
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout='horizontal'
        size='large'
        onFinish={handleSubmit}
      >
        <Form.Item>
          <Input placeholder="Enter New User Name" onChange={(e) => handleChange(e, setUserName)} />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>

      </Form>
    </div>
    </>

  )
}
export default ChangeUserName;
