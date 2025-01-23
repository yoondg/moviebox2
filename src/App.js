import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import HomePage from "./pages/HomePage/HomePage";
import MoviePage from "./pages/Movies/MoviePage";
import MovieDetailPage from "./pages/MovieDetail/MovieDetailPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import MyPage from "./pages/MyPage/MyPage";
import TvDetailPage from "./pages/TvDetailPage/TvDetailPage";
import PopularTVSlide from "./pages/HomePage/components/PopularTVSlide/PopularTVSlide"; // 추가
import "./style/custom.style.css";

function App() {
  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          position: "absolute",
          backgroundImage: `url(${process.env.PUBLIC_URL}/images/bg.png)`,
          width: "100%",
          height: "100vh",
          backgroundSize: "cover",
          backgroundPosition: "center 150px",
          backgroundRepeat: "no-repeat",
          zIndex: "-1",
          filter: "blur(5px)",
        }}
      ></div>
      <Routes style={{ position: "relative", zIndex: "2" }}>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="movies">
            <Route index element={<MoviePage />} />
            <Route path=":id" element={<MovieDetailPage />} />
          </Route>
          <Route path="mypage" element={<MyPage />} />
          <Route path="tv/popular" element={<PopularTVSlide />} /> 
          <Route path="/tv/:tvId" element={<TvDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
