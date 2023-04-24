import * as React from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IconButton, ListItemIcon, ListItemText } from '@mui/material';
import muiTheme from '../../theme/customTheme';

interface IProps {
  menuItems: {
    text: string;
    onClick: (...params: any[]) => void;
    danger?: boolean;
    icon?: React.ReactElement;
  }[];
}

export default function BasicMenu({ menuItems }: IProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        id='basic-button'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {menuItems.map((item, i) => {
          return (
            <MenuItem
              key={i}
              onClick={() => {
                handleClose();
                item.onClick();
              }}
              sx={{
                backgroundColor: item.danger
                  ? muiTheme.palette.error.main
                  : muiTheme.palette.background.paper,
                '&:hover': {
                  backgroundColor: item.danger
                    ? muiTheme.palette.error.dark
                    : muiTheme.palette.background.default,
                },
              }}
            >
              {item.icon && (
                <ListItemIcon
                  sx={{
                    color: item.danger
                      ? muiTheme.palette.error.contrastText
                      : muiTheme.palette.action.active,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
              )}
              <ListItemText
                sx={{
                  color: item.danger
                    ? muiTheme.palette.error.contrastText
                    : muiTheme.palette.text.primary,
                }}
              >
                {item.text}
              </ListItemText>
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}
