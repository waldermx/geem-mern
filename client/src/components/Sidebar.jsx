import React from 'react'
import {
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemButton,
    Typography,
    useTheme
} from "@mui/material"
import { 
    SettingsOutlined,
    ChevronLeft,
    ChevronRightOutlined,
    HomeOutlined,
    ShoppingCartOutlined,
    ReceiptLongOutlined,
    Groups2Outlined,
    PublicOutlined,
    PointOfSaleOutlined,
    TodayOutlined,
    CalendarMonthOutlined,
    AdminPanelSettingsOutlined,
    TrendingUpOutlined,
    PieChartOutlined
 } from '@mui/icons-material';
 import { useEffect, useState } from 'react';
 import { useLocation, useNavigate } from 'react-router-dom';
 import FlexBetween from './FlexBetween';
 import profileImage from "../assets/profile.jpeg";
import { bgcolor } from '@mui/system';

const navItems = [
    {
      text: "Panel",
      icon: <HomeOutlined />,
    },
    {
      text: "Clientes",
      icon: null,
    },
    {
      text: "Productos",
      icon: <ShoppingCartOutlined />,
    },
    {
      text: "Ver clientes",
      icon: <Groups2Outlined />,
    },
    {
      text: "Transacciones",
      icon: <ReceiptLongOutlined />,
    },
    {
      text: "Geografía",
      icon: <PublicOutlined />,
    },
    {
      text: "Ventas",
      icon: null,
    },
    {
      text: "Panorama",
      icon: <PointOfSaleOutlined />,
    },
    {
      text: "Diarias",
      icon: <TodayOutlined />,
    },
    {
      text: "Mensuales",
      icon: <CalendarMonthOutlined />,
    },
    {
      text: "Desgloce",
      icon: <PieChartOutlined />,
    },
    {
      text: "Administración",
      icon: null,
    },
    {
      text: "Admin",
      icon: <AdminPanelSettingsOutlined />,
    },
    {
      text: "Rendimiento",
      icon: <TrendingUpOutlined />,
    },
  ];

const Sidebar = ({
    drawerWidth,
    isSidebarOpen,
    setIsSidebarOpen,
    isNonMobile,
}) => {
    const {pathname} = useLocation();
    const [active, setActive] = useState("");
    const navigate = useNavigate();
    const theme = useTheme();
    
    useEffect(()=>{
        setActive(pathname.substring(1));
    }, [pathname])

  return (
    <Box component="nav">
        {isSidebarOpen &&(
            <Drawer
            open={isSidebarOpen}
            onclose={()=>setIsSidebarOpen(false)}
            variant="persistent"
            anchor="left"
            sx={{
                width: drawerWidth,
                "& .muiDrawe-paper":{
                    color: theme.palette.secondary[200],
                    backgroundColor: theme.palette.background.alt,
                    boxSixing: "border-box",
                    borderWidth: isNonMobile ? 0 : "2px",
                    width: drawerWidth
                }
            }}
            >
                <Box width="100%">
                    <Box m="1.5rem 2rem 2rem 3rem">
                        <FlexBetween color={theme.palette.secondary}>
                            <Box display="flex" alignItems="center" gap="0.5rem">
                            <Typography variant="h4" fontWeight="bold">
                                GEEM
                            </Typography>
                            </Box>
                            {!isNonMobile && (
                                <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                                    <ChevronLeft/>
                                </IconButton>
                            )}
                        </FlexBetween>
                    </Box>
                    <List>
                        {/* Hacemos un map que pasa por todos los NavItems */}
                        {navItems.map(({text, icon})=> {
                            // Si no tiene ningún ícono, quiere decir que es un texto sin funcionalidad
                            if (!icon){ 
                                return (
                                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem"}}>
                                        {text}
                                    </Typography>
                                )
                            }
                            // Pone el texto del navitem en minúsculas
                            const lcText = text.toLowerCase();

                            //Si tiene icono el navitem, se ejecuta lo siguiente
                            return(
                                <ListItem key={text} disablePadding> {/*Añadimos key y quitamos padding*/}
                                    <ListItemButton
                                        onClick={() => { {/*Al hacer click, cambia el estado y la url*/}
                                            navigate(`/${lcText}`); 
                                            setActive(lcText)
                                        }}
                                        sx={{ //si state es igual a su nombre, entonces cambia su color
                                            bgcolor: active === lcText 
                                                ? theme.palette.secondary[300] 
                                                : "transparent",
                                            color: 
                                                active === lcText 
                                                    ? theme.palette.primary[600] 
                                                    : theme.palette.secondary[100]
                                        }}
                                    >
                                        <ListItemIcon 
                                            sx={{ //Cambia el margen izq a 2rem
                                                ml: "2rem",
                                                color: 
                                                    //Si la pestaña está activa, cambia el color 
                                                    active === lcText 
                                                        ? theme.palette.primary[600] 
                                                        : theme.palette.secondary[200]
                                        }}
                                        >
                                            {icon}
                                        </ListItemIcon>
                                        <ListItemText primary={text}/>
                                            {active === lcText && (
                                                //Si la pestaña está activada, añade el ícono
                                                <ChevronRightOutlined sx={{ml: "auto"}}/>
                                            )}
                                        
                                    </ListItemButton>
                                </ListItem>
                            )
                        })}
                    </List>
                </Box>

            </Drawer>
        )}
    </Box>
    )
}

export default Sidebar