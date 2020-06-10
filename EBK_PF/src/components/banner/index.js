import React from 'react';
import { withStyles, hexToRgb } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText'; 
import Report from '@material-ui/icons/Description';

import './styles.css';
import { Redirect } from 'react-router-dom';

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
        backgroundColor: "rgba(255, 255, 255, 0.6)",
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical:'bottom',
            horizontal:'center',
        }}
        transformOrigin={{
            vertical:'top',
            horizontal:'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root:{
        '&:focus':{
            backgroundColor: theme.palette.primary.MediaDeviceInfo,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary':{
                color: theme.palette.common.primary,
            },
        },
    },
}))(MenuItem);

export default function CustomizedMenus(){
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <header className="banner">
            <nav class="menu">
            <div className="main-header">
                <Button className="home" href="#home">HOME</Button>
                <Button
                aria-controls="customized-menu"
                aria-haspopup="true"
                variant="contained"
                color="primary"
                onClick={handleClick}>
                    MENU
                </Button>
                <StyledMenu classes="menus"
                    id="customized-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}>
                        <StyledMenuItem className="menus">
                            <ListItemIcon>
                                <Report fontSize="medium"/>
                            </ListItemIcon>
                            <ListItemText primary="Relatório de Ramais"/>
                        </StyledMenuItem>

                        <StyledMenuItem>
                            <ListItemIcon>
                                <Report fontSize="medium"/>
                            </ListItemIcon>
                            <ListItemText primary="Relatório Faturamento"/>
                        </StyledMenuItem>
                    </StyledMenu>
            </div>
        </nav>
    </header>
    )
}
