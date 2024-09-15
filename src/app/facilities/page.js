'use client'

import React, { useState } from 'react';
import { 
  Tabs, Tab, Typography, Card, CardContent, CardActions, 
  Button, Box, Container, Grid, List, ListItem, ListItemText,
  ListItemIcon, Divider
} from '@mui/material';
import { 
  Restaurant as UtensilsIcon, 
  ShoppingBag as ShoppingBagIcon, 
  Build as WrenchIcon, 
  Coffee as CoffeeIcon, 
  Accessible as ElevatorIcon,
  Wifi as WifiIcon,
  BatteryChargingFull as BatteryIcon,
  AccessTime as PrayingHandsIcon,
  LocalHospital as FirstAidIcon,
  Weekend as ArmchairIcon,
  Group as UsersIcon,
  HelpOutline as HelpCircleIcon,
  Visibility as EyeIcon,
  Hearing as EarIcon
} from '@mui/icons-material';

const diningData = [
    { name: "Station Café", cuisine: "Coffee & Snacks", hours: "6:00 AM - 10:00 PM", occupancy: "Medium" },
    { name: "Sushi Express", cuisine: "Japanese", hours: "11:00 AM - 9:00 PM", occupancy: "Low" },
    { name: "Burger Junction", cuisine: "American", hours: "10:00 AM - 11:00 PM", occupancy: "High" },
    { name: "Pizza Plaza", cuisine: "Italian", hours: "11:00 AM - 10:00 PM", occupancy: "Medium" },
    { name: "Veggie Delight", cuisine: "Vegetarian", hours: "8:00 AM - 9:00 PM", occupancy: "Low" },
  ]
  
  const shoppingData = [
    { name: "NewsCorner", type: "Convenience Store", hours: "24/7", occupancy: "Low" },
    { name: "TravelEssentials", type: "Travel Gear", hours: "8:00 AM - 9:00 PM", occupancy: "Medium" },
    { name: "GiftStop", type: "Souvenirs", hours: "9:00 AM - 8:00 PM", occupancy: "Low" },
    { name: "Fashion Express", type: "Clothing", hours: "10:00 AM - 9:00 PM", occupancy: "Medium" },
    { name: "Tech Hub", type: "Electronics", hours: "9:00 AM - 8:00 PM", occupancy: "High" },
  ]
  
  const servicesData = [
    { name: "ATM Zone", type: "Financial", location: "Near Main Entrance" },
    { name: "Luggage Lockers", type: "Storage", location: "Platform 1" },
    { name: "Wi-Fi Hotspot", type: "Internet", location: "Throughout Station" },
    { name: "Charging Station", type: "Power", location: "Waiting Area" },
    { name: "Prayer Room", type: "Religious", location: "2nd Floor" },
    { name: "First Aid Station", type: "Medical", location: "Information Desk" },
  ]
  
  const amenitiesData = [
    { name: "Main Waiting Area", type: "Seating", location: "Central Hall" },
    { name: "Kids' Corner", type: "Play Area", location: "Near Food Court" },
    { name: "Information Desk", type: "Assistance", location: "Main Entrance" },
    { name: "Quiet Zone", type: "Relaxation", location: "2nd Floor" },
    { name: "Business Center", type: "Work Space", location: "3rd Floor" },
  ]
  
  const accessibilityData = [
    { name: "Elevators", type: "Mobility", location: "All Levels" },
    { name: "Tactile Paths", type: "Visual Aid", location: "Main Pathways" },
    { name: "Hearing Loop", type: "Audio Aid", location: "Information Desk" },
    { name: "Wheelchair Service", type: "Mobility", location: "Main Entrance" },
    { name: "Accessible Restrooms", type: "Sanitation", location: "All Levels" },
  ]

function FacilityList({ data, showOccupancy = false }) {
  return (
    <Box sx={{ maxHeight: 'calc(100vh - 300px)', overflow: 'auto', pr: 2 }}>
      {data.map((item, index) => (
        <Card key={index} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{item.name}</Typography>
            <Typography color="textSecondary">{item.type || item.cuisine}</Typography>
            <Typography variant="body2">Hours: {item.hours}</Typography>
            {showOccupancy && <Typography variant="body2">Occupancy: {item.occupancy}</Typography>}
            <Typography variant="body2">Location: {item.location}</Typography>
          </CardContent>
          <CardActions>
            <Button size="small">View Details</Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
}

function MapView() {
  return (
    <Box 
      sx={{ 
        height: 'calc(100vh - 300px)', 
        bgcolor: 'action.hover', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}
    >
      <Typography>Map View (Placeholder)</Typography>
    </Box>
  );
}

export default function StationFacilities() {
  const [tabValue, setTabValue] = useState('dining');
  const [view, setView] = useState('list');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Station Facilities
        </Typography>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          variant="fullWidth" 
          sx={{ mb: 4 }}
        >
          <Tab icon={<UtensilsIcon />} label="Dining" value="dining" />
          <Tab icon={<ShoppingBagIcon />} label="Shopping" value="shopping" />
          <Tab icon={<WrenchIcon />} label="Services" value="services" />
          <Tab icon={<CoffeeIcon />} label="Amenities" value="amenities" />
          <Tab icon={<ElevatorIcon />} label="Accessibility" value="accessibility" />
        </Tabs>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h4" component="h2">
            Facility Details
          </Typography>
          <Box>
            <Button 
              onClick={() => setView('list')} 
              variant={view === 'list' ? 'contained' : 'outlined'} 
              sx={{ mr: 1 }}
            >
              List View
            </Button>
            <Button 
              onClick={() => setView('map')} 
              variant={view === 'map' ? 'contained' : 'outlined'}
            >
              Map View
            </Button>
          </Box>
        </Box>

        {tabValue === 'dining' && (
          view === 'list' ? <FacilityList data={diningData} showOccupancy={true} /> : <MapView />
        )}
        {tabValue === 'shopping' && (
          view === 'list' ? <FacilityList data={shoppingData} showOccupancy={true} /> : <MapView />
        )}
        {tabValue === 'services' && (
          <Box sx={{ maxHeight: 'calc(100vh - 300px)', overflow: 'auto' }}>
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12} md={6} lg={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6"><WifiIcon sx={{ mr: 1 }} />Wi-Fi Zones</Typography>
                    <Typography variant="body2">Free Wi-Fi available throughout the station</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6"><BatteryIcon sx={{ mr: 1 }} />Charging Stations</Typography>
                    <Typography variant="body2">Located in waiting areas and near gates</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6"><PrayingHandsIcon sx={{ mr: 1 }} />Prayer Rooms</Typography>
                    <Typography variant="body2">Available on the 2nd floor, open 24/7</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6"><FirstAidIcon sx={{ mr: 1 }} />Medical Facilities</Typography>
                    <Typography variant="body2">First aid station near the information desk</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            {view === 'list' ? <FacilityList data={servicesData} /> : <MapView />}
          </Box>
        )}
        {tabValue === 'amenities' && (
          <Box sx={{ maxHeight: 'calc(100vh - 300px)', overflow: 'auto' }}>
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12} md={6} lg={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6"><ArmchairIcon sx={{ mr: 1 }} />Waiting Areas</Typography>
                    <Typography variant="body2">Comfortable seating available in the central hall</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6"><UsersIcon sx={{ mr: 1 }} />Play Areas for Children</Typography>
                    <Typography variant="body2">Kid&apos;s Corner located near the food court</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6"><HelpCircleIcon sx={{ mr: 1 }} />Information Desks</Typography>
                    <Typography variant="body2">Located at the main entrance for your assistance</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            {view === 'list' ? <FacilityList data={amenitiesData} /> : <MapView />}
          </Box>
        )}
        {tabValue === 'accessibility' && (
          <Box sx={{ maxHeight: 'calc(100vh - 300px)', overflow: 'auto' }}>
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12} md={6} lg={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6"><ElevatorIcon sx={{ mr: 1 }} />Elevators and Ramps</Typography>
                    <Typography variant="body2">Available on all levels for easy access</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6"><EyeIcon sx={{ mr: 1 }} />Tactile Paths</Typography>
                    <Typography variant="body2">For visually impaired, available on main pathways</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6"><EarIcon sx={{ mr: 1 }} />Hearing Aid Assistance</Typography>
                    <Typography variant="body2">Hearing loops available at information desks</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            {view === 'list' ? <FacilityList data={accessibilityData} /> : <MapView />}
          </Box>
        )}
      </Container>
    </>
  );
}