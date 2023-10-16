// importing albu, styles
import './Album.css'

// creating the album component
export default function Album({ album, index, deleteAlbum, setUpdateAlbum  }) {
    return (
        <>
            <div key={index} className="album">
                <div className="albumImg">
                    <img src="https://cdn-icons-png.flaticon.com/128/3342/3342137.png" alt="album_img" />
                </div>
                <span>{album.title}</span>
                <div className='updateImg' onClick={() =>setUpdateAlbum(album)}>
                    <img src="https://cdn-icons-png.flaticon.com/128/10336/10336582.png" alt="update" />
                </div>
                <div onClick={() =>deleteAlbum(album)} className='deleteImg'>
                    <img src="https://cdn-icons-png.flaticon.com/128/1828/1828843.png" alt="delete" />

                </div>

            </div>

        </>
    )
}
