import React from "react";
import "./Track.css";

export class Track extends React.Component{
    constructor(props){
        super(props);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
    }

    addTrack(){
        this.props.onAdd(this.props.track);
    }

    removeTrack(){
        this.props.onRemove(this.props.track);
    }

    render(){
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.author} | {this.props.track.album}</p>
                    <p><a href={this.props.track.url} target="_blank">{this.props.track.url ? "Preview" : ""}</a></p>
                </div>
                <button className="Track-action" onClick={this.props.isRemoval ? this.removeTrack : this.addTrack}>{this.props.isRemoval ? "-" : "+" }</button>
            </div>
        );
    }
}