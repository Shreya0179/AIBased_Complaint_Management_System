import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {

  return (

    <BrowserRouter>

      <div className="container">

        <h1>
          AI Complaint Management System
        </h1>

        <nav
          style={{
            marginBottom: "20px",
          }}
        >

          <Link to="/">
            Login
          </Link>

          {" | "}

          <Link to="/signup">
            Signup
          </Link>

          {" | "}

          <Link to="/dashboard">
            Dashboard
          </Link>

        </nav>

      </div>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;