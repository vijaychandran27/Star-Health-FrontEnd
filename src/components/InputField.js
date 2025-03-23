import React from 'react';
import { Input, DatePicker, Select, Radio } from 'antd';

const { Option } = Select;

export const InputField = ({ field, config, onChange }) => {
  const { label, type } = config;

  switch (type) {
    case 'text':
      return (
        <Input
          placeholder={label}
          onChange={(e) => onChange(field, e.target.value)}
        />
      );
    case 'date':
      return (
        <DatePicker
          placeholder={label}
          onChange={(date, dateString) => onChange(field, dateString)}
        />
      );
    case 'number':
      return (
        <Input
          type="number"
          placeholder={label}
          onChange={(e) => onChange(field, e.target.value)}
        />
      );
    case 'select':
      return (
        <Select
          placeholder={label}
          onChange={(value) => onChange(field, value)}
        >
          <Option value="developer">Developer</Option>
          <Option value="manager">Manager</Option>
        </Select>
      );
    case 'radio':
      return (
        <Radio.Group onChange={(e) => onChange(field, e.target.value)}>
          <Radio value="male">Male</Radio>
          <Radio value="female">Female</Radio>
        </Radio.Group>
      );
    default:
      return null;
  }
};

export const SalarySlipUpload = ({ onChange }) => {
  return (
    <Upload
      accept=".pdf,.jpeg,.jpg,.png"
      beforeUpload={(file) => {
        onChange(file);
        return false; // Prevent automatic upload
      }}
      showUploadList={false}
    >
      <Button>Select Salary Slip</Button>
    </Upload>
  );
};
