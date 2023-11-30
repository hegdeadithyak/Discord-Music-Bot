import os
import discord
from discord.ext import commands
import youtube_dl

intents = discord.Intents.all()
bot = commands.Bot(command_prefix='!', intents=intents)

@bot.event
async def on_ready():
    print(f'We have logged in as {bot.user}')

@bot.command()
async def play(ctx, url):
    channel = ctx.author.voice.channel
    voice_channel = await channel.connect()

    ydl_opts = {
        'format': 'bestaudio/best',
        'postprocessors': [{
            'key': 'FFmpegVideo',
            'preferredcodec': 'mp3',
            'preferredquality': '192',
        }],
    }

    with youtube_dl.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(url, download=False)
        url2 = info['formats'][0]['url']
        voice_channel.play(discord.FFmpegPCMAudio(url2), after=lambda e: print(f'Finished playing: {e}'))

@bot.command()
async def leave(ctx):
    await ctx.voice_client.disconnect()



bot.run('MTE3OTg0ODk2MDMyNDY4NTg3NA.GP89-2.qnt65yDFB3JgVn3Xuk2u7uN15kP83Jd7xiQKVY')
