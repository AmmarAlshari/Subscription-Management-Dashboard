import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import SubscriptionsList from "./components/SubscriptionsList";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Subscription Management Dashboard</h1>
      <SubscriptionsList />
    </>
  );
}

export default App;
