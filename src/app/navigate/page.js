'use client'

import React, { useState } from 'react';
import {
  AppBar, Toolbar, Typography, Container, Card, CardContent, CardHeader,
  TextField, Button, Select, MenuItem, FormControlLabel, Switch,
  List, ListItem, ListItemIcon, ListItemText, Tab, Tabs, Box,
  Badge, Slider, InputLabel, FormControl
} from '@mui/material';
import {
  Search, TrainOutlined, Compass, Map, VolumeUp, Print,
  Warning, Coffee, ShoppingBag, Info, MeetingRoom, DirectionsCar, LocationOn
} from '@mui/icons-material';
import CustMap from '../../components/Map';
import { Icon } from 'lucide-react';

// Updated mock data points matching the points used in CustMap
const destinations = [
  { id: 1, name: "Platform 1", type: "Platform", position: [19.19580749981172, 72.99722300742985] },
  { id: 2, name: "Ticket Counter", type: "Facility", position: [19.195198053795522, 72.99629677278443] },
  { id: 3, name: "Newsstand", type: "Retail", position: [19.19513596516697, 72.99629696803424] },
  { id: 4, name: "West Main Entrance", type: "Exit", position: [19.194351878878237, 72.99489849133272] },
  { id: 5, name: "Restrooms", type: "Facility", position: [19.195028, 72.996857] },
  { id: 6, name: "Café", type: "Retail", position: [19.195593, 72.996498] },
  { id: 7, name: "Taxi Stand", type: "Exit", position: [19.194675, 72.995502] },
  { id: 8, name: "City Museum", type: "Nearby Attraction", position: [19.1961, 72.9985] }
];

// Updated quick access points
const quickAccessDestinations = [
  { name: "Platform 1", icon: TrainOutlined, position: [19.19580749981172, 72.99722300742985]},
  { name: "Restrooms", icon: Coffee, position: [19.195028, 72.996857] },
  { name: "Ticket Counter", icon: TrainOutlined, position: [19.195198053795522, 72.99629677278443] },
  { name: "Café", icon: ShoppingBag, position: [19.195593, 72.996498] },
];

export default function NavigateToDestination() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentLocation, setCurrentLocation] = useState("West Main Entrance");
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [mapView, setMapView] = useState("2D");
  const [language, setLanguage] = useState("English");
  const [accessibilityMode, setAccessibilityMode] = useState(false);
  const [voiceGuidance, setVoiceGuidance] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [routeFrom, setRouteFrom] = useState(null);
  const [routeTo, setRouteTo] = useState(null);

  const filteredDestinations = destinations.filter(dest => 
    dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dest.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleQuickAccess = (destination) => {
    const selectedDest = quickAccessDestinations.find(dest => dest.name === destination);
    if (selectedDest) {
      setSelectedDestination(selectedDest.name);
      setRouteTo(selectedDest.position);
    }
  };

  const handleSearch = () => {
    const foundDestination = destinations.find(dest =>
      dest.name.toLowerCase() === searchTerm.toLowerCase()
    );
    if (foundDestination) {
      setSelectedDestination(foundDestination.name);
      setRouteTo(foundDestination.position);
    }
  };

  const handleCurrentLocationChange = (e) => {
    const selectedLocation = destinations.find(dest => dest.name === e.target.value);
    if (selectedLocation) {
      setCurrentLocation(selectedLocation.name);
      setRouteFrom(selectedLocation.position);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Navigate to Destination
        </Typography>
        
        <Card sx={{ mb: 4 }}>
          <CardHeader 
            title="Search Destination"
            subheader="Enter a destination or select from quick access options"
          />
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Search sx={{ mr: 1 }} />
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search for platform, facility, shop, or attraction"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ mr: 1 }}
              />
              <Button variant="contained" onClick={handleSearch}>Go</Button>
            </Box>
            
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 1, mb: 2 }}>
              {quickAccessDestinations.map((dest, index) => (
                <Button
                  key={index}
                  variant="outlined"
                  startIcon={<dest.icon />}
                  onClick={() => handleQuickAccess(dest.name)}
                >
                  {dest.name}
                </Button>
              ))}
            </Box>
            
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="current-location-label">Current Location</InputLabel>
              <Select
                labelId="current-location-label"
                value={currentLocation}
                label="Current Location"
                onChange={handleCurrentLocationChange}
              >
                {destinations.map((dest) => (
                  <MenuItem key={dest.id} value={dest.name}>{dest.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            
            {searchTerm && (
              <List sx={{ maxHeight: 200, overflow: 'auto', border: 1, borderColor: 'divider', borderRadius: 1 }}>
                {filteredDestinations.map((dest) => (
                  <ListItem
                    button
                    key={dest.id}
                    onClick={() => {
                      setSelectedDestination(dest.name);
                      setRouteTo(dest.position);
                    }}
                  >
                    <ListItemIcon>
                      <LocationOn />
                    </ListItemIcon>
                    <ListItemText 
                      primary={dest.name}
                      secondary={
                        <Badge color="secondary" badgeContent={dest.type} />
                      }
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </CardContent>
        </Card>
        
        {selectedDestination && (
          <Card sx={{ mb: 4 }}>
            <CardHeader
              title={`Route to ${selectedDestination}`}
              subheader="Follow these directions to reach your destination"
            />
            <CardContent>
              <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} sx={{ mb: 2 }}>
                <Tab label="Map View" />
                <Tab label="Step-by-Step Directions" />
              </Tabs>
              
              <Box hidden={tabValue !== 0}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
                  <Button 
                    variant="outlined" 
                    size="small"
                    onClick={() => setMapView(mapView === "2D" ? "3D" : "2D")}
                  >
                    Switch to {mapView === "2D" ? "3D" : "2D"} View
                  </Button>
                </Box>
                <Box sx={{ height: 300, bgcolor: 'action.hover', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CustMap from={routeFrom} to={routeTo} />
                </Box>
              </Box>
              
              <Box hidden={tabValue !== 1} sx={{ height: 300, overflow: 'auto', border: 1, borderColor: 'divider', borderRadius: 1, p: 2 }}>
                <ol>
                  <li>Start at your current location: {currentLocation}</li>
                  <li>Head towards the main concourse</li>
                  <li>Turn right at the information desk</li>
                  <li>Walk straight for about 50 meters</li>
                  <li>Your destination, {selectedDestination}, will be on your left</li>
                </ol>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2 }}>
                <Box>
                  <Typography variant="body2">Estimated Time: 5 minutes</Typography>
                  <Typography variant="body2">Distance: 200 meters</Typography>
                </Box>
                <Button variant="outlined" startIcon={<Print />} size="small">
                  Print Directions
                </Button>
              </Box>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={accessibilityMode}
                      onChange={(e) => setAccessibilityMode(e.target.checked)}
                    />
                  }
                  label="Accessibility-Friendly Route"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={voiceGuidance}
                      onChange={(e) => setVoiceGuidance(e.target.checked)}
                    />
                  }
                  label="Enable Voice Guidance"
                />
              </Box>
            </CardContent>
          </Card>
        )}
      </Container>
    </Box>
  );
}