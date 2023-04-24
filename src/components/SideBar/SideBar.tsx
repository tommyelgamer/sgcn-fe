import * as React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import DocsIcon from '@mui/icons-material/Article';
import ResultsIcon from '@mui/icons-material/EmojiEvents';
import EntryListIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import DefaultSectionIcon from '@mui/icons-material/DoubleArrow';
import TelegramIcon from '@mui/icons-material/Telegram';
import LoginIcon from '@mui/icons-material/Login';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import Skeleton from '@mui/material/Skeleton';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import Toolbar from '@mui/material/Toolbar';
import { useWindowSize } from '../../hooks/useWindowSize';
import { useGetChampionshipByCode } from '../../hooks/championships/useGetChampionshipByCode';
import { muiTheme } from '../../theme/customTheme';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { roleHasPermission } from '../../utils/role/roleHasPermission';
import EPermission from '../../utils/role/permission/permission.type';

const drawerWidth = 240;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children?: React.ReactElement;
}

export default function NavBar(props: Props) {
  const [cookies] = useCookies(['UserData']);
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams<{
    championshipCode: string;
  }>();
  const { championshipCode } = useParams();

  const championshipData = useGetChampionshipByCode(championshipCode || '');

  if (championshipData.isError) console.error(championshipData.error);

  const windowSize = useWindowSize();

  const isMobile: boolean = windowSize.width
    ? windowSize.width < muiTheme.breakpoints.values.sm
    : false;

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navigateToPage = (navigateTo: string) => {
    handleDrawerToggle();
    navigate(navigateTo);
  };

  const drawer = championshipData.isLoading ? (
    <div>
      <List>
        <ListItem
          disablePadding
          sx={{
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            mt: 2,
            mb: 2,
          }}
        >
          <Skeleton variant='rectangular' width={30} height={30} />
          <Skeleton variant='rectangular' width={150} height={30} />
        </ListItem>
        <ListItem
          disablePadding
          sx={{
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            mt: 2,
            mb: 2,
          }}
        >
          <Skeleton variant='rectangular' width={30} height={30} />
          <Skeleton variant='rectangular' width={150} height={30} />
        </ListItem>
        <ListItem
          disablePadding
          sx={{
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            mt: 2,
            mb: 2,
          }}
        >
          <Skeleton variant='rectangular' width={30} height={30} />
          <Skeleton variant='rectangular' width={150} height={30} />
        </ListItem>
        <ListItem
          disablePadding
          sx={{
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            mt: 2,
            mb: 2,
          }}
        >
          <Skeleton variant='rectangular' width={30} height={30} />
          <Skeleton variant='rectangular' width={150} height={30} />
        </ListItem>
        <ListItem
          disablePadding
          sx={{
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            mt: 2,
            mb: 2,
          }}
        >
          <Skeleton variant='rectangular' width={30} height={30} />
          <Skeleton variant='rectangular' width={150} height={30} />
        </ListItem>
      </List>
    </div>
  ) : (
    <div>
      <List>
        <ListItem key='home' disablePadding>
          <ListItemButton
            onClick={() => {
              navigateToPage(`/${championshipCode}`);
            }}
          >
            <ListItemIcon sx={{ color: muiTheme.palette.secondary.light }}>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary='Inicio' />
          </ListItemButton>
        </ListItem>
        <ListItem key='documents' disablePadding>
          <ListItemButton
            onClick={() => {
              navigateToPage(`/${championshipCode}/documents`);
            }}
          >
            <ListItemIcon sx={{ color: muiTheme.palette.secondary.light }}>
              <DocsIcon />
            </ListItemIcon>
            <ListItemText primary='Documentos' />
          </ListItemButton>
        </ListItem>
        <ListItem key='results' disablePadding>
          <ListItemButton
            onClick={() => {
              navigateToPage(`/${championshipCode}/results`);
            }}
          >
            <ListItemIcon sx={{ color: muiTheme.palette.secondary.light }}>
              <ResultsIcon />
            </ListItemIcon>
            <ListItemText primary='Resultados' />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        {championshipData.data?.championshipFeatures &&
          championshipData.data?.championshipFeatures.audienceIsEnabled && (
            <ListItem key='audiences' disablePadding>
              <ListItemButton
                onClick={() => {
                  navigateToPage(`/${championshipCode}/requests/audience`);
                }}
              >
                <ListItemIcon sx={{ color: muiTheme.palette.secondary.light }}>
                  <DefaultSectionIcon />
                </ListItemIcon>
                <ListItemText primary='Audiencias' />
              </ListItemButton>
            </ListItem>
          )}
        {championshipData.data?.championshipFeatures &&
          championshipData.data?.championshipFeatures.resultreviewIsEnabled && (
            <ListItem key='result-review' disablePadding>
              <ListItemButton
                onClick={() => {
                  navigateToPage(`/${championshipCode}/requests/resultreview`);
                }}
              >
                <ListItemIcon sx={{ color: muiTheme.palette.secondary.light }}>
                  <DefaultSectionIcon />
                </ListItemIcon>
                <ListItemText primary='Revision de Resultados' />
              </ListItemButton>
            </ListItem>
          )}
        {championshipData.data?.championshipFeatures &&
          championshipData.data?.championshipFeatures.equipmentchangeIsEnabled && (
            <ListItem key='equipment-change' disablePadding>
              <ListItemButton
                onClick={() => {
                  navigateToPage(`/${championshipCode}/requests/equipmentchange`);
                }}
              >
                <ListItemIcon sx={{ color: muiTheme.palette.secondary.light }}>
                  <DefaultSectionIcon />
                </ListItemIcon>
                <ListItemText primary='Cambio de Equipo' />
              </ListItemButton>
            </ListItem>
          )}
      </List>
      <Divider />
      <List>
        <ListItem key='announcements' disablePadding>
          <ListItemButton
            onClick={() => {
              navigateToPage(`/${championshipCode}/announcements`);
            }}
          >
            <ListItemIcon sx={{ color: muiTheme.palette.secondary.light }}>
              <AnnouncementIcon />
            </ListItemIcon>
            <ListItemText primary='Avisos a los competidores' />
          </ListItemButton>
        </ListItem>
        {championshipData.data?.championshipFeatures &&
          championshipData.data?.championshipFeatures.rule42IsEnabled && (
            <ListItem key='rule42' disablePadding>
              <ListItemButton
                onClick={() => {
                  navigateToPage(`/${championshipCode}/rule42`);
                }}
              >
                <ListItemIcon sx={{ color: muiTheme.palette.secondary.light }}>
                  <DefaultSectionIcon />
                </ListItemIcon>
                <ListItemText primary='Regla 42' />
              </ListItemButton>
            </ListItem>
          )}
        {championshipData.data?.championshipFeatures &&
          championshipData.data?.championshipFeatures.declarationsIsEnabled && (
            <ListItem key='competitor-declaration' disablePadding>
              <ListItemButton
                onClick={() => {
                  navigateToPage(`/${championshipCode}/declarations`);
                }}
              >
                <ListItemIcon sx={{ color: muiTheme.palette.secondary.light }}>
                  <DefaultSectionIcon />
                </ListItemIcon>
                <ListItemText primary='Declaracion de los competidores' />
              </ListItemButton>
            </ListItem>
          )}
      </List>
      <Divider />
      <List>
        {!cookies.UserData ? (
          <ListItem key='login' disablePadding>
            <ListItemButton
              onClick={() => {
                navigateToPage(
                  `/login?championshipCode=${params.championshipCode}&redirectUri=${location.pathname}`,
                );
              }}
            >
              <ListItemIcon sx={{ color: muiTheme.palette.secondary.light }}>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText primary='Login Autoridades' />
            </ListItemButton>
          </ListItem>
        ) : (
          <>
            {roleHasPermission(cookies.UserData.role, EPermission.UpdateChampionshipFeatures) && (
              <ListItem key='championship-config' disablePadding>
                <ListItemButton>
                  <ListItemIcon sx={{ color: muiTheme.palette.secondary.light }}>
                    <DefaultSectionIcon />
                  </ListItemIcon>
                  <ListItemText primary='Configuracion del campeonato' />
                </ListItemButton>
              </ListItem>
            )}
            <ListItem key='logout' disablePadding>
              <ListItemButton
                onClick={() => {
                  navigateToPage(`/logout?championshipCode=${params.championshipCode}`);
                }}
              >
                <ListItemIcon sx={{ color: muiTheme.palette.secondary.light }}>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary='Logout' />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position='fixed'
        elevation={0}
        sx={{
          backgroundColor: 'transparent',
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' }, color: 'black' }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component='nav'
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label='mailbox folders'
      >
        <Drawer
          container={isMobile ? container : undefined}
          variant={isMobile ? 'temporary' : 'permanent'}
          open={isMobile ? mobileOpen : true}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            // display: { xs: "block", sm: "none" },
            '& .MuiDrawer-paper': {
              color: muiTheme.palette.primary.contrastText,
              backgroundColor: muiTheme.palette.primary.main,
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        {/* {!isMobile && (
          <Drawer
            variant='permanent'
            sx={{
              // display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                color: muiTheme.palette.primary.contrastText,
                backgroundColor: muiTheme.palette.primary.main,
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        )} */}
      </Box>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          p: 3,
          width: { xs: '100%', sm: `calc(100% - ${drawerWidth}px)` },
          minHeight: '100%',
        }}
      >
        {isMobile && <Toolbar />}
        {props.children}
      </Box>
    </Box>
  );
}
