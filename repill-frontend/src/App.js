import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/main/main";
import Notice from "./components/main/notice/notice";
import Product from "./components/main/product/product";
import Mypage from "./components/main/mypage/mypage";
import KakaoLogin from "./components/main/login/kakaologin";
import Auth from "./components/main/login/Auth";
import "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/notice" element={<Notice />} />
        <Route path="/product" element={<Product />} />
        <Route path="/mypage" element={<Mypage />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/kakaologin" exact element={<KakaoLogin />} />
        <Route path="/oauth/callback/kakao" element={<Auth />} />
      </Routes>
    </Router>
  );
}

export default App;
