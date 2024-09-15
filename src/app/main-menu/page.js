'use client'

import { useState } from 'react'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Link from 'next/link'
import { MapPin, Building, Clock, Phone, Info, MessageSquare, Settings, Train } from 'lucide-react'

export default function Component() {
  const [highContrast, setHighContrast] = useState(false)

  const menuItems = [
    { icon: MapPin, label: 'Navigate to Destination', href: '/navigate' },
    { icon: Building, label: 'Station Facilities', href: '/facilities' },
    { icon: Clock, label: 'Train Schedules', href: '/schedules' },
    { icon: Phone, label: 'Emergency Services', href: '/emergency' },
    { icon: Info, label: 'General Information', href: '/info' },
    { icon: MessageSquare, label: 'Feedback and Support', href: '/feedback' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ]

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: highContrast ? 'black' : 'background.paper',
        color: highContrast ? 'white' : 'text.primary',
      }}
    >
      <Card sx={{ width: '90%', maxWidth: 600 }}>
        <CardHeader
          title={
            <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
              <Train width={32} height={32} />
              StationSaathi
            </Box>
          }
          subheader="Station Navigation System"
          sx={{ textAlign: 'center' }}
        />
        <CardContent>
          <Grid container spacing={2}>
            {menuItems.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Link href={item.href} passHref>
                  <Button
                    variant="outlined"
                    sx={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      gap: 1,
                      transition: 'background-color 0.3s, color 0.3s',
                      '&:hover': {
                        backgroundColor: 'primary.main',
                        color: 'primary.contrastText',
                      },
                    }}
                  >
                    <item.icon width={24} height={24} />
                    <Typography variant="body2">{item.label}</Typography>
                  </Button>
                </Link>
              </Grid>
            ))}
          </Grid>
        </CardContent>
        <CardActions sx={{ justifyContent: 'center' }}>
          <Typography variant="body2" color="textSecondary">
            Select an option to continue
          </Typography>
        </CardActions>
      </Card>
    </Box>
  )
}
