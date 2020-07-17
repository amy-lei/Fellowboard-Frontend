export const getUserPosts = async (user, proxyUrl) => {
  try {
    if (user) {
      const { avatar_url, login, id } = user;
      const params = `?ghUsername=${login}&githubId=${id}&avatarUrl=${avatar_url}`;
      const response = await fetch(`${proxyUrl}/user-posts${params}`);
      const posts = await response.json();
      return posts;
    }
    return [];
  } catch (error) {
    console.error(error);
    return [];
  }
};
export const initialState = {
  isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")) || false,
  user: JSON.parse(localStorage.getItem("user")) || null,
  client_id: process.env.REACT_APP_CLIENT_ID,
  redirect_uri: process.env.REACT_APP_REDIRECT_URI,
  client_secret: process.env.REACT_APP_CLIENT_SECRET,
  proxy_url: process.env.REACT_APP_PROXY_URL,
  dbUser: {},
  posts: [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN": {
      localStorage.setItem(
        "isLoggedIn",
        JSON.stringify(action.payload.isLoggedIn)
      );
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      return {
        ...state,
        isLoggedIn: action.payload.isLoggedIn,
        user: action.payload.user,
      };
    }
    case "LOGOUT": {
      localStorage.clear();
      return { ...state, isLoggedIn: false, user: null };
    }
    case "POSTS": {
      const { posts, dbUser } = action.payload;
      return {
        ...state,
        posts,
        dbUser: dbUser instanceof Array ? dbUser[0] : dbUser,
      };
    }
    case "ADD_POST": {
      const posts = [...state.posts];
      posts.unshift(action.payload.post);
      return {
        ...state,
        posts,
      };
    }
    default:
      return state;
  }
};
