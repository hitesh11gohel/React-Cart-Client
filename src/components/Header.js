import { AppBar, Button, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core'
import React from 'react'
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

const Header = () => {
    const classes = useStyles();
    return (

        <div>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Epistic
                    </Typography>
                    <Button color="inherit">Login</Button>
                    <Button color="inherit">Register</Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header
