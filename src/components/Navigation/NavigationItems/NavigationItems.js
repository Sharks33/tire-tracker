import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const navigationItems = ( props ) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/">TIRE TRACKER</NavigationItem>
        <NavigationItem link="/orders">INVOICES</NavigationItem>
        <NavigationItem link="/inventory">INVENTORY</NavigationItem>
        { !props.isAuthenticated
            ? <NavigationItem link="/auth">SIGN IN</NavigationItem>
            : <NavigationItem link="/logout">LOG OUT</NavigationItem>
        }
    </ul>
);

export default navigationItems;