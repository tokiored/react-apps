import { useState } from 'react'
import './OnlineUsers.css'
import { useCollection } from 'hooks/useCollection'
import Avatar from './Avatar'

export default function OnlineUsers() {
    const { isPending, error, documents } = useCollection('users')

    return (
        <div className="user-list">
            <h2>Online Users</h2>
            {error && <div className="error">{error}</div>}
            {documents &&
                documents.map((user) => (
                    <div className="user-list-item" key={user.id}>
                        {user.online && <span className="online-user"></span>}
                        <span>{user.displayName}</span>
                        <Avatar initial={user.displayName[0]} />
                    </div>
                ))}
        </div>
    )
}
