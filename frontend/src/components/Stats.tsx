import React, { useEffect, useState } from "react";
import { getStats } from "../api/subscriptions";

interface Expiring {
  name: string;
  renewal_date: string;
}

interface StatsData {
  total_monthly_cost: number;
  total_yearly_cost: number;
  active_count: number;
  expiring_soon: Expiring[];
  cost_by_category: Record<string, number>;
  upcoming_renewals: Expiring[];
}

const Stats: React.FC = () => {
  const [stats, setStats] = useState<StatsData | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getStats();
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  if (!stats) return <p>Loading stats...</p>;

  return (
    <div>
      <h2>Dashboard Stats</h2>
      <p>Total Monthly Cost: {stats.total_monthly_cost} Riyal</p>
      <p>Total Yearly Cost: {stats.total_yearly_cost} Riyal</p>
      <p>Active Subscriptions: {stats.active_count}</p>

      <h3>Expiring Soon (Next 7 Days)</h3>
      <ul>
        {stats.expiring_soon.length === 0 ? (
          <li>None</li>
        ) : (
          stats.expiring_soon.map((sub) => (
            <li key={sub.name}>
              {sub.name} — {sub.renewal_date}
            </li>
          ))
        )}
      </ul>

      <h3>Upcoming Renewals</h3>
      <ul>
        {stats.upcoming_renewals.map((sub) => (
          <li key={sub.name}>
            {sub.name} — {sub.renewal_date}
          </li>
        ))}
      </ul>

      <h3>Cost by Category</h3>
      <ul>
        {Object.entries(stats.cost_by_category).map(([category, cost]) => (
          <li key={category}>
            {category}: {cost} Riyal
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Stats;
