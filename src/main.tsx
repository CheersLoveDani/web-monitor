import ReactDOM from "react-dom/client";
import App from "./App";
import "./style.scss";
import {
  RecoilRoot,
} from 'recoil';

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RecoilRoot>
    <App />
  </RecoilRoot>
);

// App originally created by:
// _____    _    _   _ ___
// |  _ \  / \  | \ | |_ _|
// | | | |/ _ \ |  \| || |
// | |_| / ___ \| |\  || |
// |____/_/   \_|_| \_|___|