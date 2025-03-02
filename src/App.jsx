import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/auth/Login.jsx';
import StudentLayout from './components/student/Layout.jsx';
import StudentHome from "./components/student/Dashboard.jsx";
import StudentAssignments from "./components/student/Assignments.jsx";
import ParentDashboard from './components/parent/Dashboard.jsx';
import TeacherDashboard from './components/teacher/Layout.jsx';
import Assignments from './components/teacher/Assignments.jsx';
import Dashboard from './components/teacher/Dashboard.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Teacher Dashboard with Nested Routes */}
        <Route path="/dashboard/teacher" element={<TeacherDashboard />}>
          <Route index element={<Dashboard />} /> {/* Default page */}
          <Route path="assignments" element={<Assignments />} /> {/* Assignments page */}
        </Route>

        {/* Student Dashboard with Nested Routes */}
        <Route path="/dashboard/student" element={<StudentLayout />}>
          <Route index element={<StudentHome />} /> {/* Default page */}
          <Route path="assignments" element={<StudentAssignments />} /> {/* Assignments page */}
        </Route>

        {/* Parent Dashboard */}
        <Route path="/dashboard/parent" element={<ParentDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
