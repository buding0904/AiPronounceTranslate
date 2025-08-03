import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import ctx, { useInitialAppContext } from "@/context/app";

function App() {
  const initialContext = useInitialAppContext();

  return (
    <ctx.Provider value={initialContext}>
      <Routes>
        <Route element={<IndexPage />} path="/" />
      </Routes>
    </ctx.Provider>
  );
}

export default App;
