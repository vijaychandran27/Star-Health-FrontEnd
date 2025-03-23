import React, { useState, useEffect } from "react";
import { Form, Input, Button, Space, message, Row, Col } from "antd";
import { submitFormData, uploadFile } from "./services/formService";
import SelectField from "./components/SelectField";
import RadioGroup from "./components/RadioGroup";
import SalarySlipUpload from "./components/SalarySlipUpload";

const App = () => {
  const [formData, setFormData] = useState({});
  const [members, setMembers] = useState([{}]);
  const [isSalarySlipVisible, setSalarySlipVisible] = useState(false);
  const [form] = Form.useForm();

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleMemberChange = (index, field, value) => {
    const updatedMembers = [...members];
    updatedMembers[index][field] = value;
    setMembers(updatedMembers);
  };

  const addMember = () => {
    setMembers([...members, {}]);
  };

  const handleSalarySlipUpload = (file) => {
    setFormData((prevData) => ({
      ...prevData,
      salarySlip: file,
    }));
  };

  useEffect(() => {
    if (formData.annualIncome > 50000) {
      setSalarySlipVisible(true);
    } else {
      setSalarySlipVisible(false);
    }
  }, [formData]);

  const validateMembers = () => {
    const totalPercentage = members.reduce(
      (sum, member) => sum + (member.percentage || 0),
      0
    );
    if (totalPercentage && Number(totalPercentage) !== 100) {
      message.error("The sum of percentages must equal 100!");
      return false;
    }
    return true;
  };

  const validateForm = async () => {
    try {
      await form.validateFields();
      return true; 
    } catch (error) {
      return false;
    }
  };
  const handleSubmit = async () => {
    const isValid = await validateForm();
    if (!isValid) {
      message.error("Please fill in all required fields!");
      return; 
    }

    if (!validateMembers()) return;

    try {
      const payload = {
        personalDetails: {
          name: formData.name,
          dateOfBirth: formData.dateOfBirth,
          mobile: formData.mobile,
          email: formData.email,
          gender: formData.gender.target.value,
        },
        occupationDetails: {
          occupation: formData.occupation,
          annualIncome: formData.annualIncome,
        },
        addressDetails: {
          address1: formData.address1,
          address2: formData.address2,
          zipcode: formData.zipcode,
          state: formData.state,
          district: formData.district,
          city: formData.city,
        },
        membersAllocation: members.map((member) => ({
          percentage: member.percentage  ? Number(member.percentage) : 0,
        })),
        salarySlip: formData.salarySlip?.uid || null,
      };
      let response = null;
      if (formData.annualIncome > 50000 && formData.salarySlip) {
        try {
          let fileUuid = null;
          if (formData.salarySlip) {
            fileUuid = await uploadFile(formData.salarySlip);
          }
          payload.salarySlip = fileUuid;
        } catch (ex) {
          message.error("Unable to Upload Salary Slip!");
          console.error("err>>", ex);
        }
        response = await submitFormData(payload);
      } else {
        response = await submitFormData(payload);
      }
      message.success("Form submitted successfully!");
      console.log("Response:", response);
    } catch (error) {
      message.error("Error submitting the form. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dynamic Form</h1>

      <Form form={form} layout="vertical">
        {/* Primary Details Section */}
        <h3>Primary Details</h3>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter your name!" }]}
        >
          <Input
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="Enter your name"
          />
        </Form.Item>

        <Form.Item
          label="Date of Birth"
          name="dateOfBirth"
          rules={[{ required: true, message: "Please enter your date of birth!" }]}
        >
          <Input
            value={formData.dateOfBirth}
            onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
            type="date"
          />
        </Form.Item>

        <Form.Item
          label="Mobile"
          name="mobile"
          rules={[{ required: true, message: "Please enter your mobile!" }]}
        >
          <Input
            value={formData.mobile}
            onChange={(e) => handleInputChange("mobile", e.target.value)}
            type="number"
            placeholder="Enter your mobile"
          />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please enter your email!" }]}
        >
          <Input
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            type="email"
            placeholder="Enter your email"
          />
        </Form.Item>

        <Form.Item
          label="Gender"
          name="gender"
          rules={[{ required: true, message: "Please select your gender!" }]}
        >
          <RadioGroup
            label="Select Gender"
            options={["Male", "Female", "Other"]}
            value={formData.gender}
            onChange={(value) => handleInputChange("gender", value)}
          />
        </Form.Item>

        {/* Other Details Section */}
        <h3>Other Details</h3>
        <Form.Item
          label="Occupation"
          name="occupation"
          rules={[{ required: true, message: "Please select your occupation!" }]}
        >
          <SelectField
            label="Occupation"
            options={["Engineer", "Doctor", "Teacher", "Other"]}
            value={formData.occupation}
            onChange={(value) => handleInputChange("occupation", value)}
          />
        </Form.Item>

        <Form.Item
          label="Annual Income"
          name="annualIncome"
          rules={[{ required: true, message: "Please enter your annual income!" }]}
        >
          <Input
            value={formData.annualIncome}
            onChange={(e) => handleInputChange("annualIncome", e.target.value)}
            type="number"
            placeholder="Enter your annual income"
          />
        </Form.Item>

        {/* Salary Slip Upload */}
        {isSalarySlipVisible && (
          <Form.Item label="Salary Slip">
            <SalarySlipUpload onUpload={handleSalarySlipUpload} />
          </Form.Item>
        )}

        {/* Address Details Section */}
        <h3>Address Details</h3>
        <Form.Item
          label="Address Line 1"
          name="address1"
          rules={[{ required: true, message: "Please enter your address line 1!" }]}
        >
          <Input
            value={formData.address1}
            onChange={(e) => handleInputChange("address1", e.target.value)}
            placeholder="Enter your address line 1"
          />
        </Form.Item>

        <Form.Item
          label="Address Line 2"
          name="address2"
          rules={[{ required: true, message: "Please enter your address line 2!" }]}
        >
          <Input
            value={formData.address2}
            onChange={(e) => handleInputChange("address2", e.target.value)}
            placeholder="Enter your address line 2"
          />
        </Form.Item>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label="Zip Code"
              name="zipcode"
              rules={[{ required: true, message: "Please enter your zip code!" }]}
            >
              <Input
                value={formData.zipcode}
                onChange={(e) => handleInputChange("zipcode", e.target.value)}
                placeholder="Enter zip code"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="State"
              name="state"
              rules={[{ required: true, message: "Please enter your state!" }]}
            >
              <Input
                value={formData.state}
                onChange={(e) => handleInputChange("state", e.target.value)}
                placeholder="Enter state"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="District"
              name="district"
              rules={[{ required: true, message: "Please enter your district!" }]}
            >
              <Input
                value={formData.district}
                onChange={(e) => handleInputChange("district", e.target.value)}
                placeholder="Enter district"
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="City"
          name="city"
          rules={[{ required: true, message: "Please enter your city!" }]}
        >
          <Input
            value={formData.city}
            onChange={(e) => handleInputChange("city", e.target.value)}
            placeholder="Enter city"
          />
        </Form.Item>

        {/* Member Allocation Section */}
        <h3>Member Allocation</h3>
        {members.map((member, index) => (
          <Row key={index}>
            <Col span={12}>
              <Form.Item
                label={`Member ${index + 1} Percentage`}
                name={`member${index + 1}Percentage`}
                rules={[
                  { required: true, message: `Please enter percentage for member ${index + 1}!` },
                ]}
              >
                <Input
                  value={member.percentage}
                  onChange={(e) => handleMemberChange(index, "percentage", e.target.value)}
                  type="number"
                  placeholder={`Enter member ${index + 1} percentage`}
                />
              </Form.Item>
            </Col>
          </Row>
        ))}
        <Button onClick={addMember} type="dashed">
          Add Member
        </Button>

        <Form.Item>
          <Button type="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default App;
