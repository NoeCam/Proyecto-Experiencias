import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import RecoverPassword from "./pages/RecoverPassword";
import NewPassword from "./pages/NewPassword";
import Experiences from "./pages/Experiences";
import ExperienceById from "./pages/ExperienceById";
import ExperienceState from "./pages/ExperienceState";

function App() {
  return (
    <>
      <Routes>
        <Route path="/users/register" element={<Register />} />
        <Route path="/users/login" element={<Login />} />
        <Route path="/users/recover-password" element={<RecoverPassword />} />
        <Route path="/users/password" element={<NewPassword />} />
        <Route path="/experiencias" element={<Experiences />} />
        <Route
          path="/experiencias/:experienceId"
          element={<ExperienceById />}
        />
        <Route
          path="/experiencias/:experienceId/experienceState"
          element={<ExperienceState />}
        />
      </Routes>
    </>
  );
}

export default App;
