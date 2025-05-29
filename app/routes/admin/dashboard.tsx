import { Header } from "components";
import React from "react";

const Dashboard = () => {
  const user = { name: "Udyan Suradkar" };
  return (
    <main className="dashboard wrapper">
      <Header
        title={`welcome ${user?.name ?? "Guest"}`}
        description="Track activity, trends and popular destinations in real time"
      />
      Dashboard page contents
    </main>
  );
};
export default Dashboard;
