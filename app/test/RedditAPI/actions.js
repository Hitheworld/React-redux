import fetch from 'isomorphic-fetch';

export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT';
export const INVALIDATE_SUBREDDIT  = 'INVALIDATE_SUBREDDIT ';

//选择
export function selectSubreddit(subreddit) {
	return {
		type: SELECT_SUBREDDIT,
		subreddit
	}
}

//刷新
export function invalidateSubreddit(subreddit) {
	return {
		type: INVALIDATE_SUBREDDIT ,
		subreddit
	}
}

//请求数据
function requestPosts(subreddit) {
	return {
		type: REQUEST_POSTS,
		subreddit
	}
}

//收到的数据
function receivePosts(subreddit, json) {
	return {
		type: RECEIVE_POSTS,
		subreddit,
		posts: json.data.children.map(child => child.data),
		receivedAt: Date.now()
	}
}

//查询数据
function fetchPosts(subreddit) {
	return dispatch => {
		dispatch(requestPosts(subreddit))
		return fetch(`http://www.reddit.com/r/${subreddit}.json`)
			.then(response => response.json())
			.then(json => dispatch(receivePosts(subreddit, json)))
	}
}

//另外查询的数据
function shouldFetchPosts(state, subreddit) {
	const posts = state.postsBySubreddit[subreddit]
	if (!posts) {
		return true
	} else if (posts.isFetching) {
		return false
	} else {
		return posts.didInvalidate
	}
}

//根据须要更新数据
export function fetchPostsIfNeeded(subreddit) {
	return (dispatch, getState) => {
		if (shouldFetchPosts(getState(), subreddit)) {
			return dispatch(fetchPosts(subreddit))
		}
	}
}