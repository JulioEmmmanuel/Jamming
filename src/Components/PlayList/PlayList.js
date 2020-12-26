import React from "react";
import "./PlayList.css";
import {TrackList} from "../TrackList/TrackList";

export class PlayList extends React.Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        this.props.onNameChange(e.target.value);
    }

    render(){
        return (
        <div className="Playlist">
        <input defaultValue="My Playlist" onChange={this.handleChange}/>
        <TrackList tracks={this.props.playListTracks} onRemove={this.props.onRemove} isRemoval={true}/>
        <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
        </div>)
    }
}