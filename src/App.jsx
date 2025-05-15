import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/auth/Login.jsx';
import StudentLayout from './components/student/Layout.jsx';
import StudentLiveClassesPage from './components/student/StudentLiveClassesPage.jsx';
import StudentHome from "./components/student/Dashboard.jsx";
import StudentAssignments from "./components/student/Assignments.jsx";
import Materials from "./components/student/Materials.jsx";
import ParentDashboard from './components/parent/Dashboard.jsx';
import ParentMaterialsPage from "./components/parent/Resources.jsx";
import TeacherDashboard from './components/teacher/Layout.jsx';
import Resources from './components/teacher/Resources.jsx';
import UploadResource from './components/teacher/UploadResources.jsx';
import Addstudent from './components/teacher/EnrolForms.jsx';
import Manageclass from './components/teacher/Manageclass.jsx';
import Assignments from './components/teacher/Assignments.jsx';
import Dashboard from './components/teacher/Dashboard.jsx';
import DetailledStudent from './components/teacher/DetailedStudent.jsx';
import ParentLayout from './components/parent/Layout.jsx';
import Parentassignment from './components/parent/Assignments.jsx';
import './App.css';
import TeacherLiveClasses from "./components/teacher/Liveclass.jsx";
import TeacherAddLiveClasses from "./components/teacher/Addliveclass.jsx";

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
    </Route>

    {/* Student Dashboard with Nested Routes */}
    <Route path="/dashboard/student" element={<StudentLayout />}>
      <Route index element={<StudentHome />} />
      <Route path="assignments" element={<StudentAssignments />} />
      <Route path="materials" element={<Materials />} />
      <Route path="classroom" element={<StudentLiveClassesPage />} />
    </Route>

    {/* Parent Dashboard */}
    <Route path="/dashboard/parent" element={<ParentLayout />} >
    <Route index element={<ParentDashboard />} />
    <Route path="parentassignments" element={<Parentassignment />} />
    <Route path="resources" element={<ParentMaterialsPage />} />
    </Route>
  </Routes>
</Router>

  );
}

export default App;
