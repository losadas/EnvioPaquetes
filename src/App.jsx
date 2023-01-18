import "./App.css";
import Rutas from "./Router";
import { AuthContextProvider } from "./context/AuthContext";

function App() {

  return (
    <AuthContextProvider>
      <Rutas />
    </AuthContextProvider>
  );
}

export default App;
