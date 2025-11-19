import React, { useState, useEffect } from "react";
import SubscriptionsList from "./components/SubscriptionsList";
import AddSubscription from "./components/AddSubscription";
import { getSubscriptions, Subscription } from "./api/subscriptions";
import Stats from "./components/Stats";

function App() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  const fetchData = async () => {
    const res = await getSubscriptions();
    setSubscriptions(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Subscription Dashboard</h1>
      <Stats />
      <AddSubscription onAdded={setSubscriptions} />
      <SubscriptionsList subscriptions={subscriptions} />
    </div>
  );
}

export default App;
