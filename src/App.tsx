import "./App.css";
import { CustomerTable } from "./components/CustomerTable";

function App() {
  return (
    <div className="App">
      <h3 className="text-center">Customer directory</h3>
      <CustomerTable />
    </div>
  );
}

export default App;
