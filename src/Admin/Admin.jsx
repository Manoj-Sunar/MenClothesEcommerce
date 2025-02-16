import { Badge, Box, CssBaseline,  List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InventoryIcon from '@mui/icons-material/Inventory';
import PersonIcon from '@mui/icons-material/Person';
import ViewListIcon from '@mui/icons-material/ViewList';
import MarkunreadIcon from '@mui/icons-material/Markunread';
import NotificationsIcon from '@mui/icons-material/Notifications';



const Menu = [
  { name: "Dashboard", path: '', icon: <DashboardIcon /> },
  { name: "Products", path: 'products', icon: <InventoryIcon /> },
  { name: "Customers", path: 'customers', icon: <PersonIcon /> },
  { name: "Orders", path: 'orders', icon: <ViewListIcon /> },
  { name: "AddProducts", path: 'add-products', icon: <MarkunreadIcon /> },

];







const Admin = () => {


  
  

  

  


 


 
  const Navigate = useNavigate();


 


  

  




  const drawer = (
    <Box className="border border-r-gray-300" sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: "100vh", justifyContent: 'space-between', overflow: "hidden", position: 'fixed' }}>
      <List>
        {
          Menu.map((item, index) => <ListItem key={index} onClick={() => Navigate(item.path)}>

            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText>{item.name}</ListItemText>
            </ListItemButton>




          </ListItem>)
        }

        <ListItem>
                <NavLink to={"admin-notifications"}>
          <ListItemButton>
            <ListItemIcon>
           
                  <NotificationsIcon/>
              
            </ListItemIcon>
            <ListItemText>Notifications</ListItemText>
          </ListItemButton>
                </NavLink>
        </ListItem>

       


      </List>

      <List>
        <ListItem>

          <ListItemButton>
            <ListItemIcon><AccountCircleIcon /></ListItemIcon>
            <ListItemText>Accounts</ListItemText>
          </ListItemButton>

        </ListItem>
      </List>

    </Box>
  )



  return (
    <div className='flex '>
      <Box >
        <CssBaseline />
        <div>
          {drawer}
        </div>
      </Box>

      <Outlet />
    </div>
  )
}

export default Admin