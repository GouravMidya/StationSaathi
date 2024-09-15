'use client'

import { useState } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Clock, Phone, Bus, CarTaxiFront, Car, Bike, Hotel, Landmark, Calendar, AlertTriangle, Search } from 'lucide-react'

const stationInfo = {
  history: "Central Station, opened in 1879, is a historic landmark that has served as the city's main transportation hub for over 140 years. The station's iconic clock tower, added in 1912, has become a symbol of the city.",
  hours: "Monday to Sunday: 4:30 AM - 1:30 AM",
  contact: {
    phone: "+44 20 1234 5678",
    email: "info@centralstation.com",
    address: "1 Station Square, City Center, AB1 2CD"
  }
}

const transportLinks = [
  { type: "Bus Services", info: "Bus stops are located at the north and south exits. Services run every 10-15 minutes to major city destinations." },
  { type: "Taxi Services", info: "Official taxi rank is situated at the west entrance. All taxis are metered and licensed by the city council." },
  { type: "Ride-Sharing Zones", info: "Designated pick-up and drop-off points for ride-sharing services are marked in the short-stay car park." },
  { type: "Parking Facilities", info: "Long-stay and short-stay parking available. Pre-booking is recommended for long-stay parking." },
  { type: "Bicycle Rentals and Storage", info: "Bike rental station located near the east exit. Secure bicycle storage available for a small fee." }
]

const localInfo = [
  { type: "Nearby Hotels", items: ["Central Plaza Hotel", "Railway Inn", "City View Suites"] },
  { type: "Tourist Attractions", items: ["City Museum", "Botanical Gardens", "Historic Old Town"] },
  { type: "Local Events", items: ["Summer Music Festival (July)", "Food and Wine Fair (September)", "Winter Lights Parade (December)"] }
]

const policies = [
  { type: "Code of Conduct", content: "Respect fellow travelers, maintain cleanliness, and follow staff instructions at all times." },
  { type: "Security Policies", content: "All luggage is subject to random checks. Unattended items will be removed and may be destroyed." },
  { type: "Lost and Found", content: "Report lost items at the information desk. Found items are kept for 30 days before disposal." }
]

export default function GeneralInformation() {
  const [searchTerm, setSearchTerm] = useState("")
  const [tabValue, setTabValue] = useState(0)

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Box sx={{ maxWidth: '1200px', mx: 'auto', p: 2 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 'bold' }}>
          General Information
        </Typography>
        
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="general information tabs">
          <Tab label="Station Info" />
          <Tab label="Transportation" />
          <Tab label="Local Area" />
          <Tab label="Policies" />
        </Tabs>

        {tabValue === 0 && (
          <Card sx={{ mt: 2 }}>
            <CardHeader
              title="Station Information"
              subheader="Learn about Central Station's history and operations"
            />
            <CardContent>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6">Station History and Facts</Typography>
                <Typography variant="body1">{stationInfo.history}</Typography>
              </Box>
              <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <Clock size={16} />
                <Typography variant="body1" sx={{ ml: 1 }}>{stationInfo.hours}</Typography>
              </Box>
              <Box>
                <Typography variant="h6">Contact Information</Typography>
                <Box sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                  <Phone size={16} />
                  <Typography variant="body1" sx={{ ml: 1 }}>{stationInfo.contact.phone}</Typography>
                </Box>
                <Typography variant="body1" sx={{ mb: 1 }}>{stationInfo.contact.email}</Typography>
                <Typography variant="body1">{stationInfo.contact.address}</Typography>
              </Box>
            </CardContent>
          </Card>
        )}

        {tabValue === 1 && (
          <Card sx={{ mt: 2 }}>
            <CardHeader
              title="Transportation Links"
              subheader="Information about connecting transport services"
            />
            <CardContent>
              {transportLinks.map((link, index) => (
                <Accordion key={index}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {link.type === "Bus Services" && <Bus size={16} />}
                      {link.type === "Taxi Services" && <CarTaxiFront size={16} />}
                      {link.type === "Ride-Sharing Zones" && <Car size={16} />}
                      {link.type === "Parking Facilities" && <Car size={16} />}
                      {link.type === "Bicycle Rentals and Storage" && <Bike size={16} />}
                      <Typography>{link.type}</Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body1">{link.info}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </CardContent>
          </Card>
        )}

        {tabValue === 2 && (
          <Card sx={{ mt: 2 }}>
            <CardHeader
              title="Local Area Information"
              subheader="Discover what's around Central Station"
            />
            <CardContent>
              {localInfo.map((info, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {info.type === "Nearby Hotels" && <Hotel size={16} />}
                    {info.type === "Tourist Attractions" && <Landmark size={16} />}
                    {info.type === "Local Events" && <Calendar size={16} />}
                    {info.type}
                  </Typography>
                  <ul>
                    {info.items.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        <Typography variant="body1">{item}</Typography>
                      </li>
                    ))}
                  </ul>
                </Box>
              ))}
            </CardContent>
          </Card>
        )}

        {tabValue === 3 && (
          <Card sx={{ mt: 2 }}>
            <CardHeader
              title="Policies and Regulations"
              subheader="Important rules and procedures for station use"
            />
            <CardContent>
              {policies.map((policy, index) => (
                <Accordion key={index}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AlertTriangle size={16} />
                      <Typography>{policy.type}</Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body1">{policy.content}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </CardContent>
          </Card>
        )}
      </Box>
    </Box>
  )
}
