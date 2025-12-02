import { useState } from 'react'
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow'

import Avatar from 'components/Avatar'
import { useCollection } from 'hooks/useCollection'

export default function ProjectCommentList({ comments }) {
    if (!comments) {
        return <div className="">No comments...</div>
    }
    return (
        <ul>
            {comments.length &&
                comments.map((comment) => (
                    <li key={comment.id}>
                        <div className="comment-author">
                            <Avatar initial={comment.displayName[0]} />
                            <p>{comment.displayName}</p>
                        </div>
                        <div className="comment-date">
                            <small>
                                {formatDistanceToNow(
                                    comment.created_at.toDate(),
                                    { addSuffix: true }
                                )}
                            </small>
                        </div>
                        <div className="comment-content">
                            <p>{comment.content}</p>
                        </div>
                    </li>
                ))}
        </ul>
    )
}
