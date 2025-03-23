import React from "react";
import { Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const SalarySlipUpload = ({ onUpload }) => {
  const beforeUpload = (file) => {
    console.log("file",file);
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (!allowedTypes.includes(file.type)) {
      message.error("You can only upload JPG, PNG, or PDF files!");
      return Upload.LIST_IGNORE;
    }
    onUpload(file);
    return false;
  };

  return (
    <Upload beforeUpload={beforeUpload} showUploadList={false}>
      <Button icon={<UploadOutlined />}>Upload Salary Slip</Button>
    </Upload>
  );
};

export default SalarySlipUpload;
