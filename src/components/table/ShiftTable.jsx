import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Table,
  Form,
  Space,
  Popconfirm,
  Divider,
  App,
  Tag,
  Row,
  Col,
} from "antd";
import moment from "moment";
import { FaPlus, FaPencilAlt, FaRegTrashAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "../../style/shift.table.css";

// Import the renamed modal component
import AddEditShiftModal from "../modal/AddEditShiftModal";
import AddEmployeeScheduleModal from "../modal/AddEmployeeScheduleModal";

// Import API functions
import {
  getAllShifts,
  createShift,
  updateShift,
  deleteShift,
  getAllEmployees,
} from "../../api/api";

// --- Import React DatePicker --- 
import ReactDatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";
// --- End Import ---

// Hardcoded employees for now
const EMPLOYEES = [
  { key: "emp1", name: "John Doe" },
  { key: "emp2", name: "Alice Smith" },
  { key: "emp3", name: "Bob Johnson" },
  // Add more employees as needed
];

const ShiftTable = () => {
  const { message, notification } = App.useApp(); // Use App for feedback

  // --- State --- 
  const [managedShifts, setManagedShifts] = useState([]); // Initialize as empty, fetch from API
  const [loadingShifts, setLoadingShifts] = useState(false); // Add loading state for table
  const [employees, setEmployees] = useState([]); // Add state for employees
  const [loadingEmployees, setLoadingEmployees] = useState(false); // Add loading state for employees
  const [isShiftManagementModalVisible, setIsShiftManagementModalVisible] = useState(false);
  const [isAddEditShiftModalVisible, setIsAddEditShiftModalVisible] = useState(false);
  const [editingShift, setEditingShift] = useState(null);
  const [shiftForm] = Form.useForm(); 

  const [isScheduleModalVisible, setIsScheduleModalVisible] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState(moment().startOf('isoWeek'));
  const [pickerDate, setPickerDate] = useState(moment().startOf('isoWeek'));
  const [selectedCellInfo, setSelectedCellInfo] = useState(null);
  const [scheduleData, setScheduleData] = useState({}); 
  const [scheduleForm] = Form.useForm();

  // --- Fetch Shifts & Employees --- 
  useEffect(() => {
    fetchShifts();
    fetchEmployees(); // Call function to fetch employees
  }, []);

  const fetchShifts = async () => {
    setLoadingShifts(true);
    console.log("Fetching shifts...");
    try {
      const res = await getAllShifts();
      console.log("API Response:", res);

      if (res && res.data) {
        console.log("Raw data from response:", res.data);

        const formattedData = res.data.map(shift => {
          return {
            key: shift.id,
            id: shift.id,
            name: shift.Name || shift.name,
            startTime: shift.startTime || '--:--',
            endTime: shift.endTime || '--:--'
          };
        });
        console.log("Formatted data for state:", formattedData);
        
        setManagedShifts(formattedData);
      } else {
         message.error(res?.message || "Failed to fetch shifts");
         console.log("API call successful but no data found or error message:", res?.message);
      }
    } catch (error) {
      console.error("Error fetching shifts:", error);
      notification.error({ message: "Error", description: "Could not fetch shifts." });
    }
    setLoadingShifts(false);
  };

  // --- Fetch Employees --- 
  const fetchEmployees = async () => {
    setLoadingEmployees(true);
    console.log("Fetching employees...");
    try {
      const res = await getAllEmployees();
      console.log("Employee API Response:", res);

      if (res && res.data) {
        // **IMPORTANT:** Adjust the mapping based on your actual API response structure
        // Assuming your employee object has at least 'id' and 'name' or 'fullName'
        const formattedEmployees = res.data.map(emp => ({
          key: emp.id, // Use a unique key, usually the ID
          id: emp.id,
          name: emp.fullName || emp.name // Adapt to your backend field name
        }));
        console.log("Formatted employees:", formattedEmployees);
        setEmployees(formattedEmployees);
      } else {
         message.error(res?.message || "Failed to fetch employees");
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
      notification.error({ message: "Error", description: "Could not fetch employees." });
    }
    setLoadingEmployees(false);
  };

  // Optional: Log state changes
  useEffect(() => {
    console.log("managedShifts state updated:", managedShifts);
  }, [managedShifts]);

  // --- Shift Management Handlers ---
  const showShiftManagementModal = () => setIsShiftManagementModalVisible(true);
  const hideShiftManagementModal = () => setIsShiftManagementModalVisible(false);

  const showAddShiftModal = () => {
    setEditingShift(null);
    setIsAddEditShiftModalVisible(true);
  };

  const showEditShiftModal = (shift) => {
    setEditingShift(shift);
    setIsAddEditShiftModalVisible(true);
  };

  const hideAddEditShiftModal = () => {
    setIsAddEditShiftModalVisible(false);
    setEditingShift(null);
  };

  const handleAddEditShiftFinish = async (values) => {
    setLoadingShifts(true); // Use shift loading state
    const startTime = values.time[0].format("HH:mm:ss");
    const endTime = values.time[1].format("HH:mm:ss");
    const name = values.name;
    let res;
    try {
      if (editingShift) {
        // Update Shift
        res = await updateShift(editingShift.id, name, startTime, endTime);
      } else {
        // Create Shift
        res = await createShift(name, startTime, endTime);
      }

      if (res && res.statusCode !== 400 && res.statusCode !== 404) { // Check for successful status (adjust as needed)
        message.success(res.message || (editingShift ? "Shift updated successfully!" : "Shift created successfully!"));
        hideAddEditShiftModal();
        fetchShifts(); // Refresh the list
      } else {
        message.error(res?.message || "Operation failed!");
      }
    } catch (error) {
      console.error("Error saving shift:", error);
      notification.error({ message: "Error", description: "Could not save shift." });
    }
    setLoadingShifts(false);
  };

  const handleDeleteShift = async (key) => {
    setLoadingShifts(true);
    try {
      const res = await deleteShift(key);
      if (res && res.statusCode !== 400 && res.statusCode !== 404) { // Check for successful status
         message.success(res.message || "Shift deleted successfully!");
         fetchShifts(); // Refresh the list
      } else {
        message.error(res?.message || "Failed to delete shift!");
      }
    } catch(error) {
      console.error("Error deleting shift:", error);
      notification.error({ message: "Error", description: "Could not delete shift." });
    }
    setLoadingShifts(false);
  };

  const shiftColumns = [
    { title: "Shift Name", dataIndex: "name", key: "name" },
    { title: "Start Time", dataIndex: "startTime", key: "startTime" },
    { title: "End Time", dataIndex: "endTime", key: "endTime" },
    {
      title: "Action",
      key: "action",
      width: 100,
      render: (_, record) => (
        <div style={{ display: "flex", gap: "5px" }}> 
          <Button 
            onClick={() => showEditShiftModal(record)}
          >
            <FaPencilAlt style={{ color: "#646465" }} />
          </Button>
          <Popconfirm
            title="Delete the shift"
            description="Are you sure to delete this shift?"
            onConfirm={() => handleDeleteShift(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button>
              <FaRegTrashAlt style={{ color: "#F38177" }} />
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  // --- Schedule Assignment Handlers ---
  const showScheduleModal = (date, employee) => {
    setSelectedCellInfo({ date, employee });
    setIsScheduleModalVisible(true);
  };

  const hideScheduleModal = () => {
    setIsScheduleModalVisible(false);
    setSelectedCellInfo(null);
  };

  const handleScheduleFinish = (values) => {
    if (!selectedCellInfo) return;

    const dateKey = selectedCellInfo.date.format("YYYY-MM-DD");
    const employee = values.employee;
    const selectedShift = managedShifts.find(
      (shift) => shift.key === values.shiftKey
    );
    
    if (!selectedShift) {
        message.error("Selected shift not found!");
        return;
    }

    const newScheduleEntry = {
      employee: employee,
      shiftName: selectedShift.name,
      shiftKey: values.shiftKey,
    };

    const daySchedule = scheduleData[dateKey] || [];
    const updatedDaySchedule = [...daySchedule, newScheduleEntry];

    setScheduleData({
      ...scheduleData,
      [dateKey]: updatedDaySchedule,
    });
    
    hideScheduleModal();
  };

  // --- Week Navigation ---
  const handleDateChange = (date) => { 
      // date object from react-datepicker is a JS Date, convert to moment
      const selectedMoment = moment(date); 
      if (selectedMoment.isValid()) {
          setPickerDate(selectedMoment); // Keep pickerDate state (as moment)
          const newWeekStart = selectedMoment.clone().startOf('isoWeek'); 
          console.log("Picker selected date (moment):", selectedMoment.format("YYYY-MM-DD"));
          console.log("Calculated startOfWeek from picker:", newWeekStart.format("YYYY-MM-DD"));
          console.log("Current selectedWeek state:", selectedWeek.format("YYYY-MM-DD"));
          if (!newWeekStart.isSame(selectedWeek, 'isoWeek')) { 
              console.log("Setting week via picker to:", newWeekStart.format("YYYY-MM-DD"));
              setSelectedWeek(newWeekStart);
          } else {
               console.log("Picker selection resulted in the same week start date. No state update.");
          }
      } else {
          // Handle potential invalid date selection if needed
          console.log("Invalid date selected from picker");
      }
  };

  const goToPreviousWeek = () => {
    setSelectedWeek(prevSelectedWeek => {
        const currentWeekStart = prevSelectedWeek.format("YYYY-MM-DD");
        const prevWeek = prevSelectedWeek.clone().subtract(1, 'week').startOf('isoWeek');
        const prevWeekStart = prevWeek.format("YYYY-MM-DD");
        console.log(`Going previous: Current=${currentWeekStart}, Setting Prev=${prevWeekStart}`);
        setPickerDate(prevWeek.clone()); // Update picker display
        return prevWeek;
    });
  };

  const goToNextWeek = () => {
    setSelectedWeek(prevSelectedWeek => {
        const currentWeekStart = prevSelectedWeek.format("YYYY-MM-DD");
        const nextWeek = prevSelectedWeek.clone().add(1, 'week').startOf('isoWeek');
        const nextWeekStart = nextWeek.format("YYYY-MM-DD");
        console.log(`Going next: Current=${currentWeekStart}, Setting Next=${nextWeekStart}`);
        setPickerDate(nextWeek.clone()); // Update picker display
        return nextWeek;
    });
  };

  // --- Table Generation ---
  const generateColumns = () => {
      const columns = [
          { 
              title: 'Employee', 
              dataIndex: 'employeeName', 
              key: 'employeeName', 
              fixed: 'left',
              width: 150,
          },
      ];

      for (let i = 0; i < 7; i++) {
          const currentDay = selectedWeek.clone().add(i, 'days');
          const dateKey = currentDay.format("YYYY-MM-DD");
          columns.push({
              title: currentDay.format('ddd DD/MM'),
              dataIndex: dateKey,
              key: dateKey,
              width: 150,
              onCell: (record) => ({
                className: 'schedule-cell',
                style: { 
                  position: 'relative', 
                  padding: '8px'
                },
              }),
              render: (shiftsForDay, record) => {
                const isEmptyCell = !shiftsForDay || shiftsForDay.length === 0;

                return (
                  <div 
                    className="schedule-cell-content" 
                    style={{ minHeight: '38px', height: '100%', position: 'relative' }} 
                  >
                    {!isEmptyCell && (
                        <Space direction="vertical" size={2} style={{ width: '100%' }}> 
                            {shiftsForDay.map((shiftName, index) => (
                                <Tag key={`${record.key}-${shiftName}-${index}`}>{shiftName}</Tag>
                            ))}
                        </Space>
                    )}
                    
                    <Button 
                          className="add-shift-button"
                          type="link" 
                          icon={<FaPlus />}
                          size="small"
                          onClick={() => showScheduleModal(currentDay, record.employeeName)}
                          style={{ 
                              position: 'absolute',
                              top: '4px',
                              right: '4px',
                              zIndex: 2,
                              padding: '2px'
                          }}
                      >
                      </Button>
                  </div>
                );
              },
          });
      }
      return columns;
  };

  const generateDataSource = () => {
      // Use the 'employees' state instead of the hardcoded EMPLOYEES array
      return employees.map(emp => { 
          // Make sure the properties match what you stored in the employees state (e.g., emp.name)
          const rowData = { key: emp.key, employeeName: emp.name }; 
          for (let i = 0; i < 7; i++) {
              const currentDay = selectedWeek.clone().add(i, 'days');
              const dateKey = currentDay.format("YYYY-MM-DD");
              const daySchedule = scheduleData[dateKey] || [];
              // Ensure item.employee matches the property used in rowData (emp.name)
              const assignments = daySchedule.filter(item => item.employee === emp.name);
              rowData[dateKey] = assignments.length > 0 ? assignments.map(a => a.shiftName) : null;
          }
          return rowData;
      });
  };

  const columns = generateColumns();
  const dataSource = generateDataSource();

  // --- Create function to render header for Table title prop ---
  const renderScheduleHeader = () => {
    return (
      <Row 
        justify="space-between" 
        align="middle" 
        // Remove inline styles, Table title handles spacing/styling
      >
          <Col>
              <h2 style={{ margin: 0, fontSize: '18px' }}>Employee Schedule</h2>
          </Col>
          <Col>
              <Space align="center">
                  <Button size="small" icon={<FaChevronLeft />} onClick={goToPreviousWeek} />
                  {/* Use ReactDatePicker */}
                  <ReactDatePicker 
                      selected={pickerDate.toDate()} // Pass JS Date object 
                      onChange={handleDateChange} // Use updated handler
                      dateFormat="yyyy-MM-dd" // Set format
                      className="ant-input ant-input-sm" // Style like AntD input
                      wrapperClassName="date-picker-wrapper" // Add wrapper class for potential styling
                  />
                  <Button size="small" icon={<FaChevronRight />} onClick={goToNextWeek} />
                  <Button type="primary" onClick={showShiftManagementModal} style={{ marginLeft: '8px' }}>
                      Manage Shifts
                  </Button>
              </Space>
          </Col>
      </Row>
    );
  };
  // --- End header function ---

  // --- Render ---
  const shiftManagementTitle = "Shifts";

  return (
    <>
      {/* Schedule Table View - Add title prop */} 
      <Table 
          title={renderScheduleHeader} // Use title prop
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          bordered
          loading={loadingShifts || loadingEmployees}
          scroll={{ x: 1200 }}
      />

      {/* Shift Management List Modal */}
      <Modal
        title={shiftManagementTitle}
        open={isShiftManagementModalVisible}
        onCancel={hideShiftManagementModal}
        footer={null}
        width={900}
      >
        {/* Divider placed immediately after the title bar area */}
        <Divider style={{ marginTop: 0, marginBottom: '16px' }} />

        {/* Add Button Container - below the divider */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
          <Button type="primary" onClick={showAddShiftModal}>
            <FaPlus style={{ marginRight: 8 }} /> Add
          </Button>
        </div>

        {/* Table - below the add button */}
        <Table
          columns={shiftColumns}
          dataSource={managedShifts}
          pagination={false}
          rowKey="id"
          loading={loadingShifts}
        />
      </Modal>

      {/* Use the renamed modal component */}
      <AddEditShiftModal
        open={isAddEditShiftModalVisible}
        onCancel={hideAddEditShiftModal}
        onFinish={handleAddEditShiftFinish}
        editingShift={editingShift}
        form={shiftForm}
      />

      {/* Add Employee Schedule Modal - Pass employees state */}
      <AddEmployeeScheduleModal
        open={isScheduleModalVisible}
        onCancel={hideScheduleModal}
        onFinish={handleScheduleFinish}
        selectedDate={selectedCellInfo?.date}
        selectedEmployee={selectedCellInfo?.employee}
        managedShifts={managedShifts}
        employees={employees} // Pass fetched employees
        form={scheduleForm}
      />
    </>
  );
};

export default ShiftTable;
