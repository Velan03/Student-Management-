export type Student = {
  id: string;
  name: string;
  grade: string;
  section: string;
  parentPhone: string;
};

export type AttendanceStatus = 'present' | 'absent' | 'on_leave';

export type LeaveType = 'sick' | 'personal' | 'emergency' | null;

export type AttendanceRecord = {
  studentId: string;
  date: string;
  status: AttendanceStatus;
  leaveType?: LeaveType;
};

export type UserRole = 'student' | 'teacher' | 'admin';