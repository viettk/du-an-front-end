import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { Fragment } from "react";
import { useHistory, useLocation } from "react-router";

const useStyles = makeStyles({
    active: {
        background: '#ccc',
    },
})
const SubMenu = ({ item }) => {
    const history = useHistory();
    const location = useLocation();
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <Fragment>
            <ListItemButton
                onClick={() => {
                    history.push(item.path);
                    item.chiren && handleClick();
                }}
                className={location.pathname === (item.path) ? classes.active : null}
            >
                <ListItemIcon>
                    {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
                {item.chiren && open
                    ? item.iconOpen
                    : item.chiren
                        ? item.iconClose
                        : null}
            </ListItemButton>

            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {open && item.chiren.map((item, index) => (
                        <ListItemButton key={index} className={location.pathname === (item.path) ? classes.active : null} onClick={() => history.push(item.path)} sx={{ pl: 4 }}>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    ))}
                </List>

            </Collapse>
        </Fragment>
    );

}
export default SubMenu;