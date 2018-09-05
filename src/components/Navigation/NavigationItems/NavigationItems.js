import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const navigationItems = ( props ) => (
    <ul className={classes.NavigationItems}>
        { props.isAuthenticated
            ? <NavigationItem link="/">TIRE TRACKER</NavigationItem>
            : null
        }

        { props.isAuthenticated
            ? <NavigationItem link="/orders">INVOICES</NavigationItem>
            : null
        }

        { props.isAuthenticated
            ? <NavigationItem link="/inventory">INVENTORY</NavigationItem>
            : null
        }

        { !props.isAuthenticated
            ? <NavigationItem link="/auth">SIGN IN</NavigationItem>
            : <NavigationItem link="/logout">LOG OUT</NavigationItem>
        }
    </ul>
);

export default navigationItems;