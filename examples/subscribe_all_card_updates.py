import websocket
import json
import time

w_socket = 'wss://ws.sorare.com/cable'
identifier = json.dumps({"channel": "GraphqlChannel"})

subscription_query = {
  "query": "subscription { aCardWasUpdated { slug } }",
  "variables": {},
  "action": "execute"
}

def on_open(ws):
  subscribe_command = {"command": "subscribe", "identifier": identifier}
  ws.send(json.dumps(subscribe_command).encode())

  time.sleep(1)

  message_command = {
    "command": "message",
    "identifier": identifier,
    "data": json.dumps(subscription_query)
  }
  ws.send(json.dumps(message_command).encode())

def on_message(ws, data):
  message = json.loads(data)
  type = message.get('type')
  if type == 'welcome':
    pass
  elif type == 'ping':
    pass
  elif message.get('message') is not None:
    print(message['message'])

def on_error(ws, error):
  print('Error:', error)

def on_close(ws, close_status_code, close_message):
  print('WebSocket Closed:', close_message, close_status_code)

def long_connection():
  ws = websocket.WebSocketApp(
    w_socket,
    on_message=on_message,
    on_close=on_close,
    on_error=on_error,
    on_open=on_open
  )
  ws.run_forever()

if __name__ == '__main__':
  long_connection()
