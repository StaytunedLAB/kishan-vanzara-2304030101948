function processAttendance(attendanceData) {
  let summary = {
    employeeId: attendanceData.employeeId,
    date: attendanceData.date,
    status: "",
    totalWorkingMinutes: 0,
    overtimeMinutes: 0,
    note: "",
    error: null
  };

  try {
    // ⏰ Helper function: time → minutes
    function timeToMinutes(time) {
      let parts = time.split(":");
      if (parts.length !== 2) throw new Error("Invalid time format");
      let hours = Number(parts[0]);
      let minutes = Number(parts[1]);
      if (isNaN(hours) || isNaN(minutes)) throw new Error("Invalid time value");
      return hours * 60 + minutes;
    }

    // ❌ Missing check-in or check-out
    if (!attendanceData.checkIn || !attendanceData.checkOut) {
      summary.status = "incomplete";
      summary.note = "Check-in or check-out missing";
      return summary;
    }

    let checkInMin = timeToMinutes(attendanceData.checkIn);
    let checkOutMin = timeToMinutes(attendanceData.checkOut);

    let breakMinutes = 0;

    // ☕ Break handling
    if (attendanceData.break) {
      if (attendanceData.break.start && attendanceData.break.end) {
        breakMinutes =
          timeToMinutes(attendanceData.break.end) -
          timeToMinutes(attendanceData.break.start);
      } else {
        breakMinutes = 30; // default break
      }
    }

    let totalMinutes = checkOutMin - checkInMin - breakMinutes;

    // ❌ Negative working time
    if (totalMinutes < 0) {
      summary.status = "invalid";
      summary.note = "Negative working time";
      return summary;
    }

    summary.totalWorkingMinutes = totalMinutes;

    // ⏱ Overtime calculation
    if (attendanceData.overtimeApproved && totalMinutes > 480) {
      summary.overtimeMinutes = totalMinutes - 480;
    }

    summary.status = "complete";
    summary.note = "Attendance calculated successfully";

  } catch (err) {
    summary.status = "error";
    summary.error = err.message;
    summary.note = "System error occurred";
  } finally {
    console.log("✅ Attendance processed successfully");
  }

  return summary;
}

/* 🔹 Sample Input */
const attendanceData = {
  employeeId: "EMP101",
  date: "2025-12-11",
  checkIn: "09:30",
  checkOut: "18:30",
  break: {
    start: "13:30",
    end: "14:00"
  },
  overtimeApproved: true
};

/* 🔹 Run */
console.log(processAttendance(attendanceData));
