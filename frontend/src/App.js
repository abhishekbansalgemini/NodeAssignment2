import { Route, Routes } from "react-router-dom";
import './App.css';
import CreateComponent from './Components/Create/create';
import Records from "./Components/Records/Records";

function App() {
  return (
    <Routes>
      <Route path ="/:id" element = {<CreateComponent></CreateComponent>}></Route>
      <Route path ="/" element = {<CreateComponent></CreateComponent>}></Route>
      <Route path="/record" element = {<Records></Records>}></Route>
    </Routes>
  );
}

export default App;
