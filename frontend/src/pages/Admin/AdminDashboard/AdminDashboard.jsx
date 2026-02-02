import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";
import { fetchAdminDashboard } from "../../../services/adminService";

import {
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  AccumulationDataLabel,
  PieSeries,
  Inject as PieInject
} from "@syncfusion/ej2-react-charts";

import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  ColumnSeries,
  Category,
  Tooltip,
  Legend,
  Inject
} from "@syncfusion/ej2-react-charts";

const AdminDashboard = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await fetchAdminDashboard();
      setSummary(data);
    } catch (err) {
      console.error("Dashboard load failed", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading dashboard...</div>;
  if (!summary) return <div>No dashboard data</div>;

  // ⭐ formatted pie data
  const pieData = summary.usersByRole.map(r => ({
    label: `${r.role} - ${r.count}`,
    value: r.count
  }));

  return (
    <div className="admin-dashboard">

      <h1>Admin Dashboard</h1>
      <p className="subtitle">System-wide analytics</p>

      {/* KPI CARDS */}
      <div className="kpi-grid">
        <KpiCard title="Total Revenue" value={`₹ ${summary.totalRevenue}`} color="#ff6a00" />
        <KpiCard title="Total Users" value={summary.totalUsers} color="#2563eb" />
        <KpiCard title="Staff Members" value={summary.staffCount} color="#9333ea" />
        <KpiCard title="Avg Rating" value={summary.avgRating.toFixed(1)} color="#f59e0b" />
      </div>

      {/* CHARTS */}
      <div className="chart-grid">

        <div className="chart-card">
          <h3>Users by Role</h3>

          <AccumulationChartComponent
            background="transparent"
            legendSettings={{ visible: true, position: "Bottom" }}
            tooltip={{ enable: true }}
            palettes={["#ef4444", "#f97316", "#f59e0b"]}
          >
            <PieInject services={[PieSeries, AccumulationDataLabel]} />

            <AccumulationSeriesCollectionDirective>
              <AccumulationSeriesDirective
                dataSource={pieData}
                xName="label"
                yName="value"
                type="Pie"
                innerRadius="40%"
                dataLabel={{
                  visible: true,
                  name: "label", // ⭐ THIS makes ADMIN - 1 appear
                  position: "Outside",
                  font: { fontWeight: "600", size: "14px" }
                }}
              />
            </AccumulationSeriesCollectionDirective>
          </AccumulationChartComponent>
        </div>

        <div className="chart-card">
          <h3>Staff by Role</h3>

          <ChartComponent
            primaryXAxis={{ valueType: "Category" }}
            tooltip={{ enable: true }}
          >
            <Inject services={[ColumnSeries, Category, Tooltip, Legend]} />

            <SeriesCollectionDirective>
              <SeriesDirective
                dataSource={summary.staffByRole}
                xName="role"
                yName="count"
                type="Column"
              />
            </SeriesCollectionDirective>
          </ChartComponent>
        </div>

      </div>
    </div>
  );
};

const KpiCard = ({ title, value, color }) => (
  <div className="kpi-card" style={{ background: color }}>
    <h4>{title}</h4>
    <h2>{value}</h2>
  </div>
);

export default AdminDashboard;