import { Route, Routes } from "react-router-dom";
import Experience from "./Pages/Experience";
import Landing from "./Pages/Landing";
import PersonalInfo from "./Pages/PersonalInfo";
import { useState } from "react";
import Education from "./Pages/Education";
import ResumeFinal from "./Pages/ResumeFinal";

function App() {
  const [binaryImage, setBinaryImage] = useState();

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/personalinfo"
          element={<PersonalInfo setBinaryImage={setBinaryImage} />}
        />
        <Route path="/experience" element={<Experience />} />
        <Route
          path="/education"
          element={<Education binaryImage={binaryImage} />}
        />
        <Route path="/resumefinal" element={<ResumeFinal />} />
      </Routes>
    </div>
  );
}

export default App;
