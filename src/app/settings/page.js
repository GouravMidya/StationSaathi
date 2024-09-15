'use client'

import { useState } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import CardTitle from '@mui/material/Typography'
import Button from '@mui/material/Button'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Switch from '@mui/material/Switch'
import Slider from '@mui/material/Slider'
import Typography from '@mui/material/Typography'
import { Globe, Accessibility, Eye, VolumeUp, Lock, Refresh , Info } from '@mui/icons-material'
import StorageIcon from '@mui/icons-material/Storage';

export default function Settings() {
  const [language, setLanguage] = useState('english')
  const [textSize, setTextSize] = useState(100)
  const [highContrast, setHighContrast] = useState(false)
  const [voiceAssistance, setVoiceAssistance] = useState(false)
  const [dataConsent, setDataConsent] = useState(false)
  const [cookiesConsent, setCookiesConsent] = useState(false)
  const [tabValue, setTabValue] = useState(0)

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value)
    console.log(`Language changed to: ${event.target.value}`)
  }

  const handleRefreshData = () => {
    console.log("Refreshing data...")
  }

  const handleSyncServer = () => {
    console.log("Syncing with central server...")
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  return (
    <Box className="min-h-screen bg-background" sx={{ maxWidth: '1200px', mx: 'auto', p: 2 }}>

      <Box className="container mx-auto p-4">
        <Typography variant="h4" fontWeight="bold" gutterBottom>Settings</Typography>

        <Tabs value={tabValue} onChange={handleTabChange} className="space-y-4">
          <Tab label="Language" />
          <Tab label="Accessibility" />
          <Tab label="Privacy" />
          <Tab label="Update Content" />
          <Tab label="System Info" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <Card>
            <CardHeader title="Language Preferences" subheader="Change the language settings at any time" />
            <CardContent>
              <FormControl fullWidth>
                <InputLabel id="language-label">Select Language</InputLabel>
                <Select
                  labelId="language-label"
                  id="language"
                  value={language}
                  onChange={handleLanguageChange}
                >
                  <MenuItem value="english">English</MenuItem>
                  <MenuItem value="spanish">Español</MenuItem>
                  <MenuItem value="french">Français</MenuItem>
                  <MenuItem value="german">Deutsch</MenuItem>
                  <MenuItem value="chinese">中文</MenuItem>
                </Select>
              </FormControl>
            </CardContent>
          </Card>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Card>
            <CardHeader title="Accessibility Settings" subheader="Adjust settings to improve your experience" />
            <CardContent className="space-y-4">
              <Typography gutterBottom>Text Size</Typography>
              <Box className="flex items-center space-x-2">
                <Slider
                  value={textSize}
                  min={50}
                  max={200}
                  step={10}
                  onChange={(e, newValue) => setTextSize(newValue)}
                  aria-labelledby="text-size-slider"
                />
                <Typography>{textSize}%</Typography>
              </Box>
              <Box className="flex items-center justify-between">
                <Typography>High Contrast Mode</Typography>
                <Switch checked={highContrast} onChange={() => setHighContrast(!highContrast)} />
              </Box>
              <Box className="flex items-center justify-between">
                <Typography>Voice Assistance</Typography>
                <Switch checked={voiceAssistance} onChange={() => setVoiceAssistance(!voiceAssistance)} />
              </Box>
            </CardContent>
          </Card>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Card>
            <CardHeader title="Privacy Settings" subheader="Manage your data and privacy preferences" />
            <CardContent className="space-y-4">
              <Box className="flex items-center justify-between">
                <Typography>Data Collection Consent</Typography>
                <Switch checked={dataConsent} onChange={() => setDataConsent(!dataConsent)} />
              </Box>
              <Box className="flex items-center justify-between">
                <Typography>Cookies and Tracking</Typography>
                <Switch checked={cookiesConsent} onChange={() => setCookiesConsent(!cookiesConsent)} />
              </Box>
            </CardContent>
          </Card>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <Card>
            <CardHeader title="Update Content" subheader="For administrative use only" />
            <CardContent className="space-y-4">
              <Button onClick={handleRefreshData} fullWidth startIcon={<Refresh />}>
                Refresh Data
              </Button>
              <Button onClick={handleSyncServer} fullWidth startIcon={<StorageIcon  />}>
                Sync with Central Server
              </Button>
            </CardContent>
          </Card>
        </TabPanel>

        <TabPanel value={tabValue} index={4}>
          <Card>
            <CardHeader title="System Information" subheader="Details about the application and legal information" />
            <CardContent className="space-y-4">
              <Typography>App Version: StationSaathi v1.0.0</Typography>
              <Typography>License Information: Licensed to StationSaathi Corporation</Typography>
              <Button variant="text">View Terms and Conditions</Button>
              <Button variant="text">View Privacy Policy</Button>
            </CardContent>
          </Card>
        </TabPanel>
      </Box>
    </Box>
  )
}

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}
