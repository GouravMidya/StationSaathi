import { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Drawer, List, ListItem, ListItemText, Box } from '@mui/material';
import { Train, Menu } from 'lucide-react';
import Link from 'next/link';
import useMediaQuery from '@mui/material/useMediaQuery';
import { usePathname } from 'next/navigation'; // Import usePathname to get the current route

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Navigation', href: '/navigate' },
  { name: 'Facilities', href: '/facilities' },
  { name: 'Schedules', href: '/schedules' },
  { name: 'Emergency', href: '/emergency' },
  { name: 'Information', href: '/info' },
  { name: 'Feedback', href: '/feedback' },
  { name: 'Settings', href: '/settings' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:960px)');
  const pathname = usePathname(); // Get current path

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsOpen(open);
  };

  const drawerList = () => (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {navItems.map((item) => (
          <ListItem
            button
            key={item.name}
            component={Link}
            href={item.href}
            sx={{
              backgroundColor: pathname === item.href ? 'primary.light' : 'transparent', // Light background for active link
              '&:hover': { backgroundColor: 'primary.light' },
            }}
          >
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" component={Link} href="/">
          <Train />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          StationSaathi
        </Typography>
        {isMobile ? (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer(true)}
          >
            <Menu />
          </IconButton>
        ) : (
          <Box>
            {navItems.map((item) => (
              <Button
                key={item.name}
                color="inherit"
                component={Link}
                href={item.href}
                sx={{
                  backgroundColor: pathname === item.href ? 'primary.light' : 'transparent', // Light background for active link
                  '&:hover': { backgroundColor: 'primary.light' },
                }}
              >
                {item.name}
              </Button>
            ))}
          </Box>
        )}
        <Drawer anchor="right" open={isOpen} onClose={toggleDrawer(false)}>
          {drawerList()}
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}
