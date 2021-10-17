import os
import time
import math
import imaplib
import email
from bs4 import BeautifulSoup
import urllib
from urllib.request import urlopen
import re
import parser
import json
from datetime import datetime
import os
import requests
from dotenv import dotenv_values
from mailer import sendEmail

config = {
    **dotenv_values("../server/.env"),  # load shared development variables
}

# from dotenv import load_dotenv

# # Open .env file
# load_dotenv()

# Email creds
email_addr = 'jebc3s9fflbhhkez@gmail.com'
email_pass = 'O2je!iEf9q2pK&'
# Create event link list
event_link_list = []
free_event_list = []
keywords = [
  'reception',
  'refreshments',
  'pizza',
  'snacks',
  'lunch',
  'dinner', 
  'flatbread',
  'banquet',
  'breakfast',
  'bajas',
  'jabob',
  'curry',
  'coffee',
  'evening',
  'dessert',
]

# Logs into the imap server
def login(imap, email_addr, email_pass): 
  print("Logging into mailbox...")
  try:
    resp_code, response = imap.login(email_addr, email_pass)
  except Exception as e:
    print("ErrorType : {}, Error : {}".format(type(e).__name__, e))
    resp_code, response = None, None

  print("Response Code : {}".format(resp_code))
  print("Response      : {}\n".format(response))

# Logs out of the imap server
def logout(imap):
  print("\nLogging Out....")
  try:
      resp_code, response = imap.logout()
  except Exception as e:
      print("ErrorType : {}, Error : {}".format(type(e).__name__, e))
      resp_code, response = None, None

  print("Response Code : {}".format(resp_code))
  print("Response      : {}".format(response[0].decode()))

def intersection(lst1, lst2):
  #lst = [value for value in lst1 if value in lst2]
  return list(set(lst1) & set (lst2))

# Classifies text as having free food or not, finds the intersection between 
def classify(text):
  return intersection(text.split(), keywords)

# Detects whether an event description has free food text in it
# Returns a string of comma seperated terms
def freeFood(text):
  cleaned = re.sub('[\W_]+', ' ', text).lower()
  return classify(cleaned) # change the classification script here
  
def addEvent(event, keywords): 
  
  title = event['summary']
  location = event['location']
  datevar = datetime.strptime(event['start'], '%Y%m%dT%H%M%SZ').strftime('%Y-%m-%d')
  startTime = datetime.strptime(event['start'], '%Y%m%dT%H%M%SZ').strftime('%Y-%m-%d %H:%M')
  endTime = datetime.strptime(event['end'], '%Y%m%dT%H%M%SZ').strftime('%Y-%m-%d %H:%M')
  hostGroup = None
  eventType = 'Today@Brown'
  whoCanCome = ','.join(event['audience'])
  foodType = None
  foodAmount = None
  otherInfo = "This event was added by Brown Bytes"
  eventTags = ','.join(event['categoryTags'])
  visible = False
  scraped = True
  keywords = ','.join(list(keywords))
  link = event['link']

  body = json.dumps({
    'title': title,
    'location': location,
    'date': datevar,
    'startTime': startTime,
    'endTime': endTime,
    'hostGroup': hostGroup,
    'eventType': eventType,
    'whoCanCome': whoCanCome,
    'foodType': foodType,
    'foodType': foodAmount,
    'otherInfo': otherInfo,
    'eventTags': eventTags,
    'visible': visible,
    'scraped': scraped,
    'keywords': keywords,
    'link': link,
  })

  headers = {
  	"Content-Type": "application/json",
    "bd": config['SCRAPER']
  }
  try:
    req = requests.post("https://127.0.0.1:3000/events", data=body, headers=headers)
    print(req.text)
    return True
  except Exception as e:
    print("Could not make request: ", e)
    return False


  
# Beginning of scripting part of script


# get access to email from .env file
start = time.time()
try:
    imap = imaplib.IMAP4_SSL(host="imap.gmail.com", port=imaplib.IMAP4_SSL_PORT)
except Exception as e:
    print("ErrorType : {}, Error : {}".format(type(e).__name__, e))
    imap = None

print("Connection Object : {}".format(imap))
print("Total Time Taken  : {:,.2f} Seconds\n".format(time.time() - start))

# Log into email
login(imap, email_addr, email_pass)

# Search the email for Today@brown
imap.select()
# typ, message_numbers = imap.search('utf-8', '(FROM "Today@brown.edu") '.encode("utf-8"))
typ, message_numbers = imap.search(None, "FROM", "Today@brown.edu")
message_list = message_numbers[0].split()

# Look through the results and get the event links
if(message_list):
  message_list.sort(reverse=True)
  for number in message_list:
    typ, data = imap.fetch(number,'(RFC822)')

    for response_part in data:
      if isinstance(response_part, tuple):
        msg = email.message_from_bytes(response_part[1])
        varSubject, encoding = email.header.decode_header(msg['subject'])[0]
        # Make sure that it is Today@Brown
        if (varSubject[0:11] == b'Today@Brown' or varSubject[0:16] == b'\xf0\x9f\x94\xb6 Today@Brown'):
          print("Parsing Today@Brown email: ", varSubject)
          # Get the html from the body
          if msg.is_multipart():
            for part in msg.walk():       
              if part.get_content_type() == "text/html":
                body = part.get_payload(decode=True) #to control automatic email-style MIME decoding (e.g., Base64, uuencode, quoted-printable)
                body = body.decode()
                soup = BeautifulSoup(body, 'html.parser')
                for link in soup.findAll('a'):
                  if (link.get('href')[0:31] == 'https://today.brown.edu/events/'):
                    event_id = link.get('href')[31:37]
                    event_link_list.append('https://today.brown.edu/api/v1/events/'+event_id)
              elif part.get_content_type() == "text/plain":
                continue
    break   
    

print("Checking", len(event_link_list), "events")
# Go through the event links and get the information
if(event_link_list):
  for link in event_link_list:
    response = urlopen(link)
    data = json.loads(response.read())
    event_text = data['description']
    
    # Detect keywords in the description
    event_keywords = freeFood(event_text) # outputs string of keywords
    
    if(event_keywords):
      print("DETECTED FREE FOOD:", event_keywords)
      if not addEvent(data, event_keywords): # returns boolean
        print("Adding event error occurred")
        free_event_list.append((data, event_keywords, "Failure"))
      else:
        free_event_list.append((data, event_keywords, "Success"))
      
  sendEmail(free_event_list, event_link_list, config)   

      
      

# Get JWT token

# Search inbox for TODAY at brown name
#Go through emails

# Log out of email 
logout(imap)
