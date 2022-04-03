import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/main/Main";
import Notice from "./components/main/notice/Notice";
import Product from "./components/main/product/Product";
import ProductDetail from "./components/main/product/ProductDetail";
import NoticeDetail from "./components/main/notice/NoticeDetail";
import "./index.css";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import KakaoLogin from "./components/main/login/KakaoLogin";
import Auth from "./components/main/login/Auth";
import Mypage from "./components/main/mypage/Mypage";
import Subscriptions from "./components/main/mypage/subscriptions/Subscriptions";
import AddressTab from "./components/main/mypage/address/AddressTab";
import Recommend from "./components/main/recommend/Recommend";
import Cart from "./components/main/cart/Cart";
import MyorderTab from "./components/main/mypage/myorder/MyorderTab";
import Order from "./components/main/order/Order";
import OrderCompleted from "./components/main/order/OrderCompleted";
import UserInfo from "./components/main/mypage/UserInfo/UserInfo";

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
          <Route path="/mypage/address" element={<AddressTab />} />
          <Route path="/recommend" element={<Recommend />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/mypage/myorder" element={<MyorderTab />} />
          <Route path="/order" element={<Order />} />
          <Route path="/orderCompleted" element={<OrderCompleted />} />
          <Route path="/mypage/subscriptions" element={<Subscriptions />} />
          <Route path="/mypage/userinfo" element={<UserInfo />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
