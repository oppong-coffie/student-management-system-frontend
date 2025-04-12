import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/auth/Login.jsx';
import StudentLayout from './components/student/Layout.jsx';
import StudentHome from "./components/student/Dashboard.jsx";
import StudentAssignments from "./components/student/Assignments.jsx";
import ParentDashboard from './components/parent/Dashboard.jsx';
import TeacherDashboard from './components/teacher/Layout.jsx';
import Assignments from './components/teacher/Assignments.jsx';
import Dashboard from './components/teacher/Dashboard.jsx';
import ParentLayout from './components/parent/Layout.jsx';
import Parentassignment from './components/parent/Assignments.jsx';
import './App.css';

function App() {
  return (
   <Router>
  <Routes>
    <Route path="/" element={<Login />} />

    {/* Teacher Dashboard with Nested Routes */}
    <Route path="/dashboard/teacher" element={<TeacherDashboard />}>
      <Route index element={<Dashboard />} />
      <Route path="assignments" element={<Assignments />} />
    </Route>

    {/* Student Dashboard with Nested Routes */}
    <Route path="/dashboard/student" element={<StudentLayout />}>
      <Route index element={<StudentHome />} />
      <Route path="assignments" element={<StudentAssignments />} />
    </Route>

    {/* Parent Dashboard */}
    <Route path="/dashboard/parent" element={<ParentLayout />} >
    <Route index element={<ParentDashboard />} />
    <Route path="parentassignments" element={<Parentassignment />} />
    </Route>
  </Routes>
</Router>

  );
}

export default App;
