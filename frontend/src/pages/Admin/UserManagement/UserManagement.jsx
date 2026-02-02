import { useEffect, useState } from "react";
import "./UserManagement.css";
import AddManagerModal from "../../../components/AddManagerModal/AddManagerModal";
import { createManager, fetchAllUsers } from "../../../services/adminService";
import { toast } from "react-toastify";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Sort,
  Inject
} from "@syncfusion/ej2-react-grids";

export default function UserManagement() {

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  // Load users on page open
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    const data = await fetchAllUsers();
    setUsers(data);
    setLoading(false);
  };

  const filteredUsers = users.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());

    const matchRole = roleFilter === "ALL" || u.role === roleFilter;

    return matchSearch && matchRole;
  });

  const totalUsers = users.length;
  const customers = users.filter((u) => u.role === "CUSTOMER").length;
  const staff = users.filter((u) => u.role === "MANAGER").length;

  const gridData = filteredUsers.map((u) => ({
    userId: u.userId,
    name: u.name,
    email: u.email,
    phone: u.phone,
    role: u.role,
    city: u.city || "-"
  }));

  return (
    <div className="user-management">

      {/* Header */}
      <div className="um-header">
        <div>
          <h1>User Management</h1>
          <p className="subtitle">View and manage all system users</p>
        </div>

        <button className="add-manager-btn" onClick={() => setOpenModal(true)}>
          <i className="fa-solid fa-plus"></i> Add Manager
        </button>
      </div>

      {/* Stats */}
      <div className="um-stats">
        <StatCard title="Total Users" value={totalUsers} color="#ff5c07" />
        <StatCard title="Customers" value={customers} color="#2563eb" />
        <StatCard title="Manager" value={staff} color="#7c3aed" />
      </div>

      {/* Filters */}
      <div className="um-filters">
        <div className="search-box">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
          <option value="ALL">All Roles</option>
          <option value="CUSTOMER">Customer</option>
          <option value="MANAGER">Manager</option>
          <option value="ADMIN">Admin</option>
        </select>
      </div>

      {/* Table */}
      {/* <div className="um-table-wrapper">
        {loading ? (
          <div className="loading">Loading users...</div>
        ) : (
          <table className="um-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Contact</th>
                <th>Role</th>
                <th>City</th>
              </tr>
            </thead>
            <tbody>

              {filteredUsers.map((u) => (
                <tr key={u.id}>
                  <td>
                    <div className="user-cell">
                      <div className="avatar">{getInitials(u.name)}</div>
                      <div>
                        <div className="user-name">{u.name}</div>
                        <div className="user-id">ID: {u.userId}</div>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="contact-cell">
                      <div><i className="fa-regular fa-envelope"></i> {u.email}</div>
                      <div><i className="fa-solid fa-phone"></i> {u.phone}</div>
                    </div>
                  </td>

                  <td>
                    <span className={`role-badge ${u.role.toLowerCase()}`}>
                      {u.role.toLowerCase()}
                    </span>
                  </td>

                  <td>{u.city || "-"}</td>
                </tr>
              ))}

              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan="4" className="no-data">No users found</td>
                </tr>
              )}

            </tbody>
          </table>
        )}
      </div> */}
      <div className="um-table-wrapper syncfusion-table">
  {loading ? (
    <div className="loading">Loading users...</div>
  ) : (
    <GridComponent
      dataSource={gridData}
      allowPaging={true}
      allowSorting={true}
      width="100%"
      height="auto"
      pageSettings={{ pageSize: 6, pageCount: 4 }}
      gridLines="Horizontal"
    >
      <ColumnsDirective>
        <ColumnDirective
          field="name"
          headerText="Name"
          width="160"
          textAlign="Left"
        />
        <ColumnDirective
          field="email"
          headerText="Email"
          width="220"
        />
        <ColumnDirective
          field="phone"
          headerText="Phone"
          width="140"
          textAlign="Center"
        />
        <ColumnDirective
          field="role"
          headerText="Role"
          width="140"
          textAlign="Center"
        />
        <ColumnDirective
          field="city"
          headerText="City"
          width="140"
          textAlign="Center"
        />
      </ColumnsDirective>

      <Inject services={[Page, Sort]} />
    </GridComponent>
  )}
</div>

      {/* Add Manager Modal */}
      <AddManagerModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onSave={async (data) => {
          const response = await createManager(data);

          if (response.status === "success") {
            toast.success("Manager created successfully");
            setOpenModal(false);
            loadUsers(); // refresh table
          } else {
            toast.error(response.error || "Failed to create manager");
          }
        }}
      />

    </div>
  );
}

/* ---------- Helpers ---------- */

function StatCard({ title, value, color }) {
  return (
    <div className="um-stat-card">
      <p className="um-stat-title">{title}</p>
      <h3 style={{ color }}>{value}</h3>
    </div>
  );
}

function getInitials(name) {
  if (!name) return "?";
  const parts = name.split(" ");
  return parts.length >= 2 ? parts[0][0] + parts[1][0] : parts[0][0];
}
