import React from "react";
import { Select } from "antd";

const { Option } = Select;

const SelectField = ({ label, options, onChange }) => {
  return (
    <div>
      <label>{label}</label>
      <Select style={{ width: "100%" }} onChange={onChange}>
        {options.map((option) => (
          <Option key={option} value={option}>
            {option}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default SelectField;
