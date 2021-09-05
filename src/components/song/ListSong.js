import { React} from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@material-ui/core';

function ListSong(props){
    let {listSongs} = props

    let tableSongs = listSongs.map((song,index) => (
        <TableRow key={index}>
            <TableCell className='text-center'>{index+1}</TableCell>
            <TableCell className='text-center'>{song.name}</TableCell>
            <TableCell className='text-center'>{song.genre}</TableCell>
            <TableCell className='text-center'>{song.singer}</TableCell>
            <TableCell className='text-center'>
                <audio src={song.link} controls />
            </TableCell>
            <TableCell className='text-center'>
                <div className="row">
                    <div className="col">
                        <button className="btn btn-warning" onClick = {() => props.onClickModify(song._id)}>Modify
                        </button>
                    </div>
                    <div className="col">
                        <button className="btn btn-danger" onClick = {() => props.onClickDelete(song._id)}>
                            Delete
                        </button>
                    </div>
                </div>
            </TableCell>
        </TableRow>  
    ))
    return(
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className='text-center'>#</TableCell>
                        <TableCell className='text-center'>Name</TableCell>
                        <TableCell className='text-center'>Genre</TableCell>
                        <TableCell className='text-center'>Singer</TableCell>
                        <TableCell className='text-center'>Play</TableCell>
                        <TableCell className='text-center'>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(!listSongs && listSongs.length === 0 )? <TableRow><TableCell colSpan="6">No data</TableCell></TableRow>: tableSongs}
                </TableBody>
            </Table>
    </TableContainer>
    )
}

export default ListSong;