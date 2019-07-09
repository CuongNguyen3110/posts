import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';

class MenuAppBar extends React.Component {
    render() {
        return (
            <AppBar>
                <Toolbar>
                    <IconButton color='inherit'>
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        )
    }
}

export default MenuAppBar;