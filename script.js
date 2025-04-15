const clientId = '2589e03cce51453b9dcb56e7e8f5ef5e';
const redirectUri = 'https://def4ult0.github.io/spotify-stats
';
const scopes = 'user-top-read';

document.getElementById('login').onclick = () => {
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scopes}`;
  window.location.href = authUrl;
};

window.onload = () => {
  const hash = window.location.hash;
  if (hash) {
    const token = new URLSearchParams(hash.substring(1)).get('access_token');
    if (token) {
      fetch('https://api.spotify.com/v1/me/top/tracks?limit=10', {
        headers: { Authorization: 'Bearer ' + token }
      })
      .then(res => res.json())
      .then(data => {
        const results = document.getElementById('results');
        results.innerHTML = data.items.map(track => `
          <div>
            <img src="${track.album.images[0].url}" width="100"><br>
            <strong>${track.name}</strong> by ${track.artists.map(artist => artist.name).join(', ')}
          </div>
        `).join('');
      });
    }
  }
};
