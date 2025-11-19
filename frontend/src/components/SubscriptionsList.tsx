import React, { useEffect, useState } from "react";
import { getSubscriptions } from "../api/subscriptions";

const SubscriptionsList: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);

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

  return (
    <div>
      <h2>My Subscriptions</h2>
      {subscriptions.length === 0 ? (
        <p>No subscriptions found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Cost</th>
              <th>Billing Cycle</th>
              <th>Renewal Date</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((sub) => (
              <tr key={sub.id}>
                <td>{sub.name}</td>
                <td>{sub.cost}</td>
                <td>{sub.billing_cycle}</td>
                <td>{sub.renewal_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SubscriptionsList;
