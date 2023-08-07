import { createSlice } from '@reduxjs/toolkit';
import {
	createPost,
	readPosts,
	createComment
} from '../operations/postsOperations';
const postsSlice = createSlice({
	name: 'posts',
	initialState: {
		items: []
	},
	extraReducers: (builder) => {
		builder
			.addCase(createPost.fulfilled, (state, { payload }) => {
				state.items.push({ data: payload, id: payload.id });
			})
			.addCase(readPosts.fulfilled, (state, { payload }) => {
				state.items = payload;
			})
			.addCase(createComment.fulfilled, (state, { payload }) => {
				const { authorAvatar, comment, date, postId } = payload;
				state.items.map((post) =>
					post.id !== postId
						? post
						: post.data.comments.push({
								authorAvatar,
								comment,
								date
						  })
				);
			});
	}
});

export default postsSlice.reducer;
