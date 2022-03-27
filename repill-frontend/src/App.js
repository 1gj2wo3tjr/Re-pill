import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/main/Main";
import Notice from "./components/main/notice/Notice";
import Product from "./components/main/product/Product";
import NoticeDetail from "./components/main/notice/NoticeDetail";
import "./index.css";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import KakaoLogin from "./components/main/login/KakaoLogin";
import Auth from "./components/main/login/Auth";
import Mypage from "./components/main/mypage/Mypage";
import Recommend from "./components/main/recommend/Recommend";

function App() {
  return (
    <Router>
      <Navbar />
      <div id="wrapper">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/product" element={<Product />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/kakaologin" exact element={<KakaoLogin />} />
          <Route path="/oauth/callback/kakao" element={<Auth />} />
          <Route path="/notice/:id" element={<NoticeDetail />} />
          <Route path="/recommend" element={<Recommend />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
