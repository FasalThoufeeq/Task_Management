import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserRoutes from "./Routes/userRoutes";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const theme =createTheme()
function App() {
  return (
    <>
     <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<UserRoutes/>} />
          {/* <Route path="*" element={<PageNotFound />} /> */}
        </Routes>
      </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
