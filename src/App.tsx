import { renderRoutes } from "react-router-config";
import "./App.css";
import { NavBar } from "./components";

const App: React.FC<any> = ({route}) => {

  return (
    <div className="App">
      <NavBar/>
      {renderRoutes(route.routes)}
    </div>
  );
}

export default App;
