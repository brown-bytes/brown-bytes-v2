from mailjet_rest import Client
import os

def sendEmail(free_food, all_events, config):
  num_total = len(all_events)
  message = f'''
    <h3>Brown Bytes Daily Email: I scraped {num_total} events and found {len(free_food)} with free food!</h3>
    <a href="https://brownbytes.org">Brown Bytes</a><br/><br/>
  '''
  for event in free_food:
    message = message + f'''
      <b>{event[0]['summary']}</b><br/>
      Keywords: {', '.join(event[1])}<br/>
      Adding status: {event[2]}<br/>
    '''
  
  message = message + "<br/>END OF TRANSMISSION..."
  
  if(send(message, config)):
    print("Sent mail")

def send(message, config):
  recipient_emails = ['scott@huson.com', 'scott_huson@brown.edu']
  api_key = config['MJ_APIKEY_PUBLIC']
  api_secret = config['MJ_APIKEY_PRIVATE']
  mailjet = Client(auth=(api_key, api_secret), version='v3.1')
  data = {
    'Messages': [
          {
              "From": {
                  "Email": config['SENDER_EMAIL'],
                  "Name": "Brown Bytes Robot"
              },
              "To": [
                  {
                      "Email": 'scott@huson.com',
                      "Name": "Human"
                  }
              ],
              "Subject": "Brown Bytes Robot Scrape",
              "TextPart": "Greetings from Brown Bytes!",
              "HTMLPart": message, #"<h3>Dear passenger 1, welcome to <a href=\"https://www.mailjet.com/\">Mailjet</a>!</h3><br />May the delivery force be with you!"
          }
      ]
  }
  result = mailjet.send.create(data=data)
  print(result.status_code)
  print(result.json())
  return True