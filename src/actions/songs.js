import SongService from "../services/SongService";
async function createSong (song) {
    try {
        const res = await SongService.create(song);
        
        return res;
    }
    catch (err) {
        return err;
    }
}
async function getAllSongs () {
    try {
        const res = await SongService.getAll();
        
        return res.data;
    } 
    catch (err) {
        return err;
    }
}
async function getSong (id) {
    try {
        const res = await SongService.get(id);

        return res.data;
    } 
    catch (err) {
        return err;
    }
};

async function updateSong (id, data) {
    try {
        const res = await SongService.update(id, data);

        return res.data;
    } 
    catch (err) {
        return err;
    }
};

async function deleteSong (id) {
    try {
        const res = await SongService.remove(id);

        return res.data;
    } 
    catch (err) {
        return err;
    }
};

const SongActions = {
	createSong,
	getAllSongs,
    getSong,
    updateSong,
    deleteSong
};

export default SongActions;