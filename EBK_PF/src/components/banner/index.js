import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText'; 
import Report from '@material-ui/icons/Description';
import { Link } from 'react-router-dom';
//import { Link } from 'react-router-dom';

import './styles.css';
//import { Redirect } from 'react-router-dom';

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
        backgroundColor: "rgba(255, 255, 255, 0.8)",
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
        <header className="box">
            <nav className="menu">
                    <Button className="home" href="/">HOME</Button>
                    <Button className="menus"
                    aria-controls="customized-menu"
                    aria-haspopup="true"
                    variant="contained"
                    color="primary"
                    onClick={handleClick}>
                        MENU
                    </Button>
                    <StyledMenu
                        elevation={3}
                        id="customized-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        ><StyledMenuItem>
                                <ListItemIcon>
                                    <Report fontSize="small"/>
                                </ListItemIcon>
                                <Link className="link" to={`/extension`}>
                                    <ListItemText primary="Relatório de Ramais"/>
                                </Link>
                            </StyledMenuItem>
                            <StyledMenuItem>
                                <ListItemIcon>
                                    <Report fontSize="small"/>
                                </ListItemIcon>
                                <Link className="link" to={`/billing`}>
                                    <ListItemText primary="Relatório Faturamento"/>
                                </Link>
                            </StyledMenuItem>
                        </StyledMenu>
        </nav>
        <div className="hero">
            <div className="img1"></div>
            <div className="img2"></div>
        </div>
    </header>
    )
}
