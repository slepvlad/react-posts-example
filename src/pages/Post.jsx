import React, {useEffect, useState} from "react";
import '../src/styles/App.css'
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/ui/modal/MyModal";
import MyButton from "./components/ui/button/MyButton";
import {usePosts} from "./hooks/UsePost";
import PostService from "./api/PostService";
import MyLoader from "./components/ui/loader/MyLoader";
import {useFetching} from "./hooks/UseFetching";
import {getPagesCount} from "./utils/page";
import MyPagination from "./components/ui/pagination/MyPagination";

function Post() {
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({sort: '', query: ''});
    const [modal, setModal] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);



    const sortedAndSearchPost = usePosts(posts, filter.sort, filter.query);
    const [fetchPosts, isPostLoading, postError] = useFetching(async () => {
        const response = await PostService.getAll(limit, page);
        setPosts(response.data);
        setTotalPages(getPagesCount(response.headers['x-total-count'], limit))
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
        fetchPosts(page, limit)
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
                ?
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}>
                    <MyLoader/>
                </div>
                :
                <PostList remove={removePost} posts={sortedAndSearchPost} title={'Posts list 1'}/>
            }
            <MyPagination page={page} changePage={changePage} totalPages={totalPages}/>
        </div>
    );
}

export default Post;