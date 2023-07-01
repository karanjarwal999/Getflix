import {ChakraProvider } from "@chakra-ui/react";
import MainRoutes from "./Routes/MainRoutes";


function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <MainRoutes />
      </div>
    </ChakraProvider>
  );
}

export default App;
