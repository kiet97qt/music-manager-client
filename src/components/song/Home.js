import { React, useEffect, useState } from 'react';
import ListSong from './ListSong';
import SongForm from './SongForm';
import SongAction from '../../actions/songs';
import axios from "axios";
import FormData from "form-data";
import _ from "lodash";

function Home(){
    const [listSongs, setListSongs] = useState([]);
    const [formStatus, setFormStatus] = useState({
        isFormShown: false,
        isModifying: false,
        songEddited: {
            name: '',
            singer: '',
            genre: '',
            link: ''
        }
    });

    const SERVER_URL = "http://localhost:3000";

    useEffect(() => {
        SongAction.getAllSongs().then( res => {
            if(res?.data) setListSongs(res.data);
        })
    }, []);

    const onShowAddForm = ()=>{
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        setFormStatus({
            ...formStatus,
            isFormShown: true,
            isModifying: false,
            songEddited: {
                id: '',
                name: '',
                singer: '',
                genre: '',
                link: ''
            }
        })
    }

    const onSubmit = async (song) => {
        // const file = song.file;
        // // uploadfile
        // var formData = new FormData();
        // formData.append("mp3", file);
        // axios.post(`${SERVER_URL}/uploads`, formData, {
        //     headers: {
        //       'Content-Type': 'multipart/form-data'
        //     }
        // })
        // send request create Song for server
        let bodyRequest = {
            name: song.name,
            singer: song.singer,
            genre: song.genre,
            link: song.link
        }
        let songCreated = await SongAction.createSong(bodyRequest)
        if(songCreated?.data?.data) {
            listSongs.push(songCreated?.data?.data)
            setListSongs([...listSongs])}
    }

    const onUpdate = async (song) => {
        // const file = song.file;
        // if(file !== '') {
        //     // uploadfile
        //     var formData = new FormData();
        //     formData.append("mp3", file);
        //     axios.post(`${SERVER_URL}/uploads`, formData, {
        //         headers: {
        //         'Content-Type': 'multipart/form-data'
        //         }
        //     })
        // }
        // send request create Song for server
        let bodyRequest = {
            name: song.name,
            singer: song.singer,
            genre: song.genre,
            link: song.link
        }
        let songUpdated = await SongAction.updateSong(song.id,bodyRequest)
        if(songUpdated?.data) {
            listSongs.forEach((song,index) => {
                if(song._id === songUpdated.data._id){
                    listSongs[index] = songUpdated.data;
                }
              })
            setListSongs([...listSongs])}
    }

    const onCloseForm = () => { 
        setFormStatus({
            ...formStatus,
            isFormShown: false,
            isModifying: false,
            songEddited: {
                id: '',
                name: '',
                singer: '',
                genre: '',
                link: ''
            }
        })
    }

    const onClickDelete = async (id) => {
        let songDeleted = await SongAction.deleteSong(id)
        if(songDeleted?.data?.deletedCount === 1) {
            let index = _.findIndex(listSongs, function(o) { return o._id === id; });
            listSongs.splice(index,1)
            setListSongs([...listSongs])
        }
    }

    const onClickModify= async (id) => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        let song= await SongAction.getSong(id)
        if(song?.data) {
            setFormStatus({
                ...formStatus,
                isFormShown: true,
                isModifying: true,
                songEddited: {
                    id: song.data._id,
                    name: song.data.name,
                    singer: song.data.singer,
                    genre: song.data.genre,
                    link: song.data.link
                }
            })
        }
    }

    return(
        <div className="row">
            {formStatus.isFormShown? <SongForm 
                                onSubmit={onSubmit}
                                onUpdate={onUpdate}
                                onCloseForm = {onCloseForm}
                                formStatus = {formStatus}
                        ></SongForm> : <div></div>}
            <div className="col-12 mb-5">
                <button type="button" className="btn btn-primary mt-5 mb-3" onClick = {onShowAddForm}>
                    <span className="fa fa-plus mr-5"></span>Add Song
                </button>
                <ListSong listSongs = {listSongs} 
                        onClickDelete = {onClickDelete} 
                        onClickModify = {onClickModify}
                ></ListSong>
            </div>
        </div>
    )
}

export default Home;