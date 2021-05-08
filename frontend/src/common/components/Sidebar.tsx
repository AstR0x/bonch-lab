import React from 'react';
import { useSelector } from 'react-redux';
import {
  Theme,
  createStyles,
  makeStyles,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import { GroupOutlined, FormatListNumbered, Add } from '@material-ui/icons';

import { PATHS } from '@src/constants';
import { dictionariesSelectors } from '@features/dictionaries';
import { history } from '@store';

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
 * Боковая панель
 *
 * @param isTeacherAuthorized - преподаватель авторизован ?
 * @returns react-элемент
 */
export const Sidebar: React.FC<SidebarProps> = ({ isTeacherAuthorized }) => {
  const classes = useStyles();
  const { groups, topics } = useSelector(dictionariesSelectors.dictsSelector);

  /**
   * Обработчик кнопки перехода на страницу "Группа"
   *
   * @param id - идентификатор группы
   */
  const moveToGroupPage = (id: string) =>
    history.push(`${PATHS.GROUP_PAGE}`.replace(':id', id));

  /**
   * Обработчик кнопки перехода на страницу "Создание группы"
   */
  const moveToCreateGroupPage = () => history.push(PATHS.CREATE_GROUP_PAGE);

  /**
   * Обработчик кнопки перехода на страницу "Задачи по теме"
   *
   * @param id - идентификатор темы
   */
  const moveToTasksPage = (id: string) =>
    history.push(`${PATHS.TASKS_PAGE}`.replace(':id', id));

  /**
   * Обработчик кнопки перехода на страницу "Лабораторные по теме"
   *
   * @param id - идентификатор темы
   */
  const moveToLabsPage = (id: string) =>
    history.push(`${PATHS.LABS_PAGE}`.replace(':id', id));

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
                    moveToCreateGroupPage();
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
                  onClick={() => moveToGroupPage(group.id as string)}
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
                  ? moveToTasksPage(topic.id as string)
                  : moveToLabsPage(topic.id as string)
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
