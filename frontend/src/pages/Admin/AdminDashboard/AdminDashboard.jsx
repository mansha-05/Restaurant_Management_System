//import StatCard from '../../../components/StatCard/StatCard'
import "./AdminDashboard.css";
// import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const colors = ["#ff5733", "#ffc300", "#ff7855"];

function AdminDashboard() {
  const usersData = [
    { name: "Customers", value: 2 },
    { name: "Admins", value: 1 },
    { name: "Managers", value: 1 },
  ];

  const staffData = [
    { role: "Chef", count: 1 },
    { role: "Waiter", count: 2 },
    { role: "Manager", count: 1 },
    { role: "Cashier", count: 1 },
  ];

  const revenueData = [
    { month: "Jan", revenue: 45000 },
    { month: "Feb", revenue: 52000 },
    { month: "Mar", revenue: 48000 },
    { month: "Apr", revenue: 61000 },
    { month: "May", revenue: 56000 },
    { month: "Jun", revenue: 69000 },
  ];

  return (
    <div>

      <div className="content">
        <h1>Admin Dashboard</h1>
        <p>System Wide Analytics and Management</p>

        {/* <div className="stats-container">
          <StatCard title="Total Revenue" value="$145" icon="fa-solid fa-sack-dollar" />
          <StatCard title="Total Users" value="4" icon="fa-solid fa-users" />
          <StatCard title="Staff Members" value="5" icon="fa-solid fa-user-tie" />
          <StatCard title="Avg Rating" value="4.7" icon="fa-solid fa-star" />
        </div>

        <div className="charts-row"> */}

          {/* Users Pie Chart */}
          {/* <div className="chart-card">
            <h3>Users by Role</h3>
            <PieChart width={350} height={350}>
              <Pie data={usersData} dataKey="value" outerRadius={120}>
                {usersData.map((entry, idx) => (
                  <Cell key={idx} fill={colors[idx]} />
                ))}
              </Pie>
            </PieChart>
          </div> */}

          {/* Staff Bar Chart */}
          {/* <div className="chart-card">
            <h3>Staff by Role</h3>
            <BarChart width={400} height={300} data={staffData}>
              <XAxis dataKey="role" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#ff6b00" />
            </BarChart>
          </div>
        </div> */}

        {/* <div className="chart-card large-chart">
          <h3>Revenue Trend (6 Months)</h3>
          <BarChart width={700} height={300} data={revenueData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="#ff6b00" />
          </BarChart>
        </div> */}
      </div>
    </div>
  );
}

export default AdminDashboard;
