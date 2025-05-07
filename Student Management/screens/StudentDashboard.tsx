import { View, Text, StyleSheet, ScrollView, Image, Pressable, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useMemo, useState, useRef, useEffect } from 'react';
import MoodSelector from '../components/MoodSelector';
import XPProgress from '../components/XPProgress';
import Mascot from '../components/Mascot';
import HomeworkSnap from '../components/HomeworkSnap';

// Mock data for the dashboard
const MOCK_STUDENT = {
  id: '1',
  name: 'John Doe',
  grade: '10',
  section: 'A',
  attendance: '95%',
  profilePic: 'https://api.a0.dev/assets/image?text=student%20profile%20picture%20professional%20clean&seed=123',
  subjects: ['Mathematics', 'Science', 'English', 'History']
};

const MOCK_HOMEWORK = [
  { id: '1', subject: 'Mathematics', title: 'Quadratic Equations', dueDate: '2025-05-10', status: 'pending' },
  { id: '2', subject: 'Science', title: 'Lab Report: Photosynthesis', dueDate: '2025-05-09', status: 'completed' },
  { id: '3', subject: 'English', title: 'Essay: Modern Literature', dueDate: '2025-05-11', status: 'pending' },
];

const MOCK_ANNOUNCEMENTS = [
  { id: '1', title: 'Parent-Teacher Meeting', date: '2025-05-15', priority: 'high' },
  { id: '2', title: 'Sports Day', date: '2025-05-20', priority: 'medium' },
];

export default function StudentDashboard() {
  const today = useMemo(() => new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  }), []);

  const renderHomeworkItem = ({ id, subject, title, dueDate, status }) => (
    <Pressable 
      key={id} 
      style={[styles.homeworkCard, status === 'completed' && styles.homeworkCompleted]}
    >
      <View style={styles.homeworkIcon}>
        <MaterialIcons 
          name={status === 'completed' ? "check-circle" : "assignment"} 
          size={24} 
          color={status === 'completed' ? "#4CAF50" : "#1a73e8"} 
        />
      </View>
      <View style={styles.homeworkContent}>
        <Text style={styles.homeworkSubject}>{subject}</Text>
        <Text style={styles.homeworkTitle}>{title}</Text>
        <Text style={styles.homeworkDue}>Due: {dueDate}</Text>
      </View>
      <MaterialIcons name="chevron-right" size={24} color="#757575" />
    </Pressable>
  );  return (
    <ScrollView 
      style={styles.container} 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      <LinearGradient
        colors={['#1a73e8', '#6c5ce7']}
        style={styles.header}
      >
        <View style={styles.profileSection}>
          <Image 
            source={{ uri: MOCK_STUDENT.profilePic }}
            style={styles.profilePic}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.nameText}>{MOCK_STUDENT.name}</Text>
            <Text style={styles.dateText}>{today}</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Ionicons name="school" size={24} color="#1a73e8" />
          <Text style={styles.statValue}>{MOCK_STUDENT.attendance}</Text>
          <Text style={styles.statLabel}>Attendance</Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="book" size={24} color="#4CAF50" />
          <Text style={styles.statValue}>8/10</Text>
          <Text style={styles.statLabel}>Assignments</Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="trophy" size={24} color="#FF9800" />
          <Text style={styles.statValue}>Good</Text>
          <Text style={styles.statLabel}>Performance</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today's Homework</Text>
        <View style={styles.homeworkContainer}>
          {MOCK_HOMEWORK.map(renderHomeworkItem)}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Announcements</Text>
        {MOCK_ANNOUNCEMENTS.map(announcement => (
          <View key={announcement.id} style={styles.announcementCard}>
            <View style={[styles.priorityIndicator, { 
              backgroundColor: announcement.priority === 'high' ? '#ff4757' : '#ffa502'
            }]} />
            <View style={styles.announcementContent}>
              <Text style={styles.announcementTitle}>{announcement.title}</Text>
              <Text style={styles.announcementDate}>{announcement.date}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  header: {
    padding: 20,
    paddingTop: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: 'white',
  },
  profileInfo: {
    marginLeft: 15,
  },
  welcomeText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
  nameText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  dateText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    marginTop: -30,
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    width: '30%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
    color: '#2c3e50',
  },
  statLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    marginTop: 4,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  homeworkContainer: {
    gap: 10,
  },
  homeworkCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  homeworkCompleted: {
    backgroundColor: '#f8f9fa',
  },
  homeworkIcon: {
    marginRight: 15,
  },
  homeworkContent: {
    flex: 1,
  },
  homeworkSubject: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  homeworkTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
  },
  homeworkDue: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  announcementCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  priorityIndicator: {
    width: 4,
    height: '100%',
    borderRadius: 2,
    marginRight: 15,
  },
  announcementContent: {
    flex: 1,
  },
  announcementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
  },
  announcementDate: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
});