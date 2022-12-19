import { Divider, Spin } from "antd";
import "antd/dist/reset.css";
import { useEffect, useState } from "react";
import "./App.css";
import EmployeLogs from "./components/EmployeLogs";
import FilterPanel from "./components/FilterPanel";
import Header from "./components/Header";
import { useQueryParam } from "./hook/useQueryParam";

function App() {
  const [data, setData] = useState();
  const [queryParams] = useQueryParam();
  const [IsLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetch("https://run.mocky.io/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f")
      .then((res) => res.json())
      .then((response) => {
        setData(response?.result);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <Spin spinning={IsLoading} size="large">
        <Header />
        <Divider />
        {data && <FilterPanel data={data} queryParams={queryParams} />}
        {data && <EmployeLogs data={data} queryParams={queryParams} />}
      </Spin>
    </div>
  );
}

export default App;
