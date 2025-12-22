import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import RightPanel from "./components/RightPanel";
import LatestSection from "./components/LatestSection";


export default function App() {
  return (
    <>
      <Sidebar />
      <Home />
      <RightPanel />
      <LatestSection />
    </>
  );
}
