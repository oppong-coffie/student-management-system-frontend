import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/auth/Login.jsx';
import StudentLayout from './components/student/Layout.jsx';
import StudentLiveClassesPage from './components/student/StudentLiveClassesPage.jsx';
import StudentHome from "./components/student/Dashboard.jsx";
import StudentTimetablePage from "./components/student/StudentTimetablePage.jsx";
import StudentResultsPage from "./components/student/StudentResultsPage.jsx";
import Studentnotifications from "./components/student/Notifications.jsx";
import StudentAssignments from "./components/student/Assignments.jsx";
import Materials from "./components/student/Materials.jsx";
import ParentDashboard from './components/parent/Dashboard.jsx';
import ParentResult from './components/parent/ParentResultsPage.jsx'
import ParentAttendancePage from './components/parent/ParentAttendancePage.jsx'
import ParentMaterialsPage from "./components/parent/Resources.jsx";
import ParentTimetablePage from "./components/parent/ParentTimetablePage.jsx";
import TeacherDashboard from './components/teacher/Layout.jsx';
import Notifications from './components/teacher/TeacherNotificationPage.jsx';
import Resources from './components/teacher/Resources.jsx';
import UploadResource from './components/teacher/UploadResources.jsx';
import Addstudent from './components/teacher/EnrolForms.jsx';
import EditableTimetablePage from './components/teacher/Timetable.jsx';
import Results from './components/teacher/TeacherUploadResults.jsx';
import Manageclass from './components/teacher/Manageclass.jsx';
import Assignments from './components/teacher/Assignments.jsx';
import Dashboard from './components/teacher/Dashboard.jsx';
import DetailledStudent from './components/teacher/DetailedStudent.jsx';
import ParentLayout from './components/parent/Layout.jsx';
import Parentassignment from './components/parent/Assignments.jsx';
import './App.css';
import TeacherLiveClasses from "./components/teacher/Liveclass.jsx";
import TeacherAddLiveClasses from "./components/teacher/Addliveclass.jsx";
import TeacherAttendancePage from "./components/teacher/TeacherAttendancePage.jsx";
import Theory from "./components/teacher/theory.jsx";

function App() {
  return (
   <Router>
  <Routes>
    <Route path="/" element={<Login />} />

    {/* Teacher Dashboard with Nested Routes */}
    <Route path="/dashboard/teacher" element={<TeacherDashboard />}>
      <Route index element={<Dashboard />} />
      <Route path="assignments" element={<Assignments />} />
      <Route path="manageclass" element={<Manageclass />} />
      <Route path="resources" element={<Resources />} />
      <Route path="addresource" element={<UploadResource />} />
      <Route path="liveclass" element={<TeacherLiveClasses />} />
      <Route path="addliveclass" element={<TeacherAddLiveClasses />} />
      <Route path="studentdetails/:id" element={<DetailledStudent />} />
      <Route path="addstudent" element={<Addstudent />} />
      <Route path="teachertimetable" element={<EditableTimetablePage  />} />
      <Route path="notifications" element={<Notifications  />} />
      <Route path="results" element={<Results  />} />
      <Route path="attendance" element={<TeacherAttendancePage />} />
      <Route path="theory" element={<Theory />} />
    </Route>

    {/* Student Dashboard with Nested Routes */}
    <Route path="/dashboard/student" element={<StudentLayout />}>
      <Route index element={<StudentHome />} />
      <Route path="assignments" element={<StudentAssignments />} />
      <Route path="materials" element={<Materials />} />
      <Route path="classroom" element={<StudentLiveClassesPage />} />
      <Route path="studenttimetable" element={<StudentTimetablePage />} />
      <Route path="studentresult" element={<StudentResultsPage />} />
      <Route path="studentnotifications" element={<Studentnotifications />} />
    </Route>

    {/* Parent Dashboard */}
    <Route path="/dashboard/parent" element={<ParentLayout />} >
    <Route index element={<ParentDashboard />} />
    <Route path="parentassignments" element={<Parentassignment />} />
    <Route path="resources" element={<ParentMaterialsPage />} />
    <Route path="parenttimetable" element={<ParentTimetablePage />} />
    <Route path="parentresult" element={<ParentResult />} />
    <Route path="parentattendance" element={<ParentAttendancePage />} />
    </Route>
  </Routes>
</Router>

  );
}

export default App;
