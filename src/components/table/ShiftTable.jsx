import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  Modal,
  Table,
  Form,
  Space,
  Popconfirm,
  Divider,
  App,
  Row,
  Col,
  Tooltip
} from "antd";
import moment from "moment";
import { FaPlus, FaPencilAlt, FaRegTrashAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { CloseOutlined } from '@ant-design/icons';
import "../../style/shift.table.css";
import AddEditShiftModal from "../modal/AddEditShiftModal";
import AddEmployeeScheduleModal from "../modal/AddEmployeeScheduleModal";
import { UserContext } from "../../context/Context";

// Import API functions
import {
  getAllShifts,
  createShift,
  updateShift,
  deleteShift,
  getAllEmployee,
  getAllWorkingShifts,
  addWorkingShift,
  deleteWorkingShift
} from "../../api/api";

import ReactDatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";

const ShiftTable = () => {
  const { message, notification } = App.useApp(); 
  const { user } = useContext(UserContext);

  const [managedShifts, setManagedShifts] = useState([]); 
  const [loadingShifts, setLoadingShifts] = useState(false); 
  const [employees, setEmployees] = useState([]); 
  const [loadingEmployees, setLoadingEmployees] = useState(false); 
  const [isShiftManagementModalVisible, setIsShiftManagementModalVisible] = useState(false);
  const [isAddEditShiftModalVisible, setIsAddEditShiftModalVisible] = useState(false);
  const [editingShift, setEditingShift] = useState(null);
  const [shiftForm] = Form.useForm(); 

  const [isScheduleModalVisible, setIsScheduleModalVisible] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState(moment().startOf('isoWeek'));
  const [pickerDate, setPickerDate] = useState(moment());
  const [selectedCellInfo, setSelectedCellInfo] = useState(null);
  const [scheduleData, setScheduleData] = useState({}); 
  const [scheduleForm] = Form.useForm();
  const [loadingSchedule, setLoadingSchedule] = useState(false); 

  // Fetch Shifts & Employees
  useEffect(() => {
    fetchShifts();
    fetchEmployees();
  }, []);

  // Fetch Schedule Data *after* Shifts and Employees are loaded
  useEffect(() => {
    // Only fetch schedule if have shifts and employees loaded
    if (managedShifts.length > 0 && employees.length > 0) {
      console.log("Shifts and Employees loaded, fetching schedule data...");
      fetchScheduleData();
    } else {
      console.log("Skipping schedule fetch: Shifts or Employees not ready yet.");
    }
  }, [managedShifts, employees]);

  const fetchShifts = async () => {
    setLoadingShifts(true);
    console.log("Fetching shifts...");
    try {
      const res = await getAllShifts();
      console.log("API Response:", res);

      if (res && res.data) {
        console.log("Raw data from response:", res.data);

        const formattedData = res.data.map(shift => ({
          key: shift.id,
          id: shift.id,
          name: shift.Name || shift.name || `Shift ${shift.id}`, 
          startTime: shift.startTime || '--:--',
          endTime: shift.endTime || '--:--'
        }));
        console.log("Formatted data for state:", formattedData);
        
        setManagedShifts(formattedData);

      } else {
         message.error(res?.message || "Failed to fetch shifts");
         console.log("API call successful but no data found or error message:", res?.message);
         setManagedShifts([]); // Clear shifts if fetch failed
      }
    } catch (error) {
      console.error("Error fetching shifts:", error);
      notification.error({ message: "Error", description: "Could not fetch shifts." });
      setManagedShifts([]); // Clear shifts on error
    }
    setLoadingShifts(false);
  };

  const fetchEmployees = async () => {
    setLoadingEmployees(true);
    console.log("Fetching employees...");
    try {
      const res = await getAllEmployee();
      console.log("Employee API Response:", res);

      if (res && res.data) {
        const staffEmployees = res.data.filter(emp => emp.role === "STAFF"); 
        console.log("Filtered Staff Employees:", staffEmployees);

        const formattedEmployees = staffEmployees.map(emp => ({
          key: emp.id, 
          id: emp.id, 
          name: emp.fullName || emp.name 
        }));
        console.log("Formatted staff employees:", formattedEmployees);
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

  // Fetch Schedule Data
  const fetchScheduleData = async () => {
    setLoadingSchedule(true);
    console.log("Fetching schedule data...");
    try {
      const res = await getAllWorkingShifts();
      console.log("Schedule API Response:", res);

      if (res && res.data) {
        const newScheduleData = {};
        res.data.forEach(item => {
          const dateKey = moment(item.workDate).format("YYYY-MM-DD"); 
          const employee = employees.find(e => e.id === item.empID); 
          const shift = managedShifts.find(s => s.id === item.shiftID); 

          if (employee && shift) {
            if (!newScheduleData[dateKey]) {
              newScheduleData[dateKey] = [];
            }
            newScheduleData[dateKey].push({
              employee: employee.name,      
              employeeId: item.empID,       
              shiftName: shift.name,        
              shiftId: item.shiftID,         
              startTime: shift.startTime,
              endTime: shift.endTime    
            });
          } else {
            // Warning if the corresponding employee or shift wasn't found in the component's state
            console.warn(`Schedule Warning: Could not find matching state for assignment - Employee ID: ${item.empID}, Shift ID: ${item.shiftID} on ${dateKey}. Ensure they exist and are loaded.`);
          }
        });
        console.log("Formatted schedule data:", newScheduleData);
        setScheduleData(newScheduleData);
      } else {
        // Handle cases where API call is successful but returns no data, or has an error message
        if (res?.message) {
          message.error(res.message);
        } else if (res && !res.data) {
          console.log("No schedule data found."); 
          setScheduleData({}); // Clear existing schedule if needed
        } else {
          message.error("Failed to fetch schedule data."); // Generic error
        }
      }
    } catch (error) {
      console.error("Error fetching schedule data:", error);
      notification.error({ message: "Error", description: "Could not fetch schedule data." });
    } finally { // Use finally to ensure loading state is always turned off
        setLoadingSchedule(false);
    }
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
    // Reset form fields when opening the modal
    scheduleForm.resetFields(); 
    setSelectedCellInfo({ date, employee });
    setIsScheduleModalVisible(true);
  };

  const hideScheduleModal = () => {
    setIsScheduleModalVisible(false);
    setSelectedCellInfo(null);
    scheduleForm.resetFields(); // Also reset form on cancel
  };

  // Updated handleScheduleFinish to use API
  const handleScheduleFinish = async (values) => { // Make async
    if (!selectedCellInfo) return;

    setLoadingSchedule(true); // Use schedule loading state

    // Find the employee object by name to get the ID
    const employee = employees.find(emp => emp.name === selectedCellInfo.employee);
    if (!employee) {
      message.error(`Employee '${selectedCellInfo.employee}' not found.`);
      setLoadingSchedule(false);
      return;
    }

    // Get the shiftId from the form values (assuming values.shiftKey is the ID)
    const shiftId = values.shiftKey; 
    if (!shiftId) {
        message.error("Shift selection is required.");
        setLoadingSchedule(false);
        return;
    }

    // Format the date for the API as ISO 8601 UTC string (start of day)
    const workDate = selectedCellInfo.date.utc().format(); // e.g., "2024-04-05T00:00:00Z"

    // Construct the payload matching the required backend format
    const payload = {
      empID: employee.id, 
      shiftID: shiftId,    
      workDate: workDate  
    };

    console.log("Attempting to add working shift with payload:", payload);

    try {
      const res = await addWorkingShift(payload);
      console.log("Add Working Shift API Response:", res);

      if (res && (res.status === 200 || res.status === 201 || res.statusCode === 200 || res.statusCode === 201 || res.isSuccessStatusCode)) { 
        message.success(res.message || "Shift assigned successfully!");
        hideScheduleModal();
        fetchScheduleData(); // Refresh the schedule data from the API
      } else {
        // Handle API errors indicated in the response body
        message.error(res?.message || "Failed to assign shift. Please check details.");
      }
    } catch (error) {
      console.error("Error assigning shift:", error);
      // Handle network errors or exceptions during the API call
      notification.error({
        message: "Error",
        description: error.response?.data?.message || "Could not assign shift.",
      });
    } finally {
        setLoadingSchedule(false);
    }
  };

  // --- Handle Schedule Deletion ---
  const handleDeleteSchedule = async (employeeId, shiftId, workDateMoment) => {
    if (!employeeId || !shiftId || !workDateMoment) {
      console.error("Missing information for schedule deletion.");
      message.error("Could not delete schedule: Missing information.");
      return;
    }

    setLoadingSchedule(true);
    const workDate = workDateMoment.utc().format(); // Format date as ISO UTC string
    console.log(`Attempting to delete working shift: EmpID=${employeeId}, ShiftID=${shiftId}, Date=${workDate}`);

    try {
      // Make sure the API function name matches the import
      const res = await deleteWorkingShift(employeeId, shiftId, workDate);
      console.log("Delete Working Shift API Response:", res);

      // Adjust success condition based on your actual API response
      if (res && (res.status === 200 || res.status === 204 || res.statusCode === 200 || res.statusCode === 204 || res.isSuccessStatusCode)) {
        message.success(res.message || "Shift assignment deleted successfully!");
        fetchScheduleData(); // Refresh the schedule data
      } else {
        message.error(res?.message || "Failed to delete shift assignment.");
      }
    } catch (error) {
      console.error("Error deleting shift assignment:", error);
      notification.error({
        message: "Error",
        description: error.response?.data?.message || "Could not delete shift assignment.",
      });
    } finally {
      setLoadingSchedule(false);
    }
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

  // --- Table Generation (Remove Color Prop from Tag) ---
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
              width: 200,
              onCell: (record) => ({
                className: 'schedule-cell',
                style: { 
                  position: 'relative', 
                  padding: '8px'
                },
              }),
              render: (assignmentsForDay, record) => {
                const isEmptyCell = !assignmentsForDay || assignmentsForDay.length === 0;

                return (
                  <div 
                    className="schedule-cell-content" 
                    style={{ minHeight: '38px', height: '100%', position: 'relative' }} 
                  >
                    {!isEmptyCell && (
                        <Space direction="vertical" size={4} style={{ width: '100%' }}>
                            {assignmentsForDay.map((assignment, index) => {
                                const tooltipTitle = `${assignment.startTime || 'N/A'} - ${assignment.endTime || 'N/A'}`;
                                return (
                                    <Tooltip title={tooltipTitle} placement="top">
                                        <div 
                                            key={`${record.key}-${assignment.shiftId}-${index}`}
                                            className="shift-assignment-item" 
                                            style={{ display: 'inline-flex', alignItems: 'center'}}
                                        >
                                            <span style={{ marginRight: '8px' }}>{assignment.shiftName}</span>
                                            
                                            {/* Delete Icon - Only for ADMIN */}
                                            {user?.role === 'ADMIN' && (
                                              <Popconfirm
                                                  title="Delete Assignment?"
                                                  description={`Remove ${assignment.shiftName} for ${assignment.employee} on ${currentDay.format("DD/MM")}?`}
                                                  onConfirm={() => handleDeleteSchedule(assignment.employeeId, assignment.shiftId, currentDay)}
                                                  okText="Yes"
                                                  cancelText="No"
                                                  placement="right"
                                              >
                                                  <CloseOutlined 
                                                      className="delete-assignment-icon"
                                                      style={{ 
                                                          fontSize: '12px', 
                                                          fontWeight: 'bold'
                                                      }}
                                                      onClick={(e) => e.stopPropagation()}
                                                  />
                                              </Popconfirm>
                                            )}
                                        </div>
                                    </Tooltip>
                                );
                            })}
                        </Space>
                    )}
                    
                    {/* Add Shift Button - Only for ADMIN */}
                    {user?.role === 'ADMIN' && (
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
                    )}
                  </div>
                );
              },
          });
      }
      return columns;
  };

  const generateDataSource = () => {
      return employees.map(emp => {
          const rowData = { key: emp.key, employeeName: emp.name }; 
          for (let i = 0; i < 7; i++) {
              const currentDay = selectedWeek.clone().add(i, 'days');
              const dateKey = currentDay.format("YYYY-MM-DD");
              const daySchedule = scheduleData[dateKey] || [];
              // Get the full assignment objects for this employee on this day
              const assignments = daySchedule.filter(item => item.employeeId === emp.id);
              // Store the array of assignment objects directly
              rowData[dateKey] = assignments.length > 0 ? assignments : null; 
          }
          return rowData;
      });
  };

  const columns = generateColumns();
  const dataSource = generateDataSource();

  // --- Create function to render header for Table title prop ---
  const renderScheduleHeader = () => {
    return (
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col>
          <h2 style={{ margin: 0, fontSize: '18px' }}>Employee Schedule</h2>
        </Col>
        <Col>
          <Space align="center">
            <Button size="small" icon={<FaChevronLeft />} onClick={goToPreviousWeek} />
            <ReactDatePicker 
                selected={pickerDate.toDate()}
                onChange={handleDateChange}
                dateFormat="yyyy-MM-dd"
                className="ant-input ant-input-sm"
                wrapperClassName="date-picker-wrapper"
            />
            <Button size="small" icon={<FaChevronRight />} onClick={goToNextWeek} />
            {user?.role === 'ADMIN' && (
              <Button type="primary" onClick={showShiftManagementModal} style={{ marginLeft: '8px' }}>
                  Manage Shifts
              </Button>
            )}
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
      <Table 
          title={renderScheduleHeader}
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          bordered
          loading={loadingShifts || loadingEmployees || loadingSchedule}
          scroll={{ x: 1200 }}
      />

      <Modal
        title={shiftManagementTitle}
        open={isShiftManagementModalVisible}
        onCancel={hideShiftManagementModal}
        footer={null}
        width={900}
      >
        <Divider style={{ marginTop: 0, marginBottom: '16px' }} />

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
          <Button type="primary" onClick={showAddShiftModal}>
            <FaPlus style={{ marginRight: 8 }} /> Add
          </Button>
        </div>

        <Table
          columns={shiftColumns}
          dataSource={managedShifts}
          pagination={false}
          rowKey="id"
          loading={loadingShifts}
        />
      </Modal>

      <AddEditShiftModal
        open={isAddEditShiftModalVisible}
        onCancel={hideAddEditShiftModal}
        onFinish={handleAddEditShiftFinish}
        editingShift={editingShift}
        form={shiftForm}
      />

      <AddEmployeeScheduleModal
        open={isScheduleModalVisible}
        onCancel={hideScheduleModal}
        onFinish={handleScheduleFinish}
        selectedDate={selectedCellInfo?.date}
        selectedEmployee={selectedCellInfo?.employee}
        managedShifts={managedShifts}
        employees={employees}
        form={scheduleForm}
      />
    </>
  );
};

export default ShiftTable;