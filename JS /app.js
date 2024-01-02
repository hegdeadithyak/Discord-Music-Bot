import {
  searchMusics,
  searchAlbums,
  searchPlaylists,
  getSuggestions,
  listMusicsFromAlbum,
  listMusicsFromPlaylist,
  searchArtists,
  getArtist,
} from 'node-youtube-music';

//https://github.com/baptisteArno/node-youtube-music.git

const musics = await searchMusics('Never gonna give you up');

const albums = await searchAlbums('Human after all');

const playlists = await searchPlaylists('Jazz');

const suggestions = await getSuggestions(musics[0].youtubeId);

const albumSongs = await listMusicsFromAlbum(albums[0].albumId);

const playlistSongs = await listMusicsFromPlaylist(playlists[0].playlistId);

const artists = await searchArtists('Daft Punk');

const artist = await getArtist(artists[0].artistId);


