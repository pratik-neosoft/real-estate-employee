import { Divider } from "antd";
import "antd/dist/reset.css";
import { useEffect, useState } from "react";
import "./App.css";
import EmployeLogs from "./components/EmployeLogs";
import FilterPanel from "./components/FilterPanel";
import Header from "./components/Header";

function App() {
  const [data, setData] = useState();
  useEffect(() => {
    fetch("https://run.mocky.io/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f")
      .then((res) => res.json())
      .then((response) => {
        setData(response?.result);
      });
  }, []);

  return (
    <div className="App">
      <Header />
      <Divider />
      {data && <FilterPanel data={data} />}
      {data && <EmployeLogs data={data} />}
    </div>
  );
}

export default App;
