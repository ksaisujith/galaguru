'use client';

import React, { useState, useEffect } from 'react';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap, Tooltip } from '@mui/material';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import EventRoundedIcon from '@mui/icons-material/EventRounded';
import EditCalendarRoundedIcon from '@mui/icons-material/EditCalendarRounded';
import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded';
import DateRangeRoundedIcon from '@mui/icons-material/DateRangeRounded';
import LocalActivityRoundedIcon from '@mui/icons-material/LocalActivityRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
import PersonSearchRoundedIcon from '@mui/icons-material/PersonSearchRounded';
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import { useRouter } from 'next/navigation';

interface DrawerOpenStateProps {
    drawerWidth: number;
    menuOpen: boolean;
    handleDrawer: () => void;
}

const SideBar: React.FC<DrawerOpenStateProps> = ({ menuOpen, handleDrawer, drawerWidth }) => {
    const openedMixin = (theme: Theme): CSSObject => ({
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        overflowX: 'hidden',
    });

    const closedMixin = (theme: Theme): CSSObject => ({
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: `calc(${theme.spacing(8)} + 1px)`,
        [theme.breakpoints.up('sm')]: {
            width: `calc(${theme.spacing(9)} + 10px)`,
        },
    });

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    }));

    const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
        ({ theme, open }) => ({
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap',
            boxSizing: 'border-box',
            ...(open && {
                ...openedMixin(theme),
                '& .MuiDrawer-paper': openedMixin(theme),
            }),
            ...(!open && {
                ...closedMixin(theme),
                '& .MuiDrawer-paper': closedMixin(theme),
            }),
        }),
    );

    const router = useRouter();
    const [subMenuEventsOpen, setSubMenuEventsOpen] = useState<boolean>(false);
    const [subMenuUsersOpen, setSubMenuUsersOpen] = useState<boolean>(false);

    const handleEventsSubMenuClick = () => {
        setSubMenuEventsOpen(!subMenuEventsOpen);
    };

    const handleUsersSubMenuClick = () => {
        setSubMenuUsersOpen(!subMenuUsersOpen);
    };

    type MenuItem = {
        label: string;
        icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
        href: string;
    };

    const MenuItems: MenuItem[] = [
        { label: "Dashboard", icon: DashboardRoundedIcon, href: "/dashboard" },
        { label: "Events", icon: LocalActivityRoundedIcon, href: "/" },
        { label: "Users", icon: PeopleAltRoundedIcon, href: "/" },
        { label: "Host event", icon: EventNoteRoundedIcon, href: "/hostEvent" },
    ];

    type SubMenuItem = {
        Items: MenuItem[];
        Control: () => void;
        StateControl: boolean;
    };

    const SubMenuItems: Map<string, SubMenuItem> = new Map([
        ["Events", {
            Items: [{ label: "Create", icon: EventRoundedIcon, href: "/events/create" },
            { label: "View", icon: DateRangeRoundedIcon, href: "/events/view" },
            { label: "Edit", icon: EditCalendarRoundedIcon, href: "/events/edit" }],
            Control: handleEventsSubMenuClick,
            StateControl: subMenuEventsOpen
        }],

        ["Users", {
            Items: [{ label: "Add new", icon: PersonAddRoundedIcon, href: "/users/create" },
            { label: "Search", icon: PersonSearchRoundedIcon, href: "/users/view" },
            { label: "Manage", icon: ManageAccountsRoundedIcon, href: "/users/edit" }],
            Control: handleUsersSubMenuClick,
            StateControl: subMenuUsersOpen
        }]
    ]);

    const handleMenuItemClick = (MenuItemLabel: string) => {
        if (SubMenuItems.has(MenuItemLabel)) {
            SubMenuItems.get(MenuItemLabel)?.Control();

        } else {
            const href: string | undefined = MenuItems.find(item => item.label === MenuItemLabel)?.href;

            if (href) {
                router.push(href);
            }
        }
    }

    const handleSubmenuItemClick = (href: string) => {
        router.push(href);
    }

    return (
        <Drawer variant="permanent" open={menuOpen}>
            <DrawerHeader>
                <IconButton onClick={handleDrawer}>
                    <ChevronLeftIcon />
                </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
                {
                    MenuItems.map((item, index) => (
                        <ListItem key={item.label} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                onClick={() => handleMenuItemClick(item.label)}
                                sx={{
                                    minHeight: 48,
                                    justifyContent: menuOpen ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <Tooltip title={item.label}>
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: menuOpen ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <item.icon />
                                    </ListItemIcon>
                                </Tooltip>

                                <ListItemText primary={item.label} sx={{ opacity: menuOpen ? 1 : 0 }} />
                                {SubMenuItems.has(item.label) && (SubMenuItems.get(item.label)?.StateControl ? <ExpandLess /> : <ExpandMore />)}
                            </ListItemButton>

                            {/* SubMenu items */}
                            <Collapse in={SubMenuItems.get(item.label)?.StateControl} timeout="auto" unmountOnExit>
                                <List disablePadding>
                                    {SubMenuItems.get(item.label)?.Items.map((subItem, index) => (
                                        <ListItemButton key={subItem.label}
                                            onClick={() => handleSubmenuItemClick(subItem.href)}
                                            sx={{ pl: 4 }}>
                                            <Tooltip title={subItem.label}>
                                                <ListItemIcon>
                                                    <subItem.icon />
                                                </ListItemIcon>
                                            </Tooltip>
                                            <ListItemText primary={subItem.label} />
                                        </ListItemButton>
                                    ))}
                                </List>
                            </Collapse>
                        </ListItem>
                    ))
                }
            </List>
        </Drawer>
    );
};

export default SideBar;