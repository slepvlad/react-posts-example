import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom"
import {useFetching} from "../hooks/UseFetching";
import PostService from "../api/PostService";
import MyLoader from "./ui/loader/MyLoader";

const PostPage = () => {

    const params = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [fetchPostById, isLoading, error] = useFetching(async (id) => {
        const response = await PostService.getById(id)
        setPost(response.data)
    })
    const [fetchCommentsById, isCommentsLoading, comError] = useFetching(async (id) => {
        const response = await PostService.getCommentsByPostId(id)
        setComments(response.data)
    })

    useEffect(() => {
        fetchPostById(params.id)
        fetchCommentsById(params.id)
    }, [])
    return (
        <div>
            <h1>Post page Id = {params.id}</h1>
            {isLoading
                ? <MyLoader/>
                : <div>{post.id}.{post.title}</div>
            }
            <h1>Comments</h1>
            {isCommentsLoading
            ? <MyLoader/>
                :<div>
                    {comments.map(comment =>
                        <div style={{marginTop:"15px"}}>
                            <h5>{comment.email}</h5>
                            <div>{comment.body}</div>
                        </div>
                    )}
                </div>
            }
        </div>
    );
};

export default PostPage;