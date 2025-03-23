import React, { useState, useEffect } from 'react';
import { Form, Input, DatePicker, Radio, Select, Button, Upload, notification, Row, Col } from 'antd';
import { useForm } from 'antd/es/form/Form';
import axios from 'axios';
import { InputField, SelectField, RadioGroup, SalarySlipUpload } from './InputField';

const { Option } = Select;

const FormComponent = () => {
  const [form] = useForm();
  const [sections, setSections] = useState([]);
  const [formData, setFormData] = useState({});
  const [annualIncome, setAnnualIncome] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);

  const json = {
    questions: {
      name: { type: 'text', label: 'Name' },
      dateOfBirth: { type: 'date', label: 'Date of Birth' },
      mobile: { type: 'number', label: 'Mobile' },
      email: { type: 'text', label: 'Email' },
      occupation: { type: 'select', label: 'Occupation' },
      gender: { type: 'radio', label: 'Select Gender' },
      annualIncome: { type: 'number', label: 'Annual Income' }
    },
    sections: {
      primaryDetails: ['name', 'email', 'gender', 'mobile'],
      otherDetails: ['annualIncome', 'occupation']
    }
  };

  useEffect(() => {
    setSections(json.sections);
  }, []);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (field === 'annualIncome') {
      setAnnualIncome(value);
    }
  };

  const handleSubmit = async () => {
    try {
      await form.validateFields();
      const response = await axios.post('/api/form/submit', formData);
      notification.success({ message: 'Form submitted successfully!' });
    } catch (error) {
      notification.error({ message: 'Form submission failed!' });
    }
  };

  return (
    <Form form={form} onFinish={handleSubmit}>
      {sections.primaryDetails.map((field) => {
        const fieldConfig = json.questions[field];
        return (
          <Row key={field}>
            <Col span={24}>
              <InputField field={field} config={fieldConfig} onChange={handleChange} />
            </Col>
          </Row>
        );
      })}
      {sections.otherDetails.map((field) => {
        const fieldConfig = json.questions[field];
        if (field === 'annualIncome' && annualIncome > 50000) {
          return (
            <Row key={field}>
              <Col span={24}>
                <SalarySlipUpload onChange={setUploadedFile} />
              </Col>
            </Row>
          );
        }
        return (
          <Row key={field}>
            <Col span={24}>
              <InputField field={field} config={fieldConfig} onChange={handleChange} />
            </Col>
          </Row>
        );
      })}
      <Button type="primary" htmlType="submit">Submit</Button>
    </Form>
  );
};

export default FormComponent;
