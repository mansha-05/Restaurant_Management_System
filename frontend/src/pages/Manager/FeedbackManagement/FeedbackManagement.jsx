import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FeedbackManagement.css";

// ✅ Syncfusion imports
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Sort,
  Inject,
} from "@syncfusion/ej2-react-grids";

const FeedbackManagement = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [orderId, setOrderId] = useState("");
  const [userName, setUserName] = useState("");

  // =========================
  // Fetch all feedbacks
  // =========================
  const fetchAllFeedbacks = async () => {
    try {
      const res = await axios.get("http://localhost:8080/feedback");
      setFeedbackList(res.data || []);
    } catch (err) {
      console.error("Fetch all failed", err);
    }
  };

  // =========================
  // Fetch feedbacks by order ID
  // =========================
  const fetchFeedbackByOrderId = async () => {
    if (!orderId) return;
    try {
      const res = await axios.get(
        `http://localhost:8080/feedback/order/${orderId}`
      );
      setFeedbackList(res.data || []);
    } catch (err) {
      console.error("Fetch by Order ID failed", err);
    }
  };

  // =========================
  // Fetch feedbacks by user name
  // =========================
  const fetchFeedbackByUserName = async () => {
    if (!userName) return;
    try {
      const res = await axios.get(
        `http://localhost:8080/feedback/user?name=${userName}`
      );
      setFeedbackList(res.data || []);
    } catch (err) {
      console.error("Fetch by User Name failed", err);
    }
  };

  // =========================
  // Load all feedbacks on mount
  // =========================
  useEffect(() => {
    fetchAllFeedbacks();
  }, []);

  // ✅ Prepare data for Syncfusion Grid
  const gridData = feedbackList.map((fb) => ({
    id: fb.id,
    userName: fb.user?.name || "-",
    orderId: fb.order?.id || "-",
    comments: fb.comments || "-",
    rating: fb.rating || "-",
    feedbackDate: fb.feedback_date || "-",
  }));

  return (
    <div className="feedback-container">
      <h2>Feedback Management</h2>

      <div className="feedback-filters">
        <input
          type="text"
          placeholder="Search by Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
        <button onClick={fetchFeedbackByOrderId}>Search</button>

        <input
          type="text"
          placeholder="Search by User Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <button onClick={fetchFeedbackByUserName}>Search</button>

        <button onClick={fetchAllFeedbacks}>Show All</button>
      </div>

      {/* ✅ Syncfusion Grid replaces table */}
      <div className="feedback-table-wrapper">
        <GridComponent
          dataSource={gridData}
          allowPaging={true}
          allowSorting={true}
          width="100%"
          pageSettings={{ pageSize: 6 }}
          gridLines="Horizontal"
        >
          <ColumnsDirective>
            <ColumnDirective field="id" headerText="ID" width="90" textAlign="Center" />
            <ColumnDirective field="userName" headerText="User Name" width="160" />
            <ColumnDirective field="orderId" headerText="Order ID" width="120" textAlign="Center" />
            <ColumnDirective field="comments" headerText="Comments" width="260" />
            <ColumnDirective field="rating" headerText="Rating" width="100" textAlign="Center" />
            <ColumnDirective field="feedbackDate" headerText="Feedback Date" width="160" />
          </ColumnsDirective>

          <Inject services={[Page, Sort]} />
        </GridComponent>
      </div>
    </div>
  );
};

export default FeedbackManagement;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./FeedbackManagement.css";

// const FeedbackManagement = () => {
//   const [feedbackList, setFeedbackList] = useState([]);
//   const [orderId, setOrderId] = useState("");
//   const [userName, setUserName] = useState("");

//   // =========================
//   // Fetch all feedbacks
//   // =========================
//   const fetchAllFeedbacks = async () => {
//     try {
//       const res = await axios.get("http://localhost:8080/feedback");
//       setFeedbackList(res.data || []);
//     } catch (err) {
//       console.error("Fetch all failed", err);
//     }
//   };

//   // =========================
//   // Fetch feedbacks by order ID
//   // =========================
//   const fetchFeedbackByOrderId = async () => {
//     if (!orderId) return;
//     try {
//       const res = await axios.get(
//         `http://localhost:8080/feedback/order/${orderId}`
//       );
//       setFeedbackList(res.data || []);
//     } catch (err) {
//       console.error("Fetch by Order ID failed", err);
//     }
//   };

//   // =========================
//   // Fetch feedbacks by user name
//   // =========================
//   const fetchFeedbackByUserName = async () => {
//     if (!userName) return;
//     try {
//       const res = await axios.get(
//         `http://localhost:8080/feedback/user?name=${userName}`
//       );
//       setFeedbackList(res.data || []);
//     } catch (err) {
//       console.error("Fetch by User Name failed", err);
//     }
//   };

//   // =========================
//   // Load all feedbacks on mount
//   // =========================
//   useEffect(() => {
//     fetchAllFeedbacks();
//   }, []);

//   return (
//     <div className="feedback-container">
//       <h2>Feedback Management</h2>

//       <div className="feedback-filters">
//         <input
//           type="text"
//           placeholder="Search by Order ID"
//           value={orderId}
//           onChange={(e) => setOrderId(e.target.value)}
//         />
//         <button onClick={fetchFeedbackByOrderId}>Search</button>

//         <input
//           type="text"
//           placeholder="Search by User Name"
//           value={userName}
//           onChange={(e) => setUserName(e.target.value)}
//         />
//         <button onClick={fetchFeedbackByUserName}>Search</button>

//         <button onClick={fetchAllFeedbacks}>Show All</button>
//       </div>

//       <table className="feedback-table">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>User Name</th>
//             <th>Order ID</th>
//             <th>Comments</th>
//             <th>Rating</th>
//             <th>Feedback Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {feedbackList.map((fb) => (
//             <tr key={fb.id}>
//               <td>{fb.id}</td>
//               <td>{fb.user?.name || "-"}</td>
//               <td>{fb.order?.id || "-"}</td>
//               <td>{fb.comments || "-"}</td>
//               <td>{fb.rating || "-"}</td>
//               <td>{fb.feedback_date || "-"}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default FeedbackManagement;
