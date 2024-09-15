'use client'

import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StarIcon from '@mui/icons-material/Star';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import HelpIcon from '@mui/icons-material/Help';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

const faqData = [
  {
    category: "General Queries",
    items: [
      { question: "What are the station's operating hours?", answer: "The station is open from 4:30 AM to 1:30 AM daily." },
      { question: "Is there Wi-Fi available?", answer: "Yes, free Wi-Fi is available throughout the station." },
    ]
  },
  {
    category: "Navigation Help",
    items: [
      { question: "How do I find my platform?", answer: "Use the 'Navigate to Destination' feature on the main menu, or check the large display boards in the main concourse." },
      { question: "Where are the ticket machines located?", answer: "Ticket machines are available near all main entrances and in the central ticket hall." },
    ]
  },
  {
    category: "Service Information",
    items: [
      { question: "How often do trains run?", answer: "Train frequency varies by line and time of day. Check the 'Train Schedules' page for specific timings." },
      { question: "What do I do if I've lost an item on a train?", answer: "Report lost items at the information desk or use the 'Report an Incident' feature in the Emergency Services section." },
    ]
  }
];

export default function FeedbackAndSupport() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [issue, setIssue] = useState('');

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    console.log("Feedback submitted:", { rating, comment, issue });
    alert("Thank you for your feedback!");
    setRating(0);
    setComment('');
    setIssue('');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f4f4f4' }}>
      <main style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto' }}>
        <Typography variant="h4" component="h1" gutterBottom>Feedback and Support</Typography>

        <Tabs value={selectedTab} onChange={handleTabChange} aria-label="Feedback and Support Tabs">
          <Tab label="Submit Feedback" />
          <Tab label="FAQ" />
          <Tab label="Contact Support" />
        </Tabs>

        {selectedTab === 0 && (
          <Card style={{ marginTop: '24px' }}>
            <CardHeader title="Submit Feedback" subheader="We value your opinion. Please share your thoughts with us." />
            <CardContent>
              <form onSubmit={handleSubmitFeedback} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <Typography variant="subtitle1">Rate Your Experience</Typography>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Button
                        key={star}
                        variant={rating >= star ? "contained" : "outlined"}
                        color="secondary"
                        onClick={() => setRating(star)}
                        size="small"
                      >
                        <StarIcon style={{ color: rating >= star ? '#FFD700' : '#000' }} />
                      </Button>
                    ))}
                  </div>
                </div>
                <TextField
                  label="Comments and Suggestions"
                  multiline
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  variant="outlined"
                />
                <TextField
                  label="Report Issues with Kiosk/Application"
                  multiline
                  rows={4}
                  value={issue}
                  onChange={(e) => setIssue(e.target.value)}
                  variant="outlined"
                />
                <Button type="submit" variant="contained" color="primary">Submit Feedback</Button>
              </form>
            </CardContent>
          </Card>
        )}

        {selectedTab === 1 && (
          <Card style={{ marginTop: '24px' }}>
            <CardHeader title="Frequently Asked Questions" subheader="Find quick answers to common queries" />
            <CardContent>
              {faqData.map((category, categoryIndex) => (
                <Accordion key={categoryIndex}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>{category.category}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {category.items.map((item, itemIndex) => (
                      <Accordion key={itemIndex}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <Typography>{item.question}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>{item.answer}</Typography>
                        </AccordionDetails>
                      </Accordion>
                    ))}
                  </AccordionDetails>
                </Accordion>
              ))}
            </CardContent>
          </Card>
        )}

        {selectedTab === 2 && (
          <Card style={{ marginTop: '24px' }}>
            <CardHeader title="Contact Support" subheader="Get in touch with our support team" />
            <CardContent>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <Typography variant="h6" component="div" gutterBottom>
                    <ChatBubbleIcon style={{ marginRight: '8px' }} />
                    Live Chat with Support Staff
                  </Typography>
                  <Typography>Our support team is available for live chat during station operating hours.</Typography>
                  <Button variant="contained" style={{ marginTop: '8px' }}>Start Live Chat</Button>
                </div>
                <div>
                  <Typography variant="h6" component="div" gutterBottom>
                    <PhoneIcon style={{ marginRight: '8px' }} />
                    Support Hotline Numbers
                  </Typography>
                  <Typography>General Inquiries: +44 20 1234 5678</Typography>
                  <Typography>Technical Support: +44 20 2345 6789</Typography>
                </div>
                <div>
                  <Typography variant="h6" component="div" gutterBottom>
                    <EmailIcon style={{ marginRight: '8px' }} />
                    Email Support
                  </Typography>
                  <Typography>For non-urgent inquiries, email us at:</Typography>
                  <Typography variant="body1" style={{ fontWeight: 'bold' }}>support@railnav.com</Typography>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
