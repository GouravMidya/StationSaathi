'use client'

import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Tabs,
  Tab,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { Train, Search } from '@mui/icons-material';

// Mock data (same as in the original code)
const trainSchedules = [
  { id: 1, trainNumber: "EX101", destination: "London", departureTime: "10:00", platform: 3, status: "On Time" },
  { id: 2, trainNumber: "IC205", destination: "Manchester", departureTime: "10:15", platform: 1, status: "Delayed" },
  { id: 3, trainNumber: "RE150", destination: "Birmingham", departureTime: "10:30", platform: 2, status: "On Time" },
  { id: 4, trainNumber: "EX102", destination: "Edinburgh", departureTime: "10:45", platform: 4, status: "Cancelled" },
  { id: 5, trainNumber: "IC210", destination: "Glasgow", departureTime: "11:00", platform: 5, status: "On Time" },
];

const platformInfo = [
  { platform: 1, amenities: ["Seating", "Vending Machine"], accessibility: "Wheelchair Access" },
  { platform: 2, amenities: ["Seating", "Coffee Shop"], accessibility: "Elevator Access" },
  { platform: 3, amenities: ["Seating", "Newsstand"], accessibility: "Wheelchair Access" },
  { platform: 4, amenities: ["Seating", "Charging Points"], accessibility: "Elevator Access" },
  { platform: 5, amenities: ["Seating", "Restrooms"], accessibility: "Wheelchair Access" },
];

const ticketClasses = [
  { class: "Standard", price: 25 },
  { class: "First Class", price: 50 },
  { class: "Business", price: 75 },
];

export default function TrainSchedules() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState(1);
  const [selectedTicketClass, setSelectedTicketClass] = useState("Standard");
  const [tabValue, setTabValue] = useState(0);

  const filteredSchedules = trainSchedules.filter(train => 
    train.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
    train.trainNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Train Schedules
        </Typography>

        <Tabs value={tabValue} onChange={handleTabChange} aria-label="train information tabs">
          <Tab label="Departures" />
          <Tab label="Arrivals" />
          <Tab label="Platform Info" />
          <Tab label="Tickets" />
        </Tabs>

        {tabValue === 0 && (
          <Card sx={{ mt: 2 }}>
            <CardHeader title="Live Departure Board" subheader="Search by destination or train number" />
            <CardContent>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search destination or train number"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <Search />,
                }}
                sx={{ mb: 2 }}
              />
              <TableContainer component={Paper} sx={{ maxHeight: 400, overflow: 'auto' }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>Train</TableCell>
                      <TableCell>Destination</TableCell>
                      <TableCell>Time</TableCell>
                      <TableCell>Platform</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredSchedules.map((train) => (
                      <TableRow key={train.id}>
                        <TableCell>{train.trainNumber}</TableCell>
                        <TableCell>{train.destination}</TableCell>
                        <TableCell>{train.departureTime}</TableCell>
                        <TableCell>{train.platform}</TableCell>
                        <TableCell>
                          <Chip
                            label={train.status}
                            color={train.status === "On Time" ? "success" : train.status === "Delayed" ? "warning" : "error"}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        )}

        {tabValue === 1 && (
          <Card sx={{ mt: 2 }}>
            <CardHeader title="Live Arrival Board" subheader="Arrival information is currently not available" />
            <CardContent>
              <Typography variant="body1" color="text.secondary" align="center" sx={{ py: 10 }}>
                Arrival data will be displayed here when available
              </Typography>
            </CardContent>
          </Card>
        )}

        {tabValue === 2 && (
          <Card sx={{ mt: 2 }}>
            <CardHeader title="Platform Information" subheader="Select a platform to view details" />
            <CardContent>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="platform-select-label">Select Platform</InputLabel>
                <Select
                  labelId="platform-select-label"
                  value={selectedPlatform}
                  label="Select Platform"
                  onChange={(e) => setSelectedPlatform(e.target.value)}
                >
                  {platformInfo.map((platform) => (
                    <MenuItem key={platform.platform} value={platform.platform}>
                      Platform {platform.platform}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {platformInfo.find(p => p.platform === selectedPlatform) && (
                <div>
                  <Typography variant="h6" gutterBottom>Amenities</Typography>
                  <List>
                    {platformInfo.find(p => p.platform === selectedPlatform)?.amenities.map((amenity, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={amenity} />
                      </ListItem>
                    ))}
                  </List>
                  <Typography variant="h6" gutterBottom>Accessibility</Typography>
                  <Typography variant="body1" paragraph>
                    {platformInfo.find(p => p.platform === selectedPlatform)?.accessibility}
                  </Typography>
                  <Typography variant="h6" gutterBottom>Directions</Typography>
                  <Typography variant="body1" paragraph>
                    Follow the signs to Platform {selectedPlatform}. If you need assistance, please ask a staff member.
                  </Typography>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {tabValue === 3 && (
          <Card sx={{ mt: 2 }}>
            <CardHeader title="Ticket Information" subheader="View prices and purchase tickets" />
            <CardContent>
              <Typography variant="h6" gutterBottom>Ticket Prices and Classes</Typography>
              <TableContainer component={Paper} sx={{ mb: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Class</TableCell>
                      <TableCell>Price</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {ticketClasses.map((ticketClass) => (
                      <TableRow key={ticketClass.class}>
                        <TableCell>{ticketClass.class}</TableCell>
                        <TableCell>£{ticketClass.price}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Typography variant="h6" gutterBottom>Purchase Tickets</Typography>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="ticket-class-select-label">Select Class</InputLabel>
                <Select
                  labelId="ticket-class-select-label"
                  value={selectedTicketClass}
                  label="Select Class"
                  onChange={(e) => setSelectedTicketClass(e.target.value)}
                >
                  {ticketClasses.map((ticketClass) => (
                    <MenuItem key={ticketClass.class} value={ticketClass.class}>
                      {ticketClass.class}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button variant="contained" color="primary">
                Purchase {selectedTicketClass} Ticket
              </Button>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Booking Confirmation Retrieval</Typography>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Enter booking reference"
                sx={{ mb: 2 }}
              />
              <Button variant="outlined" color="primary">
                Retrieve Booking
              </Button>
            </CardContent>
          </Card>
        )}
      </Container>
    </div>
  );
}