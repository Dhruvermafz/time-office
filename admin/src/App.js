import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Common/Header";
import MainNav from "./components/Common/MainNav";
import Footer from "./components/Common/Footer";
import StatsRow from "./components/Statistics/StatsRow";
import "./assets/css/app.min.css";
function App() {
  return (
    <div className="wrapper">
      <Header />
      <MainNav />

      <div className="page-content">
        <StatsRow />
        <Footer />
      </div>
    </div>
  );
}

export default App;