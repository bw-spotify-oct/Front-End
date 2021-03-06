import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import SearchBar from "./SearchBar";

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


import HomeIcon from '@material-ui/icons/Home';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import PageviewIcon from '@material-ui/icons/Pageview';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import RadioIcon from '@material-ui/icons/Radio'; const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));

export default function SideNav(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const [title, setTitle] = useState("");

    useEffect(() => {
        let pathNames = {
            "/home": "Home",
            "/search": "Search Results",
            "/saved-songs": "Favorites",
            "/search-history": "History",
            "/moods": "Moods",
            "/export-to-spotify": "Export To Spotify"
        }
        setTitle(pathNames[props.match.path])

    }, [props.match.path])

    const iconArray = [<HomeIcon />, <RadioIcon />, <LibraryMusicIcon />, <PageviewIcon />, <ImportExportIcon />]
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"

                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        {title}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader} id="search-bar-area">
                    <SearchBar {...props} setSongs={props.setSongs} recommendedIsChecked={props.recommendedIsChecked} setRecommendedIsChecked={props.setRecommendedIsChecked} setRecs={props.setRecs} setMainGraphUrl={props.setMainGraphUrl}></SearchBar>
                </div>
                <Divider />
                <List>
                    {/* {[{ name: 'Home', link: "/home" }, { name: 'Moods', link: "/moods" }, { name: 'Favorites', link: "/saved-songs" }, { name: 'Recent Searches', link: "/search-history" }, { name: 'Export to Spotify', link: "/export-to-spotify" }].map((text, index) => ( */}
                    {[{ name: 'Home', link: "/home" }, { name: 'Moods', link: "/moods" }, { name: 'Favorites', link: "/saved-songs" }].map((text, index) => (
                        <Link to={text.link}>
                            <ListItem button key={text}>
                                <ListItemIcon>{iconArray[index]}</ListItemIcon>
                                <ListItemText primary={text.name} />
                            </ListItem>
                        </Link>
                    ))}
                </List>

            </Drawer>

        </div>
    );
}