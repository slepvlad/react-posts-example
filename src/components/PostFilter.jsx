import React from 'react';
import MyInput from "./ui/input/MyInput";
import MySelect from "./ui/select/MySelect";

const PostFilter = ({filter, setFilter}) => {
    return (
        <div>
            <MyInput
                value={filter.query}
                placeholder={'Search ...'}
                onChange={e => setFilter({...filter, query: e.target.value})}
            />
            <MySelect
                value={filter.sort}
                defaultValue={'Sorting'}
                onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
                options={[
                    {value: 'title', name: 'By Title'},
                    {value: 'body', name: 'By Description'}
                ]}/>
        </div>
    );
};

export default PostFilter;