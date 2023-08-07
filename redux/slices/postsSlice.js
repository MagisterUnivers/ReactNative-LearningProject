import { createSlice } from "@reduxjs/toolkit";
import { createPost, readPosts, updatePost, deletePost, createComment } from "../operations/postsOperations";
const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        items: [],
    },
    extraReducers: (builder) => {
        builder
            .addCase(createPost.fulfilled, (state, { payload }) => {
                state.items.push({data: payload, id: payload.id});
            })
            .addCase(readPosts.fulfilled, (state, { payload }) => {
                state.items = payload;
            })
            // .addCase(updatePost.fulfilled, (state, { payload }) => {
            //     return {
            //         items: state.items.map(post => {
            //             return post._id !== payload._id ? post : payload;
            //         }),
            //     };
            // })
            // .addCase(deletePost.fulfilled, state => {
            //     return {
            //         ...state,
            //         isLoading: false,
            //         items: state.items.filter(post => post._id !== payload),
            //     };
            // })
            .addCase(createComment.fulfilled, (state, { payload }) => {
                const {authorAvatar, comment, date, postId } = payload;
                    state.items.map(post => 
                        post.id !== postId
                            ? post
                            : post.data.comments.push({
                                authorAvatar,
                                comment,
                                date
                            }))
            })
    }
});

export default postsSlice.reducer;