import './Avatar.css'

export default function Avatar({ src, initial }) {
    return (
        <div className="avatar">
            {src && <img src={src} alt="user avatar" />}
            {!src && <span className="initial">{initial}</span>}
        </div>
    )
}
