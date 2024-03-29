import React from 'react';

import classes from './Toolbar.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../../../components/Navigation/SideDrawer/DrawerToggle/DrawerToggle';
import Logo from '../../Logo/Logo';

const toolbar = ( props ) => (
    <header className={ classes.Toolbar }>
        <DrawerToggle clicked={ props.drawerToggleClicked } />

        <Logo />
        
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuthenticated={ props.isAuth } />
        </nav>
    </header>
);

export default toolbar;