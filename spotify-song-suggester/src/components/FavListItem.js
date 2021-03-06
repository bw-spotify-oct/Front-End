import React, { useState } from 'react'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import styled from "styled-components";
import axios from 'axios';
import axiosWithAuth from "../utils/axiosWithAuth";


const GraphDiv = styled.div`
    margin-left:240px;
    min-height: 120px;
    `;
const MinorDiv = styled.div`
    margin-left:240px;
    `;
const FavListItemDiv = styled.div`
    margin-top:5px;
    margin-bottom:5px;
    margin-left: 240px;
    width:100%
    height:40px;
    display:flex;
    border-bottom: solid 1px black;
    justify-content: flex-start;
    div{
    height:40px;
    width:40px;
    margin-left:20px;
    .svg{
        height:100%;
        width:100%;
    }
    img{
        height:100%;
        width:100%;
    }
    }
    .slot1{
    width:27%;
    text-align:left;
    }
    .slot2{
    margin-left:10px;

    width:12%;
    text-align:left;
    }
    .slot3{
    margin-left:10px;
    width:10%;
    text-align:left;
    }
    .slot4{
    margin-left:10px;
    width:10%;
    text-align:left;
    }
    `;

const StyledButton = styled.button`
    color: white;
    border-radius: 45px;
    margin-bottom:5px;
    height: 33px;
    width: 100px;
    margin: 5px 10px;
    font-size: 0.8rem;
    font-weight: 900;
    background: linear-gradient(#eae4e4, #040434);
    box-shadow: inset -1px -1px 20px 2px black;
`;
function Button(props) {
    return (
        <StyledButton>{props.name}</StyledButton>
    )
}

export default function FavListItem(props) {
    let { setUpdatedFavorites, updatedFavorites, setMainGraphUrl, setRecs } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [hover, setHover] = useState(false);
    const [buttonOpen, setButtonOpen] = useState(false);
    const [graphID, setGraphID] = useState("")

    const onHover = (event) => {
        event.preventDefault();
        setHover(!hover);
    }
    const changeIsOpen = (event) => {
        event.preventDefault();
        setIsOpen(!isOpen);
    }
    const showSimilarSongs = (event) => {
        props.setRecommendedIsChecked(true);
        let eventData2 = event.currentTarget;
        setButtonOpen(!buttonOpen)
        // #DS Links
        axios
            .get(`https://spotify-api-helper.herokuapp.com/graph_data/DReaI4d55IIaiD6P9/${eventData2.id}`)
            .then(res => {
                console.log(res, "axios resoponse for setting 5-way graph ")
                console.log(props, "props in question: HISTORY")
                setMainGraphUrl(res.data[0].graph_uri)
                setRecs(res.data[1])
                props.history.push("/search")
            })
            .catch(err => {
                console.log(err, "axios ERROR for setting 5-way graph  ")
            })
    }

    const showDetails = (event) => {
        event.preventDefault();
        let eventData = event.currentTarget;
        console.dir(eventData, " !@#!@#!@#!#@")
        if (!buttonOpen) {
            setButtonOpen(!buttonOpen);
            // #DS Link
            axios
                .get(`https://spotify-api-helper.herokuapp.com/single_song_graph/DReaI4d55IIaiD6P9/${eventData.id}`)
                .then(res => {
                    console.log(res, "axios resoponse for Show Details button ")
                    setGraphID(res.data.graph_uri)
                })
                .catch(err => {
                    console.log(err, "axios err for Show Details button ")
                })
        } else if (buttonOpen) {
            setButtonOpen(!buttonOpen)
        }
    }

    const deleteHandler = (event) => {
        event.preventDefault();
        axiosWithAuth().delete(`https://spotify-song-suggester-app.herokuapp.com/users/user/song/images/${props.fav.trackid}`)
            .then(res => {
                console.log(res, "response from deleting a song")
                setUpdatedFavorites = (!updatedFavorites)
            })
            .catch(err => {
                console.log(err, "error from deleting a song")
            })
    }


    return (
        <>
            <FavListItemDiv onMouseEnter={onHover} onMouseLeave={onHover}>

                <div onClick={changeIsOpen}>
                    <PlayCircleOutlineIcon className={(hover) ? "svg dodisplay" : "svg dontdisplay"} />
                    <img src={props.fav.small_image} alt={`album cover of ${props.fav.artist}`} className={(!hover) ? "dodisplay" : "dontdisplay"} />
                </div>
                <span className="slot1">{props.fav.song_name}</span>
                <span className="slot2">{props.fav.artist}</span>
                <span className="slot3" id={props.fav.trackid} onClick={showSimilarSongs}><Button name={"Similar Songs"} /></span>
                <span className="slot4" id={props.fav.trackid} onClick={showDetails}><Button name={"Track Details"} /></span>
                <span className="slot4" id={props.fav.trackid} onClick={showDetails} onClick={deleteHandler}><Button name={"Delete"} /></span>


            </FavListItemDiv>
            <MinorDiv>
                <iframe id={props.trackid} title={props.trackid} className={(isOpen) ? "dodisplay" : "dontdisplay"} src={`https://embed.spotify.com/?uri=${props.fav.uri}`} width="400px" height="100px" />
            </MinorDiv>
            <GraphDiv className={(buttonOpen && graphID) ? "dodisplay" : "dontdisplay"}>
                <embed type="image/svg+xml" src={graphID} width="600" height="600" />
            </GraphDiv>
        </>
    )
}

