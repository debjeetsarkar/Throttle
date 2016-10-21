var notificationObject = {
  "id": "/notificationObject",
  "type": "object",
  "properties": {
    "regId": {
      "type": "string"
    },
    "payload": {
    "type": ["string","object"]
    }
  },
  required:["regId", "payload"]
}

module.exports = notificationObject