import React, { useState } from 'react';
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
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const AddImage = () => {
  const [userName, setUserName] = useState();
  const [isProfile, setIsProfile] = useState();
  const [pic, setPic] = useState();
  const [message, setMessage] = useState()
  const [error, setError] = useState()

  const handleFileChange = (e) => {
    setPic(e.target.files[0]);
  };

  const handleChange = (e, updateValue) => {
    updateValue(e.target.value);
  };
  
  const handleBox = (e, updateValue) => {
    updateValue(e);
  };

  const handleSubmit = () => {
    // e.preventDefault();
    const formData = new FormData();
    formData.append('userName', userName);
    formData.append('isProfile', isProfile);
    formData.append('pic', pic);
    console.log(formData.get('userName'));
    axios
      .post('http://localhost:4000/api/addImage', formData)
      .then((res) => {
        setError()
        setMessage(res.data.message)
      })
      .catch( err => {
        setMessage()
        setError(err.response.data.message ? err.response.data.message : "Something went wrong, May be image size is big")
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
      <h1>ADD USER</h1>
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
          <Input placeholder="Enter User Name" onChange={(e) => handleChange(e, setUserName)} />
        </Form.Item>
        <div>
          <label>Image :</label>
          <input 
          accept="image/png,image/gif,image/jpeg,image/jpg"
            type='file'
            onChange={handleFileChange}
          />
        </div>
        <Form.Item label='Is it a profile image?'>
          <Switch onChange={(e) => handleBox(e, setIsProfile)} />
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
export default AddImage;
