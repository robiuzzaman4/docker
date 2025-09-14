import { AllCommands } from "./components/all-commands";
import { Navbar } from "./components/navbar";

export const App = () => {
  return (
    <>
      <Navbar />
      <div className="px-2 border-b">
        <div className="w-full max-w-4xl mx-auto border-x">
          <AllCommands />
        </div>
      </div>
    </>
  );
};

export default App;
