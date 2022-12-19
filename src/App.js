import React, {useMemo, useState} from "react";
import '../src/styles/App.css'
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/ui/modal/MyModal";
import MyButton from "./components/ui/button/MyButton";

function App() {
    const [posts, setPosts] = useState([
        {id: 1, title: 'Javascript', body: 'Description'},
        {id: 2, title: 'Javascript1', body: 'Description 2'},
        {id: 3, title: 'Javascript2', body: 'Description 3'},
        {id: 4, title: 'Javascript3', body: 'Javascript - program language'}
    ]);

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false);

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const sortedPost = useMemo(() => {
        console.log('SORTED called')
        console.log(filter)
        if (filter.sort) {
            console.log(posts)
            return [...posts]
                .sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]));
        }
        return posts;
    }, [filter, posts]);

    const sortedAndSearchPost = useMemo(() => {
        return sortedPost.filter(item => item.title.toLocaleLowerCase()
            .includes(filter.query.toLocaleLowerCase()));
    }, [filter, sortedPost])

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
            <PostList remove={removePost} posts={sortedAndSearchPost} title={'Posts list 1'}/>
        </div>
    );
}

export default App;
