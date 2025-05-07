import { View, StyleSheet, ScrollView } from 'react-native';
import AttendanceCard from '../components/AttendanceCard';
import { AttendanceStatus, LeaveType, Student } from '../types';
import { toast } from 'sonner-native';

// Mock data
const MOCK_STUDENTS: Student[] = [
  { id: '1', name: 'John Doe', grade: '10', section: 'A', parentPhone: '+1234567890' },
  { id: '2', name: 'Jane Smith', grade: '10', section: 'A', parentPhone: '+1234567891' },
  { id: '3', name: 'Mike Johnson', grade: '10', section: 'A', parentPhone: '+1234567892' },
];

export default function HomeScreen() {
  const handleAttendanceChange = (studentId: string, status: AttendanceStatus, leaveType?: LeaveType) => {
    // In a real app, this would make an API call
    console.log('Attendance updated:', { studentId, status, leaveType });
    
    // Mock notification
    toast.success('Attendance marked successfully!');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {MOCK_STUDENTS.map((student) => (
          <AttendanceCard
            key={student.id}
            student={student}
            onStatusChange={(status, leaveType) => 
              handleAttendanceChange(student.id, status, leaveType)
            }
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  scrollContent: {
    padding: 16,
  },
});