import React, { useEffect, useState } from "react";
import { Avatar, Card, CardHeader, IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import axios from "axios";

const AdminNotifications = () => {


  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get("http://localhost:3001/admin-notification/get/notification",{
        headers:{
          Authorization:`${localStorage.getItem('token')}`,
        }
      });

      setNotifications(response.data.notifications || []);
    } catch (error) {
      console.error("Error fetching notifications:", error.message);
    }
  };

  

  const deleteNotification = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/admin-notification/delete/notification/${id}`,{
        headers:{
          Authorization:`${localStorage.getItem('token')}`
        }
      });
      setNotifications(notifications.filter((notification) => notification._id !== id));
    } catch (error) {
      console.error("Error deleting notification:", error.message);
    }
  };



  useEffect(() => {
    fetchNotifications();
  }, []);

  return (

    
    <div className="admin-notifications mt-5 p-5">
      <Card className="px-10">
        <CardHeader title="All Notifications" />
        {notifications.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between py-5 px-10 mb-5"
            style={{ borderBottom: "1px solid #ccc5" }}
          >
            <div className="flex items-center gap-x-5">
              <Avatar src={item.notification.image}/>
              <p style={{ color: "#292929", opacity: "0.8" }}>
                {item.notification.message}
              </p>
            </div>
            <IconButton onClick={() => deleteNotification(item._id)}>
              <ClearIcon />
            </IconButton>
          </div>
        ))}
      </Card>
    </div>
  );
};

export default AdminNotifications;
