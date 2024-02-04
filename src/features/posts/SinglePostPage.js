import React from 'react'
// import { useSelector } from 'react-redux'

import { Link } from 'react-router-dom'

import { Spinner } from '../../components/Spinner'
import { useGetPostQuery } from '../api/apiSlice'

import { PostAuthor } from './PostAuthor'
import { ReactionButtons } from './ReactionButtons'

import { TimeAgo } from './TimeAgo'

// import { selectPostById } from './postsSlice'

export const SinglePostPage = ({ match }) => {
  const { postId } = match.params

  const { data: post, isFetching, isSuccess } = useGetPostQuery(postId)

  let content
  if (isFetching) {
    content = <Spinner text="Loading..." />
  } else if (isSuccess) {
    content = (
      <article className="post">
        <h2>{post.title}</h2>
        <div>
          <PostAuthor userId={post.user} />
          <TimeAgo timestamp={post.date} />
        </div>
        <p className="post-content">{post.content}</p>
        <ReactionButtons post={post} />
        <Link to={`/editPost/${post.id}`} className="button">
          Edit Post
        </Link>
      </article>
    )
  }

  return <section>{content}</section>
}

// const post = useSelector((state) => selectPostById(state, postId))

//   if (!post) {
//     return (
//       <section>
//         <h2>Post not found!</h2>
//       </section>
//     )
//   }

//   return (
//     <section>
//       <article className="post">
//         <h2>{post.title}</h2>
//         <p className="post-content">{post.content}</p>
//         <PostAuthor userId={post.user} />
//         <ReactionButtons post={post} />
//         <Link to={`/editPost/${post.id}`} className="button">
//           Edit
//         </Link>
//       </article>
//     </section>
//   )
// }
