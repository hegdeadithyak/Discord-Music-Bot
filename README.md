# Discord-Music-Bot
Playing music according to your mood in Discord

This Discord bot is a simple example designed for playing music in voice channels using the `discord.py` library and integrating with `youtube_dl` for handling YouTube video URLs.

## Prerequisites

- Python 3.6 or later
- FFmpeg (download from [https://ffmpeg.org/download.html](https://ffmpeg.org/download.html))
- Discord bot token (create a new bot on the [Discord Developer Portal](https://discord.com/developers/applications))

## Installation

1. Install the required Python libraries:

   ```bash
   pip install discord.py youtube_dl

   ```
Download and install FFmpeg if not already installed: https://ffmpeg.org/download.html
<br>
Clone the repository or download the script.
<br>
Replace the placeholder token in the await bot.start() call in the script (bot.py) with your own Discord bot token.

Usage
Run the script:

```bash
python bot.py
```

Invite the bot to your Discord server.
<br>
<p>
The bot has the following commands:

!join <channel>: Joins a voice channel.
!play <query>: Plays a file from the local filesystem.
!yt <url>: Plays audio from a YouTube URL.
!stream <url>: Streams audio from a URL without pre-downloading.
!volume <volume>: Changes the player's volume (0-100%).
!stop: Stops and disconnects the bot from voice.
Execute commands in a text channel where you want the bot to operate.
</p>
<br>
Important Note
This example uses the message_content privileged intent. Ensure that your bot has this intent enabled in the Discord Developer Portal under the "Bot" section.


To-do:
- [ ] Adding Chat GPT API for selecting songs
- [ ] Issue to be solved in the last part
- [ ] Deploy using Cloud Fare
      
