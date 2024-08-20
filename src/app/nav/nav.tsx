'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import SideBar from './sidebar';
import TopBar from './topbar';

interface NavDrawerProps {
    drawerWidth: number;
}

const Nav: React.FC<NavDrawerProps> = ({drawerWidth}) => {
    const [menuOpen, setMenuOpen] = React.useState(true);
    const handleDrawer = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <TopBar menuOpen={menuOpen} handleDrawer= {handleDrawer} drawerWidth = {drawerWidth}/>
            <SideBar menuOpen={menuOpen} handleDrawer= {handleDrawer} drawerWidth = {drawerWidth}/>
        </Box >
    );
}

export default Nav;