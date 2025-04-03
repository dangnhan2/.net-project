import React, { useEffect } from "react";
import { Modal, Form, Input, TimePicker, Button, Space } from "antd";
import moment from "moment";

const AddEditShiftModal = ({
  open,
  onCancel,
  onFinish,
  editingShift,
  form,
}) => {
  // Use useEffect to set form values when modal opens or editingShift changes
  useEffect(() => {
    if (open) { // Only run when modal is open
      if (editingShift) {
        // Parse HH:mm:ss from state
        const startTimeMoment = moment(editingShift.startTime, "HH:mm:ss");
        const endTimeMoment = moment(editingShift.endTime, "HH:mm:ss");
        
        form.setFieldsValue({
          name: editingShift.name,
          // Set value only if parsing was successful
          time: startTimeMoment.isValid() && endTimeMoment.isValid() 
                ? [startTimeMoment, endTimeMoment] 
                : null, // Set to null if parsing failed to clear picker
        });
      } else {
        // Add mode: Reset form fields
        form.resetFields();
      }
    }
  }, [open, editingShift, form]); // Dependencies: run when these change

  return (
    <Modal
      title={editingShift ? "Edit Shift" : "Add New Shift"}
      open={open}
      onCancel={onCancel}
      footer={null} // Custom footer buttons in the form
      destroyOnClose // Reset form state when closing
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        // initialValues removed - useEffect handles setting values
      >
        <Form.Item
          name="name"
          label="Shift Name"
          rules={[{ required: true, message: "Please enter the shift name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="time"
          label="Start/End Time"
          rules={[{ required: true, message: "Please select start and end times!" }]}
        >
          <TimePicker.RangePicker format="HH:mm:ss" style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item style={{ textAlign: 'right' }}>
          <Space>
            <Button onClick={onCancel}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              {editingShift ? "Update Shift" : "Add Shift"}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddEditShiftModal; 