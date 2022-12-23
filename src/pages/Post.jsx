import React, {useEffect, useRef, useState} from "react";
import '../styles/App.css'
import {usePosts} from "../hooks/UsePost";
import {useFetching} from "../hooks/UseFetching";
import PostService from "../api/PostService";
import {getPagesCount} from "../utils/page";
import MyModal from "../components/ui/modal/MyModal";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import MyLoader from "../components/ui/loader/MyLoader";
import PostList from "../components/PostList";
import MyPagination from "../components/ui/pagination/MyPagination";
import MyButton from "../components/ui/button/MyButton";
import {useObserver} from "../hooks/useObserver";


function Post() {
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({sort: '', query: ''});
    const [modal, setModal] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const lastElement = useRef();


    const sortedAndSearchPost = usePosts(posts, filter.sort, filter.query);
    const [fetchPosts, isPostLoading, postError] = useFetching(async () => {
        const response = await PostService.getAll(limit, page);
        setPosts([...posts, ...response.data]);
        setTotalPages(getPagesCount(response.headers['x-total-count'], limit))
    })

    useObserver(lastElement, page < totalPages, isPostLoading, () => {
        setPage(page + 1)
    })

    useEffect(() => {
        fetchPosts(limit, page)
    }, [page]);

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const changePage = (page) => {
        setPage(page)
    }

    return (
        <div className="App">
            <MyButton
                style={{marginTop: 30}}
                onClick={() => setModal(true)}>
                Create post
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost}/>
            </MyModal>
            <hr style={{margin: '15px 0'}}/>
            <PostFilter filter={filter} setFilter={setFilter}/>
            {postError && <h1>Error: {postError}</h1>}
            {isPostLoading
                &&
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}>
                    <MyLoader/>
                </div>}
            <PostList remove={removePost} posts={sortedAndSearchPost} title={'Posts list 1'}/>
            <div ref={lastElement} style={{height: 20, background: 'red'}}/>
            <MyPagination page={page} changePage={changePage} totalPages={totalPages}/>
        </div>
    );
}

export default Post;