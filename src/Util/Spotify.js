const Spotify = {
    accessToken: "",
    getAccessToken(){
        if(this.accessToken){
            return this.accessToken;
        } else {
            const url = window.location.href;
            const token = url.match(/access_token=([^&])*/);
            const expire = url.match(/expires_in=[^&]*/);
            if(token && expire){
                this.accessToken = token[0].slice(token[0].indexOf("=")+1);
                this.expireTime = expire[0].slice(expire[0].indexOf("=")+1);
                window.setTimeout(() => this.accessToken = "", this.expireTime * 1000);
                window.history.pushState("Access Token", null, "/");
            } else {
                const client_id =  "9dba91f0d9664198bc2c974d43d06221";
                const redirect_URI = 'http:%2F%2Flocalhost:3000';
                let scopes = "user-read-private user-read-email playlist-modify-public playlist-modify-private playlist-read-private playlist-read-collaborative";
                window.location.replace(`https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&redirect_uri=${redirect_URI}&scope=${encodeURIComponent(scopes)}`);
            }
            return this.accessToken;
        }
    },

    async search(term){

        if(!this.accessToken){
            this.getAccessToken();
        }


        let tracks = [];
        try{
            const res = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
                headers: {
                    'Authorization': 'Bearer ' + this.getAccessToken()
                }
            });
            const jsonRes = await res.json();
            const items = jsonRes.tracks.items;
            for(let i = 0; i<items.length; i++){
                let track = items[i];
                let current = {
                    id: track.id,
                    name: track.name,
                    author: track.artists[0].name,
                    album: track.album.name,
                    url: track.preview_url,
                    uri: track.uri
                };
                tracks.push(current);
            }
        } catch(error){
            console.log(error);
        }
        return tracks;
    },

    async savePlayList(name, uris){
        if(name && uris){
            try{
                let accessToken = this.getAccessToken();
                if(!accessToken){
                    accessToken = this.getAccessToken();
                }
                let headers = {
                    'Authorization': 'Bearer ' + this.getAccessToken()
                }
                let user_id = "";
                let user = await fetch(`https://api.spotify.com/v1/me`, {
                    headers: headers
                });
                let userJSON = await user.json();
                user_id = userJSON.id;
                let playList = await fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`, {
                    method: "POST",
                    headers: {
                        'Authorization': 'Bearer ' + this.getAccessToken(),
                        'Content-Type': "application/json"
                    },
                    body: JSON.stringify({name:name})
                });
                let playListJSON = await playList.json();
                let playListId = playListJSON.id;
                await fetch(`https://api.spotify.com/v1/playlists/${playListId}/tracks?uris?${uris}`, {
                    method: "POST",
                    headers: {
                        'Authorization': 'Bearer ' + this.getAccessToken(),
                        'Content-Type': "application/json"
                    },
                    body: JSON.stringify({uris:uris})
                });
            } catch(error){
                console.log(error);
                return;
            }
        } else {
            return;
        }
    }
}

export default Spotify;