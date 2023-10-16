//  importing usestate useEffect hooks from react
import  { useEffect, useState } from 'react';

// importing styles of albumlist component
import './AlbumList.css';

// importing Album component
import Album from '../Album/Album';

// importing axios
import axios from 'axios';

// creating the album list component
export default function AlbumList() {

  // setting up state to store the fetched albums in an array
  const [AlbumList,setAlbumList]= useState([]);

  // setting state to toggle the add album form
  const [isClicked, setIsClicked] = useState(false);

  // setting state to store the add album form data
  const [title, setTitle] = useState("");

  // setting state to store the album that user want to update
  const [albumToBeUpdated, setAlbumToBeUpdated] = useState(null);

  // function to add albums on provided url using post method
  const addAlbum = async(data)=>{
    await axios.post('https://jsonplaceholder.typicode.com/albums',data);

  }


  // function to handle the submission of add or update album form
  const handleAlbumForm = (e)=>{
    e.preventDefault();
    setTitle(e.target.value);

    // if albumToBeUpdated is not null then we will update the album otherwise create the album
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

  // function to delete album 
  const deleteAlbum = async(album)=>{
    const albums = AlbumList.filter((alb)=>alb!==album);
    setAlbumList(albums);

    // deleting album using delete method
    await axios.delete(`https://jsonplaceholder.typicode.com/albums/${album.id}`);
  }

  // function to update album
  const updateAlbum = async(album)=>{
    const index = AlbumList.indexOf(album);
    album.title = title;
    AlbumList[index] = album;
    setAlbumList(AlbumList);

    // updating  album using put method
    await axios.put(`https://jsonplaceholder.typicode.com/albums/1`);
  }
  

  // function to set the album that user want to update in albumToBeUpdated state and render the form to update
  const setUpdateAlbum = (album)=>{
    setIsClicked(true);
    setAlbumToBeUpdated(album);
    setTitle(album.title);
  }
 
   

  // fetching the albums as component did mount
  useEffect(()=>{
    
    const getAlbums = async()=>{
      const response = await axios.get('https://jsonplaceholder.typicode.com/albums');
      setAlbumList(response.data);
    }
    getAlbums();


  },[])

  // creating the album list
  return (
    <>
    <div className="navbar">
        <h3>Albums</h3>
        {/* conditional rendering of Add Album and Cancel button */}
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
      {/*condtional rendering of add album form  */}
    {isClicked?
      <div className="add-album">
        <span>Add Album</span>
        <form onSubmit={handleAlbumForm}>
          <input type="text" name="title" id="title" placeholder="Title" onChange={(e)=>{setTitle(e.target.value)}} value={title}/>
          <button>{albumToBeUpdated==null?'Add' : 'Update'}</button>
        </form>
      </div>:null}

    <div className="album-list">
      {/* rendering the album list using map */}
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

