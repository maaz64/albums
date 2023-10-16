import React, { useEffect, useState } from 'react';
import './AlbumList.css';
import Album from '../Album/Album';
import axios from 'axios';

export default function AlbumList() {

  const [AlbumList,setAlbumList]= useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [title, setTitle] = useState("");
  const [albumToBeUpdated, setAlbumToBeUpdated] = useState(null);

  const addAlbum = async(data)=>{
    const response = await axios.post('https://jsonplaceholder.typicode.com/albums',data);
    console.log("add response",response);

  }


  const handleAlbumForm = (e)=>{
    e.preventDefault();
    setTitle(e.target.value);
    if(albumToBeUpdated !==null){
      updateAlbum(albumToBeUpdated);
      setTitle("");
      return;
    }
    const postData = {
      title,
      userId:Math.floor((Math.random() * 100) + 1)
    } 

    addAlbum(postData);
    setAlbumList([postData,...AlbumList])
    setTitle("");

  }

  const deleteAlbum = async(album)=>{
    const albums = AlbumList.filter((alb)=>alb!==album);
    setAlbumList(albums);
    const response = await axios.delete(`https://jsonplaceholder.typicode.com/albums/${album.id}`);
    console.log("delete response",response);
  }

  
  const updateAlbum = async(album)=>{
    const index = AlbumList.indexOf(album);
    album.title = title;
    AlbumList[index] = album;
    setAlbumList(AlbumList);

    const response = await axios.put(`https://jsonplaceholder.typicode.com/albums/1`);
    console.log("update response",response);
  }
  
  const setUpdateAlbum = (album)=>{
    setIsClicked(true);
    setAlbumToBeUpdated(album);
    setTitle(album.title);
  }
 
   

  useEffect(()=>{
    
    const getAlbums = async()=>{
      const response = await axios.get('https://jsonplaceholder.typicode.com/albums');
      setAlbumList(response.data);
    }
    getAlbums();


  },[])

  return (
    <>
    <div className="navbar">
        <h3>Albums</h3>
        {isClicked ? (<button className='cancel-btn'
            onClick={() => {
              setIsClicked(false);
            }}
          >
            Cancel
          </button>) : (
          <button className='add-btn'
            onClick={() => {
              setIsClicked(true);
            }}
          >
            Add Album
          </button>
        )}
      </div>
    {isClicked?
      <div className="add-album">
        <span>Add Album</span>
        <form onSubmit={handleAlbumForm}>
          <input type="text" name="title" id="title" placeholder="Title" onChange={(e)=>{setTitle(e.target.value)}} value={title}/>
          <button>{albumToBeUpdated==null?'Add' : 'Update'}</button>
        </form>
      </div>:null}
    <div className="album-list">
      <div className="album-list-container">
      {AlbumList.map((album,index)=>
      <div className='album-list-item' key={index}>
        <Album album={album} deleteAlbum={deleteAlbum}  setUpdateAlbum={setUpdateAlbum}/>
      </div>
      )}
      </div>
    </div>
    </>
  )
}

