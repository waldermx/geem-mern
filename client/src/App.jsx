import React, { useMemo } from 'react'
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { themeSettings } from './theme';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from "./scenes/dashboard";
import Layout from "./scenes/layout"


import Products from "./scenes/products/Products";



function App() {
  const mode = useSelector((state)=>state.global.mode);
  const theme = useMemo(()=>createTheme(themeSettings(mode)), [mode])
  return (
    <div className='app'>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <Routes>
            <Route element={<Layout/>}>
              <Route path="/" element={<Navigate to="/panel" replace />}/>
              <Route path="/panel" element={<Dashboard/>}/>
              <Route path="/productos" element={<Products/>}/>
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App;