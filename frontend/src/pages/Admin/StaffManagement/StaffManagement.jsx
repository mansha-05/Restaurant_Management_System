import React from "react";
import "./StaffManagement.css";
// import { FaSearch, FaEnvelope, FaPhone, FaTrash, FaEdit } from "react-icons/fa";

function StaffManagement() {
//   const staffData = [
//     {
//       id: "STF-001",
//       name: "Marco Rossi",
//       avatar:
//         "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg",
//       email: "marco@restaurant.com",
//       phone: "+1 (555) 111-2222",
//       role: "chef",
//       shift: "morning",
//       salary: "$65,000",
//       joinDate: "1/15/2023",
//     },
//     {
//       id: "STF-002",
//       name: "Anna Martinez",
//       avatar: "",
//       email: "anna@restaurant.com",
//       phone: "+1 (555) 222-3333",
//       role: "manager",
//       shift: "evening",
//       salary: "$55,000",
//       joinDate: "6/1/2022",
//     },
//   ];

//   const getAvatar = (avatar, name) => {
//     if (avatar) return <img src={avatar} alt={name} className="avatar-img" />;

//     return (
//       <div className="avatar-placeholder">
//         {name.split(" ").map((n) => n[0]).join("")}
//       </div>
//     );
//   };

//   return (
//     <div className="staff-page">
//       <div className="staff-header">
//         <div>
//           <h1>Staff Management</h1>
//           <p>Manage restaurant staff and employees</p>
//         </div>

//         <button className="add-btn">+ Add Staff Member</button>
//       </div>

//       <div className="search-box">
//         <FaSearch size={18} />
//         <input type="text" placeholder="Search staff members..." />
//       </div>

//       <div className="staff-table">
//         <div className="table-header">
//           <span>Staff Member</span>
//           <span>Contact</span>
//           <span>Role</span>
//           <span>Shift</span>
//           <span>Salary</span>
//           <span>Join Date</span>
//           <span>Actions</span>
//         </div>

//         {staffData.map((staff) => (
//           <div className="table-row" key={staff.id}>
//             <div className="staff-info">
//               {getAvatar(staff.avatar, staff.name)}
//               <div>
//                 <h4>{staff.name}</h4>
//                 <p>{staff.id}</p>
//               </div>
//             </div>

//             <div className="contact-info">
//               <p>
//                 <FaEnvelope /> {staff.email}
//               </p>
//               <p>
//                 <FaPhone /> {staff.phone}
//               </p>
//             </div>

//             <div>
//               <span className={`badge role-${staff.role}`}>{staff.role}</span>
//             </div>

//             <div>
//               <span className={`badge shift-${staff.shift}`}>
//                 {staff.shift}
//               </span>
//             </div>

//             <div>{staff.salary}</div>
//             <div>{staff.joinDate}</div>

//             <div className="actions">
//               <button className="edit-btn">
//                 <FaEdit />
//               </button>
//               <button className="delete-btn">
//                 <FaTrash />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
}

export default StaffManagement;
