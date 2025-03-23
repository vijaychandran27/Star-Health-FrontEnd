import React, { useState } from 'react';
import { Form, Input, Button, Select } from 'antd';

const { Option } = Select;

const DynamicForm = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log('Form Submitted:', values);
  };

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
      <Form.Item name="name" label="Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="email" label="Email" rules={[{ type: 'email', required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="occupation" label="Occupation">
        <Select>
          <Option value="Engineer">Engineer</Option>
          <Option value="Doctor">Doctor</Option>
        </Select>
      </Form.Item>

      <Button type="primary" htmlType="submit">Submit</Button>
    </Form>
  );
};

export default DynamicForm;
