import { React, useEffect, useState } from 'react';
import { Button, CardHeader, CardContent} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import FormData from "form-data";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
}));

function SongForm(props){
    let {isModifying, songEddited} = props.formStatus
    const classes = useStyles();
    const SERVER_URL = "http://localhost:3000";

    const [song, setSong] = useState({
        name: "",
        singer: "",
        genre: "",
        link: "",
        file: ""
    });

    useEffect(() => {
        setSong({
            name: songEddited.name ? songEddited.name: "",
            singer: songEddited.singer ? songEddited.singer: "",
            genre: songEddited.genre ? songEddited.genre: "",
            link: songEddited.link ? songEddited.link: "",
            file: ""
        })
    }, [songEddited]);

    const onChangeUpload = (event)=>{

        let {name} = event.target;
        let file = event.target.files[0];
        
        if(file !== '') {
            // uploadfile
            var formData = new FormData();
            formData.append("mp3", file);
            axios.post(`${SERVER_URL}/uploads`, formData, {
                headers: {
                'Content-Type': 'multipart/form-data'
                }
            })
        }

        if(file?.name){
            setSong((prevState) => ({
                ...prevState,
                [name]: `${SERVER_URL}/musicFile/${file.name}`,
                file: file
            }))
        }
    }
    const onSubmit = (event) => {
        event.preventDefault();
        if(isModifying) {
            song["id"] = songEddited.id
            props.onUpdate(song);
        } else {
            props.onSubmit(song);
        }
    }
    const onChange = (event) => {
        let {name,value} = event.target;
        setSong((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const onClickCancel = () => {
        setSong({
            name: "",
            singer: "",
            genre: "",
            link: "",
            file: ""
        })
        props.onCloseForm();
    }

    return(
        <div className='col-12'>
            <Card className='card-header'>
                <CardHeader title= {isModifying? "Modify Song" : "Add Song"} className='text-center'></CardHeader>
                <CardContent>
                    <form onSubmit = {onSubmit}>
                        <div className="row">
                            <TextField 
                                className="form-group col me-4 mb-2" 
                                required 
                                variant="filled"
                                name="name"
                                value = {song.name}
                                onChange={onChange}
                                label="Name" />
                            <br/>
                            <TextField 
                                className="form-group col ms-4 mb-2" 
                                required 
                                variant="filled"
                                name="singer"
                                value = {song.singer}
                                onChange={onChange}
                                label="Singer" />                                  
                        </div>
                        <div className="row">
                            <TextField 
                                className="form-group col me-4 mt-2" 
                                required 
                                variant="filled"
                                name="genre"
                                value = {song.genre}
                                onChange={onChange}
                                label="Genre" />
                            <div  className="form-group col ms-4 mt-2">
                                <TextField 
                                    className="form-group col-8" 
                                    required 
                                    disabled
                                    value = {song.link}
                                    variant="filled"
                                    label="Link" />
                                <input
                                    accept="mp3/*"
                                    className={classes.input} 
                                    id="contained-button-file"
                                    multiple
                                    type="file"
                                    onChange={onChangeUpload} 
                                    name="link"

                                />
                                <label htmlFor="contained-button-file" className="ms-5 mt-2">
                                    <Button variant="contained" color="primary" component="span">
                                    Upload
                                    </Button>
                                </label>  
                            </div>
                        </div>
                        <div className="text-center mt-5">
                            <Button type="submit" className="me-4" variant="contained" color="primary" >
                                {isModifying? "Modify" : "Add"}
                            </Button>
                            <Button type="button" className="ms-4" variant="contained" color="secondary" onClick = {onClickCancel}>
                                Cancel
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default SongForm;