'use client'

import { useState } from 'react'
import {
  Tabs,
  Tab,
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Alert,
} from '@mui/material'
import {
  AlertTriangle,
  Phone,
  Siren,
  Shield,
  FireExtinguisher,
  BriefcaseMedical,
  DoorOpen,
  MapPin,
  Camera,
  Send,
} from 'lucide-react'

const emergencyContacts = [
  { name: 'Police', number: '999', icon: Siren },
  { name: 'Medical Emergency', number: '999', icon: BriefcaseMedical },
  { name: 'Fire Department', number: '999', icon: FireExtinguisher },
  { name: 'Station Security', number: '0123 456 789', icon: Shield },
]

const safetyInstructions = [
  {
    title: 'Emergency Exits',
    content:
      'Emergency exits are located at the north and south ends of each platform. Follow the illuminated signs.',
    icon: DoorOpen,
  },
  {
    title: 'Evacuation Routes',
    content:
      'In case of evacuation, follow the green signs to the nearest exit. Do not use elevators.',
    icon: MapPin,
  },
  {
    title: 'First Aid Procedures',
    content:
      'First aid kits are available at all information desks and with station staff. For minor injuries, seek assistance from staff.',
    icon: BriefcaseMedical,
  },
]

const incidentTypes = [
  'Suspicious Activity',
  'Medical Emergency',
  'Fire',
  'Theft',
  'Lost Item',
  'Facility Damage',
  'Other',
]

export default function EmergencyServices() {
  const [tabValue, setTabValue] = useState(0)
  const [incidentType, setIncidentType] = useState('')
  const [incidentDescription, setIncidentDescription] = useState('')
  const [photoAttached, setPhotoAttached] = useState(false)

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const handleSubmitReport = (e) => {
    e.preventDefault()
    // In a real application, this would send the report to the authorities
    console.log('Incident Report:', { incidentType, incidentDescription, photoAttached })
    alert('Your report has been submitted. Authorities have been notified.')
    setIncidentType('')
    setIncidentDescription('')
    setPhotoAttached(false)
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Main Content */}
      <Box sx={{ maxWidth: '1200px', mx: 'auto', p: 2 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 'bold' }}>
          Emergency Services
        </Typography>

        {/* Tabs */}
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="emergency services tabs">
          <Tab label="Emergency Contacts" />
          <Tab label="Safety Instructions" />
          <Tab label="Report an Incident" />
        </Tabs>

        {/* Emergency Contacts Tab */}
        {tabValue === 0 && (
          <Card sx={{ mt: 2 }}>
            <CardHeader
              title="Emergency Contacts"
              subheader="Call these numbers in case of emergency"
            />
            <CardContent>
              <Grid container spacing={2}>
                {emergencyContacts.map((contact, index) => {
                  const IconComponent = contact.icon
                  return (
                    <Grid item xs={12} md={6} key={index}>
                      <Card variant="outlined">
                        <CardContent
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            p: 2,
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <IconComponent size={32} color="#1976d2" />
                            <Box sx={{ ml: 2 }}>
                              <Typography variant="h6">{contact.name}</Typography>
                              <Typography variant="body2" color="text.secondary">
                                {contact.number}
                              </Typography>
                            </Box>
                          </Box>
                          <Button variant="outlined" startIcon={<Phone size={16} />}>
                            Call
                          </Button>
                        </CardContent>
                      </Card>
                    </Grid>
                  )
                })}
              </Grid>
            </CardContent>
          </Card>
        )}

        {/* Safety Instructions Tab */}
        {tabValue === 1 && (
          <Card sx={{ mt: 2 }}>
            <CardHeader
              title="Safety Instructions"
              subheader="Important information for emergencies"
            />
            <CardContent>
              <Box sx={{ maxHeight: '400px', overflowY: 'auto', pr: 1 }}>
                {safetyInstructions.map((instruction, index) => {
                  const IconComponent = instruction.icon
                  return (
                    <Card variant="outlined" sx={{ mb: 2 }} key={index}>
                      <CardContent sx={{ display: 'flex', alignItems: 'flex-start', p: 2 }}>
                        <IconComponent size={32} color="#1976d2" />
                        <Box sx={{ ml: 2 }}>
                          <Typography variant="h6" sx={{ mb: 1 }}>
                            {instruction.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {instruction.content}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  )
                })}
              </Box>
            </CardContent>
          </Card>
        )}

        {/* Report an Incident Tab */}
        {tabValue === 2 && (
          <Card sx={{ mt: 2 }}>
            <CardHeader
              title="Report an Incident"
              subheader="Submit details about any incidents or emergencies"
            />
            <CardContent>
              <form onSubmit={handleSubmitReport}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {/* Incident Type */}
                  <FormControl fullWidth>
                    <InputLabel id="incident-type-label">Incident Type</InputLabel>
                    <Select
                      labelId="incident-type-label"
                      id="incident-type"
                      value={incidentType}
                      label="Incident Type"
                      onChange={(e) => setIncidentType(e.target.value)}
                      required
                    >
                      {incidentTypes.map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  {/* Incident Description */}
                  <TextField
                    id="incident-description"
                    label="Description and Details"
                    placeholder="Provide a detailed description of the incident"
                    multiline
                    rows={5}
                    variant="outlined"
                    value={incidentDescription}
                    onChange={(e) => setIncidentDescription(e.target.value)}
                    required
                  />

                  {/* Attach Photo */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Button
                      variant={photoAttached ? 'contained' : 'outlined'}
                      startIcon={<Camera size={16} />}
                      onClick={() => setPhotoAttached(!photoAttached)}
                    >
                      {photoAttached ? 'Photo Attached' : 'Attach Photo'}
                    </Button>
                    {photoAttached && (
                      <Typography variant="body2" color="text.secondary">
                        Photo attached successfully
                      </Typography>
                    )}
                  </Box>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    endIcon={<Send size={16} />}
                    fullWidth
                  >
                    Submit Report
                  </Button>
                </Box>
              </form>
            </CardContent>
          </Card>
        )}
      </Box>
    </Box>
  )
}
