import React from "react";
import { Radio } from "antd";

const RadioGroup = ({ label, options, onChange }) => {
  return (
    <div>
      <label>{label}</label>
      <Radio.Group onChange={onChange}>
        {options.map((option) => (
          <Radio key={option} value={option}>
            {option}
          </Radio>
        ))}
      </Radio.Group>
    </div>
  );
};

export default RadioGroup;
