import { Provider } from "react-redux";
import { store } from "./store";
import "./styles.css";
import Search from "./components/search";

export default function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Search />
      </Provider>
    </div>
  );
}
