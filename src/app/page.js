'use client'

import { useState } from 'react'
import Link from 'next/link';
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import Slider from '@mui/material/Slider'
import Switch from '@mui/material/Switch'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import { Globe, Type, Contrast, Volume2, Hand, Eye, Train } from 'lucide-react'
import Map from '@/components/Map';

export default function Component() {
  const [language, setLanguage] = useState('english')
  const [textSize, setTextSize] = useState(100)
  const [highContrast, setHighContrast] = useState(false)
  const [voiceAssistance, setVoiceAssistance] = useState(false)
  const [signLanguage, setSignLanguage] = useState(false)
  const [screenReader, setScreenReader] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  const languages = [
    { value: 'english', label: 'English' },
    { value: 'spanish', label: 'Español' },
    { value: 'french', label: 'Français' },
    { value: 'german', label: 'Deutsch' },
    { value: 'chinese', label: '中文' },
  ]

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value)
    console.log(`Language preference set to: ${event.target.value}`)
  }

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
      <Box textAlign="center" mb={6}>
        <Typography variant="h4" component="h1" fontWeight="bold" display="flex" alignItems="center" justifyContent="center" gap={2}>
          <Train width={32} height={32} />
          StationSaathi
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Station Navigation System
        </Typography>
      </Box>
      <Card sx={{ width: 380, maxWidth: '90vw' }}>
        <CardHeader title="Welcome" subheader="Please select your language and accessibility preferences" sx={{ textAlign: 'center' }} />
        <CardContent>
          <Box mb={2}>
            <FormControl fullWidth>
              <InputLabel id="language-label">
                <Box display="flex" alignItems="center" gap={1}>
                  <Globe width={16} height={16} />
                  Language
                </Box>
              </InputLabel>
              <Select
                labelId="language-label"
                value={language}
                onChange={handleLanguageChange}
                label="Language"
              >
                {languages.map((lang) => (
                  <MenuItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box mb={2}>
            <Button variant="outlined" fullWidth onClick={() => setShowSettings(!showSettings)}>
              {showSettings ? 'Hide Settings' : 'Show Settings'}
            </Button>
          </Box>
          {showSettings && (
            <Box p={2} bgcolor="grey.100" borderRadius={2}>
              <Box mb={2}>
                <FormControl fullWidth>
                  <FormLabel>
                    Text Size
                  </FormLabel>
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Typography>{textSize}%</Typography>
                    <Slider
                      value={textSize}
                      min={50}
                      max={200}
                      step={10}
                      onChange={(event, value) => setTextSize(value)}
                    />
                  </Box>
                </FormControl>
              </Box>
              <Box mb={2} display="flex" alignItems="center" justifyContent="space-between">
                <FormLabel>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Contrast width={16} height={16} />
                    High Contrast Mode
                  </Box>
                </FormLabel>
                <Switch
                  checked={highContrast}
                  onChange={(event) => setHighContrast(event.target.checked)}
                />
              </Box>
              <Box mb={2} display="flex" alignItems="center" justifyContent="space-between">
                <FormLabel>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Volume2 width={16} height={16} />
                    Voice Assistance
                  </Box>
                </FormLabel>
                <Switch
                  checked={voiceAssistance}
                  onChange={(event) => setVoiceAssistance(event.target.checked)}
                />
              </Box>
              <Box mb={2} display="flex" alignItems="center" justifyContent="space-between">
                <FormLabel>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Hand width={16} height={16} />
                    Sign Language Support
                  </Box>
                </FormLabel>
                <Switch
                  checked={signLanguage}
                  onChange={(event) => setSignLanguage(event.target.checked)}
                />
              </Box>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <FormLabel>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Eye width={16} height={16} />
                    Screen Reader Settings
                  </Box>
                </FormLabel>
                <Switch
                  checked={screenReader}
                  onChange={(event) => setScreenReader(event.target.checked)}
                />
              </Box>
            </Box>
          )}
        </CardContent>
        <CardActions>
          <Button fullWidth variant="contained" component={Link} href="/main-menu">Continue</Button>
        </CardActions>
      </Card>
    </Box>
    
  )
}
