import { ConfigProvider } from "antd";
import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Colors from "styles/Colors";
import GlobalStyles from "styles/GlobalStyles";
import storage from "utils/storage";
import "./App.css";
import ErrorBoundary from "./components/ErrorBoundary";
import Routes from "./routes";

const App: FC = () => {
  const navigate = useNavigate();
  const { activeLanguage } = useSelector((state: any) => state.app);
  const loginOccured = () => {
    const pathname = window.location.pathname;
    if (!storage.getToken()) {
      if (pathname === "/") {
        return navigate("/login");
      }
    } else {
      if (pathname === "/") {
        navigate("/dashboard");
      }
    }
  };

  useEffect(() => {
    loginOccured();
  }, []);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: Colors.Primary,
        },
      }}
      direction={activeLanguage !== "ar" ? "ltr" : "rtl"}
    >
      <ErrorBoundary>
        <GlobalStyles />
        <Routes />
      </ErrorBoundary>
    </ConfigProvider>
  );
};

export default App;
