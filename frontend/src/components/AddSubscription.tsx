import React, { useState } from "react";
import { createSubscription, Subscription, getSubscriptions } from "../api/subscriptions";

interface AddSubscriptionProps {
  onAdded: (newList: Subscription[]) => void; // callback to refresh list
}

const AddSubscription: React.FC<AddSubscriptionProps> = ({ onAdded }) => {
  const [name, setName] = useState("");
  const [cost, setCost] = useState<number>(0);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [startDate, setStartDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [category, setCategory] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || cost <= 0) {
      alert("Please provide a valid name and cost.");
      return;
    }

    const newSubscription: Subscription = {
      name,
      cost,
      billing_cycle: billingCycle,
      start_date: startDate,
      renewal_date: startDate, // backend will auto-calculate, but we send start date
      is_active: true,
      category,
    };

    try {
      await createSubscription(newSubscription);
      // fetch updated list
      const res = await getSubscriptions();
      onAdded(res.data);

      // reset form
      setName("");
      setCost(0);
      setBillingCycle("monthly");
      setStartDate(new Date().toISOString().slice(0, 10));
      setCategory("");
    } catch (error) {
      console.error("Error adding subscription:", error);
      alert("Failed to add subscription. Check console for details.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New Subscription</h3>
      <div>
        <label>Name:</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Cost:</label>
        <input
          type="number"
          value={cost}
          onChange={(e) => setCost(parseFloat(e.target.value))}
          required
        />
      </div>
      <div>
        <label>Billing Cycle:</label>
        <select value={billingCycle} onChange={(e) => setBillingCycle(e.target.value as "monthly" | "yearly")}>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>
      <div>
        <label>Start Date:</label>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      </div>
      <div>
        <label>Category (optional):</label>
        <input value={category} onChange={(e) => setCategory(e.target.value)} />
      </div>
      <button type="submit">Add Subscription</button>
    </form>
  );
};

export default AddSubscription;
