import "./App.css";

import CategoryList from "./components/CategoryList";
import CategoryForm from "./components/CategoryForm";

function App() {
  return (
    <div className="app-container">
      <CategoryForm />
      <CategoryList />
    </div>
  );
}

export default App;
