import './App.css';
import {SearchBar} from '../SearchBar/SearchBar';
import {SearchResults} from '../SearchResults/SearchResults';
import {PlayList} from "../PlayList/PlayList";
import React from "react";
import Spotify from "../../Util/Spotify";

class App extends  React.Component {

  constructor(props){
    super(props);
    this.state = {
      searchResults: [],
      playListName: "My Playlist",
      playListTracks: [],
      searchField: localStorage.getItem("Search") || ""
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlayListName = this.updatePlayListName.bind(this);
    this.savePlayList = this.savePlayList.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track){
    let inList = this.state.playListTracks.some(ctrack => {
      return ctrack.id === track.id; 
    });
    if(!inList){
      let newPlayList = this.state.playListTracks;
      newPlayList.push(track);
      this.setState({
      playListTracks: newPlayList
      });
    }
  }

  removeTrack(track){
    let newPlayList = this.state.playListTracks.filter(ctrack => {
      return ctrack.id !== track.id; 
    });
    this.setState({
      playListTracks: newPlayList
    });
  }

  updatePlayListName(name){
    this.setState({
      playListName: name
    });
  }

  async savePlayList(){
      let trackURIs = this.state.playListTracks.map(track => {
        return track.uri;
      });
      await Spotify.savePlayList(this.state.playListName, trackURIs);
      this.setState = {
        playListName: "New Playlist",
        playListTracks: []
      }
  }

  async search(term){
    localStorage.setItem("Search", term);
    const newTracks = await Spotify.search(term);
    const ids = [];
    const addTracks = newTracks.filter(track => {
      let inList = ids.indexOf(track.id) >= 0;
      if(!inList){
        ids.push(track.id);
        return true;
      }
      return false; 
    })
    this.setState({
      searchResults: addTracks,
    })
  }

  render(){
  //searchresults and playlist on app playlist
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
        <SearchBar onSearch={this.search} searchField={this.state.searchField}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <PlayList playListName={this.state.playListName} playListTracks={this.state.playListTracks} onRemove={this.removeTrack} onNameChange={this.updatePlayListName} onSave={this.savePlayList}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
