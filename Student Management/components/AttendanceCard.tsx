import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AttendanceStatus, LeaveType, Student } from '../types';
import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';

type AttendanceCardProps = {
  student: Student;
  onStatusChange: (status: AttendanceStatus, leaveType?: LeaveType) => void;
};

export default function AttendanceCard({ student, onStatusChange }: AttendanceCardProps) {
  const [status, setStatus] = useState<AttendanceStatus>('present');
  const [showLeaveOptions, setShowLeaveOptions] = useState(false);

  const handleStatusChange = (newStatus: AttendanceStatus) => {
    if (newStatus === 'on_leave') {
      setShowLeaveOptions(true);
    } else {
      setStatus(newStatus);
      onStatusChange(newStatus);
    }
  };

  const handleLeaveTypeSelect = (leaveType: LeaveType) => {
    setStatus('on_leave');
    setShowLeaveOptions(false);
    onStatusChange('on_leave', leaveType);
  };

  return (
    <View style={styles.card}>
      <View style={styles.studentInfo}>
        <Text style={styles.name}>{student.name}</Text>
        <Text style={styles.grade}>Grade {student.grade}-{student.section}</Text>
      </View>
      
      <View style={styles.statusButtons}>
        <TouchableOpacity 
          style={[styles.statusButton, status === 'present' && styles.activeButton]}
          onPress={() => handleStatusChange('present')}
        >
          <MaterialIcons name="check-circle" size={24} color={status === 'present' ? '#fff' : '#4CAF50'} />
          <Text style={[styles.buttonText, status === 'present' && styles.activeText]}>Present</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.statusButton, status === 'absent' && styles.activeButton]}
          onPress={() => handleStatusChange('absent')}
        >
          <MaterialIcons name="cancel" size={24} color={status === 'absent' ? '#fff' : '#F44336'} />
          <Text style={[styles.buttonText, status === 'absent' && styles.activeText]}>Absent</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.statusButton, status === 'on_leave' && styles.activeButton]}
          onPress={() => handleStatusChange('on_leave')}
        >
          <MaterialIcons name="event-busy" size={24} color={status === 'on_leave' ? '#fff' : '#FF9800'} />
          <Text style={[styles.buttonText, status === 'on_leave' && styles.activeText]}>On Leave</Text>
        </TouchableOpacity>
      </View>

      {showLeaveOptions && (
        <View style={styles.leaveOptions}>
          <TouchableOpacity 
            style={styles.leaveButton} 
            onPress={() => handleLeaveTypeSelect('sick')}
          >
            <Text style={styles.leaveButtonText}>Sick Leave</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.leaveButton} 
            onPress={() => handleLeaveTypeSelect('personal')}
          >
            <Text style={styles.leaveButtonText}>Personal Leave</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.leaveButton} 
            onPress={() => handleLeaveTypeSelect('emergency')}
          >
            <Text style={styles.leaveButtonText}>Emergency Leave</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    margin: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  studentInfo: {
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  grade: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 4,
  },
  statusButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  statusButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    marginHorizontal: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  activeButton: {
    backgroundColor: '#2c3e50',
  },
  buttonText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#2c3e50',
  },
  activeText: {
    color: '#fff',
  },
  leaveOptions: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 12,
  },
  leaveButton: {
    padding: 12,
    backgroundColor: '#f5f6fa',
    borderRadius: 8,
    marginBottom: 8,
  },
  leaveButtonText: {
    color: '#2c3e50',
    fontSize: 14,
    textAlign: 'center',
  },
});