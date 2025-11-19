import React, { useEffect, useState } from "react";
import { getSubscriptions, Subscription } from "../api/subscriptions";

const SubscriptionsList: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSubscriptions();
        setSubscriptions(response.data);
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
      }
    };

    fetchData();
  }, []);

  const styles: { [k: string]: React.CSSProperties } = {
    container: {
      width: "100%",
      maxWidth: 360,
      padding: 16,
      boxSizing: "border-box",
      color: "#000", 
    },
    heading: {
      margin: "0 0 12px 0",
      fontSize: 18,
      fontWeight: 700,
      color: "#000",
    },
    empty: {
      color: "#000",
      fontSize: 14,
      margin: 0,
    },
    tableWrap: {
      overflowX: "auto",
      borderRadius: 8,
      boxShadow: "0 6px 20px rgba(16,26,46,0.06)",
      background: "#fff",
      padding: 8,
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      fontSize: 14,
      color: "#000",
    },
    th: {
      textAlign: "left",
      padding: "10px 8px",
      fontSize: 13,
      fontWeight: 700,
      borderBottom: "1px solid #e6eef8",
      color: "#0b2545",
    },
    td: {
      padding: "10px 8px",
      borderBottom: "1px solid #f1f5f9",
      color: "#000",
    },
    rowAlt: {
      background: "#fbfdff",
    },
    smallNote: {
      marginTop: 8,
      fontSize: 12,
      color: "#465a6b",
    },
  };

  return (
    <div style={styles.container} aria-label="Subscriptions list">
      <h2 style={styles.heading}>My Subscriptions</h2>

      {subscriptions.length === 0 ? (
        <p style={styles.empty}>No subscriptions found.</p>
      ) : (
        <div style={styles.tableWrap}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Cost</th>
                <th style={styles.th}>Billing Cycle</th>
                <th style={styles.th}>Renewal Date</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((sub, idx) => (
                <tr
                  key={sub.id}
                  style={idx % 2 === 1 ? styles.rowAlt : undefined}
                >
                  <td style={styles.td}>{sub.name}</td>
                  <td style={styles.td}>{sub.cost}</td>
                  <td style={styles.td}>{sub.billing_cycle}</td>
                  <td style={styles.td}>{sub.renewal_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SubscriptionsList;
