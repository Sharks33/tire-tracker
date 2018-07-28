import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const navigationItems = ( props ) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" active>TIRE TRACKER</NavigationItem>
        <NavigationItem link="/">INVOICES</NavigationItem>
        <NavigationItem link="/">INVENTORY</NavigationItem>
    </ul>
);

export default navigationItems;