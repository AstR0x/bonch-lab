import React from 'react';
import { useSelector } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { GroupOutlined, FormatListNumbered, Add } from '@material-ui/icons';
import {
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Tooltip,
} from '@material-ui/core';

import { navUtils } from '@features/navigation';
import { dictionariesSelectors } from '@features/dictionaries';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: 250,
      flexShrink: 0,
    },
    drawerPaper: {
      paddingTop: 64,
      width: 250,
    },
    drawerContainer: {
      overflow: 'auto',
    },
    listItemText: {
      fontSize: 14,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }),
);

interface SidebarProps {
  isTeacherAuthorized: boolean;
}

/**
 * Компонент "Боковая панель"
 *
 * @param isTeacherAuthorized - преподаватель авторизован ?
 * @returns react-элемент
 */
export const Sidebar: React.FC<SidebarProps> = ({ isTeacherAuthorized }) => {
  const classes = useStyles();
  const { groups, topics } = useSelector(dictionariesSelectors.dictsSelector);

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{ paper: classes.drawerPaper }}
      anchor="left"
    >
      <Divider />
      <List>
        {isTeacherAuthorized && (
          <>
            <ListItem>
              <ListItemIcon>
                <GroupOutlined />
              </ListItemIcon>
              <ListItemText>Группы</ListItemText>
              <Tooltip title="Добавить группу">
                <IconButton
                  onClick={(event) => {
                    event.stopPropagation();
                    navUtils.goToCreateGroupPage();
                  }}
                >
                  <Add />
                </IconButton>
              </Tooltip>
            </ListItem>
            <List component="div" disablePadding>
              {groups.map((group) => (
                <ListItem
                  button
                  key={group.id}
                  className={classes.nested}
                  onClick={() => navUtils.goToGroupPage(group.id as string)}
                >
                  <ListItemText classes={{ primary: classes.listItemText }}>
                    {group.title}
                  </ListItemText>
                </ListItem>
              ))}
            </List>
          </>
        )}
        <List component="div" disablePadding>
          <ListItem button>
            <ListItemIcon>
              <FormatListNumbered />
            </ListItemIcon>
            <ListItemText>Темы</ListItemText>
          </ListItem>
          {topics.map((topic) => (
            <ListItem
              button
              key={topic.id}
              className={classes.nested}
              onClick={() =>
                isTeacherAuthorized
                  ? navUtils.goToTasksPage(topic.id as string)
                  : navUtils.goToLabsPage(topic.id as string)
              }
            >
              <ListItemText classes={{ primary: classes.listItemText }}>
                {topic.id}. {topic.title}
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </List>
    </Drawer>
  );
};
