import React from 'react';
import { Modal, Form, Select, Button, Space } from 'antd';

const AddEmployeeScheduleModal = ({
  open,
  onCancel,
  onFinish,
  selectedDate,
  selectedEmployee, 
  managedShifts, 
  employees, 
  form,
}) => {

  // --- Prepare options for Select from employees prop ---
  const employeeOptions = employees?.map(emp => ({ 
    // Use the properties that match your employee state object
    value: emp.name, 
    label: emp.name 
  })) || []; 
  // --- End prepare options ---

  // Set initial value for employee if pre-selected
  React.useEffect(() => {
    if (open) { // Reset form when modal opens
      form.resetFields();
      if (selectedEmployee) {
        form.setFieldsValue({ employee: selectedEmployee });
      }
    }
  }, [open, selectedEmployee, form]);

  return (
    <Modal
      title={`Add Schedule for ${selectedEmployee || 'Employee'} on ${selectedDate ? selectedDate.format("YYYY-MM-DD") : ""}`}
      open={open}
      onCancel={onCancel}
      footer={null} // Use form button
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="employee"
          label="Employee"
          rules={[{ required: true, message: "Please select an employee" }]}
        >
          <Select 
            placeholder="Select Employee" 
            options={employeeOptions} // Use dynamic options
            disabled={!!selectedEmployee} 
          />
        </Form.Item>
        <Form.Item
          name="shiftKey" // Use shiftKey to link to managedShifts
          label="Shift"
          rules={[{ required: true, message: "Please select a shift" }]}
        >
          <Select placeholder="Select Shift">
            {managedShifts?.map((shift) => (
              <Select.Option key={shift.key} value={shift.key}>
                {shift.name} ({shift.startTime} - {shift.endTime})
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item style={{ textAlign: 'right' }}>
          <Space>
            <Button onClick={onCancel}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Add Schedule
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddEmployeeScheduleModal; 