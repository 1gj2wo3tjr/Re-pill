import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import Main from "./pages/main/main"
import Notice from "./components/main/notice/Notice"
import Product from "./components/main/product/product"
import Login from "./components/main/login/login"
import NoticeDetail from "./components/main/notice/NoticeDetail"
import "./index.css"
import Navbar from "../src/components/common/navbar"
import Footer from "../src/components/common/footer"

function App() {
  return (
    <Router>
      <Navbar />
      <div id="wrapper">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/product" element={<Product />} />
          <Route path="/login" element={<Login />} />
          <Route path="/notice/:id" element={<NoticeDetail />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
