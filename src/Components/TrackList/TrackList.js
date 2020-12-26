import React from "react";
import "./TrackList.css";
import {Track} from "../Track/Track";

export class TrackList extends React.Component {
    render(){
        const tracks = this.props.tracks.map(track => {
            return <Track key={track.id} track={track} isRemoval={this.props.isRemoval} onAdd={this.props.onAdd} onRemove={this.props.onRemove}/>
        })
        //map method inside tracklist
        return(
            <div className="TrackList">
                {tracks}
            </div>
        );
    }
}