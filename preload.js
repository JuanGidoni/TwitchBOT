require('dotenv').config();
window.addEventListener('DOMContentLoaded', () => {
  let token = '';
  let img = ''
  let messageBox = document.getElementById('message');

  const tmi = require('tmi.js');
  const client = new tmi.Client({
    options: {
      debug: true,
      messagesLogLevel: "info"
    },
    connection: {
      reconnect: true,
      secure: true
    },
    identity: {
      username: 'StreamingToolsBOT',
      password: 'oauth:c1yn1x3p731n7adye1ie2qmj4agte1'
    },
    channels: ['jukxz']
  });

  const getTwitchCreds = async () => {
    try {
      const res = await fetch(`https://id.twitch.tv/oauth2/token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&grant_type=client_credentials`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      const data = await res.json();
      token = data.access_token;

    } catch (error) {
      console.log(error)
    }
  }

  client.connect(
    getTwitchCreds()
  ).catch(console.error);



  const checkStream = async (username) => {
    try {
      const res = await fetch(`https://api.twitch.tv/helix/users?login=${username}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Client-ID': process.env.CLIENT_ID,
          'Content-Type': 'application/json',
        }
      })
      const data = await res.json();
      return data.data[0]

    } catch (error) {
      return false
    }
  }

  client.on('message', (channel, tags, message, self) => {
    if (self) return;
    checkStream(tags.username).then(data => {
      img = data.profile_image_url;
      console.log(data)
    }).then(() => {
      if (message.toLowerCase()) {
        console.log(tags)
        console.log(message)
        let messageChild = document.createElement('div');
        messageChild.setAttribute('id', `${tags.id}`);
        messageChild.innerHTML = `<div class="alert alert-success alert-white rounded">
              <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
              <div class="icon" style="background-image:url(${img});background-size:cover;background-position:center;"></div>
              <strong>${tags['display-name']}: </strong> ${message}
          </div>`;
        messageBox.appendChild(messageChild);
      }
    })

  });

})