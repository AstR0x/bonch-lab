import React from 'react';
import {
  createStyles,
  makeStyles,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { GroupOutlined } from '@material-ui/icons';

import { URLS } from '@src/constants';
import { history } from '@store';

const useStyles = makeStyles(() =>
  createStyles({
    drawer: {
      width: 250,
      flexShrink: 0,
    },
    drawerPaper: {
      paddingTop: 128,
      width: 250,
    },
    drawerContainer: {
      overflow: 'auto',
    },
  }),
);

interface SidebarProps {
  pathname: string;
}

/**
 * Боковая панель
 *
 * @param pathname - адрес текущей страницы
 * @returns react-элемент
 */
export const Sidebar: React.FC<SidebarProps> = ({ pathname }) => {
  const classes = useStyles();
  const menuItems = [
    {
      title: 'Группы',
      url: URLS.GROUPS_PAGE,
      icon: <GroupOutlined />,
    },
  ];

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{ paper: classes.drawerPaper }}
      anchor="left"
    >
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.title}
            selected={pathname === item.url}
            onClick={() => history.push(item.url)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};
