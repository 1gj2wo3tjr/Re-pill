import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import Main from "./pages/main/main"
import Notice from "./components/main/notice/notice"
import Product from "./components/main/product/product"
import Login from "./components/main/login/login"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/notice" element={<Notice />} />
        <Route path="/product" element={<Product />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
