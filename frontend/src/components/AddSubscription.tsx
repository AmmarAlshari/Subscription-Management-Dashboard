import React, { useState } from "react";
import {
  createSubscription,
  Subscription,
  getSubscriptions,
} from "../api/subscriptions";

interface AddSubscriptionProps {
  onAdded: (newList: Subscription[]) => void; // callback to refresh list
}

const AddSubscription: React.FC<AddSubscriptionProps> = ({ onAdded }) => {
  const [name, setName] = useState("");
  const [cost, setCost] = useState<number>(0);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly"
  );
  const [startDate, setStartDate] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );
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
  const styles: { [k: string]: React.CSSProperties } = {
    card: {
      maxWidth: 760,
      margin: "20px auto",
      padding: 20,
      borderRadius: 12,
      background: "linear-gradient(180deg, #ffffff, #f7fbff)",
      boxShadow: "0 8px 30px rgba(15, 30, 60, 0.06)",
      border: "1px solid rgba(20, 40, 80, 0.04)",
      fontFamily:
        "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
    },
    headerRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12,
    },
    header: {
      margin: 0,
      fontSize: 18,
      color: "#0b2545",
      fontWeight: 700,
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: 14,
      alignItems: "start",
    },
    fullRow: {
      gridColumn: "1 / -1",
    },
    field: {
      display: "flex",
      flexDirection: "column",
    },
    label: {
      fontSize: 13,
      color: "#274060",
      marginBottom: 8,
      fontWeight: 600,
    },
    input: {
      padding: "10px 12px",
      borderRadius: 10,
      border: "1px solid #e2e8f0",
      background: "rgba(72, 119, 219, 0.37)",
      outline: "none",
      fontSize: 14,
      transition:
        "box-shadow .12s ease, border-color .12s ease, transform .06s ease",
      boxSizing: "border-box" as const,
      color: "rgba(0, 0, 0, 1)",
    },
    inputFocus: {
      boxShadow: "0 6px 18px rgba(47,128,237,0.08)",
      borderColor: "#3b82f6",
    },
    select: {
      appearance: "none",
      WebkitAppearance: "none",
      MozAppearance: "none",
      backgroundImage:
        "linear-gradient(45deg, transparent 50%, #1f2937 50%), linear-gradient(135deg, #1f2937 50%, transparent 50%)",
      backgroundPosition:
        "calc(100% - 14px) calc(1em + 2px), calc(100% - 9px) calc(1em + 2px)",
      backgroundSize: "6px 6px, 6px 6px",
      backgroundRepeat: "no-repeat",
      paddingRight: 36,
    },
    actions: {
      marginTop: 16,
      display: "flex",
      justifyContent: "flex-end",
      gap: 10,
    },
    primaryButton: {
      background: "linear-gradient(90deg,#2563eb,#06b6d4)",
      color: "#ffffff",
      padding: "10px 18px",
      borderRadius: 10,
      border: "none",
      cursor: "pointer",
      fontWeight: 700,
      boxShadow: "0 10px 30px rgba(6, 182, 212, 0.12)",
      transition:
        "transform .08s ease, box-shadow .12s ease, opacity .12s ease",
    },
    smallNote: {
      marginTop: 10,
      color: "#415a77",
      fontSize: 13,
    },
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={styles.card}
      aria-label="Add subscription form"
    >
      <div style={styles.headerRow}>
        <h3 style={styles.header}>Add New Subscription</h3>
      </div>

      <div style={styles.grid}>
        <div style={styles.field}>
          <label style={styles.label} htmlFor="sub-name">
            Name
          </label>
          <input
            id="sub-name"
            style={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="e.g., Spotify"
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label} htmlFor="sub-cost">
            Cost
          </label>
          <input
            id="sub-cost"
            type="number"
            step="0.01"
            style={styles.input}
            value={cost}
            onChange={(e) => setCost(parseFloat(e.target.value))}
            required
            placeholder="0.00"
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label} htmlFor="sub-billing">
            Billing Cycle
          </label>
          <select
            id="sub-billing"
            style={{ ...styles.input, ...styles.select }}
            value={billingCycle}
            onChange={(e) =>
              setBillingCycle(e.target.value as "monthly" | "yearly")
            }
          >
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>

        <div style={styles.field}>
          <label style={styles.label} htmlFor="sub-start">
            Start Date
          </label>
          <input
            id="sub-start"
            type="date"
            style={styles.input}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div style={{ ...styles.field, ...styles.fullRow }}>
          <label style={styles.label} htmlFor="sub-category">
            Category (optional)
          </label>
          <input
            id="sub-category"
            style={styles.input}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g., Entertainment, Utilities, Productivity"
          />
        </div>
      </div>

      <div style={styles.actions}>
        <button
          type="submit"
          style={styles.primaryButton}
          onMouseDown={(e) =>
            (e.currentTarget.style.transform = "translateY(1px)")
          }
          onMouseUp={(e) => (e.currentTarget.style.transform = "translateY(0)")}
        >
          Add Subscription
        </button>
      </div>

      <p style={styles.smallNote}>
        Subscriptions are saved to your account and can be edited later.
      </p>
    </form>
  );
};

export default AddSubscription;
