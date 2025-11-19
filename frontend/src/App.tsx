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

  const styles: { [k: string]: React.CSSProperties } = {
    app: {
      width: "100vw",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      boxSizing: "border-box",
      background: "#ffffff",
      padding: "20px 0",
      alignItems: "center",
      overflowX: "hidden",
    },
    header: {
      width: "100%",
      textAlign: "center",
      margin: 0,
      fontSize: 28,
      fontWeight: 700,
      color: "#0b2545",
      letterSpacing: "-0.2px",
      padding: "12px 0",
    },
    main: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      padding: "0 12px 40px",
    },
    topRow: {
      width: "100%",
      maxWidth: 1200,
      display: "flex",
      gap: 28,
      alignItems: "flex-start",
      justifyContent: "center",
      marginTop: 8,
      padding: "0 16px",
      boxSizing: "border-box",
    },
    leftCol: {
      flex: "1 1 320px",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "flex-start",
    },
    centerCol: {
      flex: "0 0 560px",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
    },
    rightCol: {
      flex: "1 1 320px",
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "flex-start",
    },
    bottomRow: {
      width: "100%",
      maxWidth: 1200,
      marginTop: 28,
      display: "flex",
      justifyContent: "center",
    },
  };

  return (
    <div className="App" style={styles.app}>
      <h1 style={styles.header}>Subscription Dashboard</h1>

      <main style={styles.main}>
        <div style={styles.topRow}>
          <div style={styles.leftCol}>
            <SubscriptionsList />
          </div>
          <div style={styles.centerCol}>
            <AddSubscription onAdded={setSubscriptions} />
          </div>
          <div style={styles.rightCol}>
            <Stats />
          </div>
        </div>
      </main>

      <div style={styles.bottomRow}>
      </div>
    </div>
  );
}

export default App;
