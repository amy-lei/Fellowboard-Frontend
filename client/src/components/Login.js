import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../App";
import { getUserPosts } from "../store/reducer/index";
import illustration from "../assets/illustration.svg";
import "../styles/login.scss";

export default function Login() {
  const { state, dispatch } = useContext(AuthContext);
  const [data, setData] = useState({ errorMessage: "", isLoading: false });

  const { client_id, redirect_uri } = state;

  useEffect(() => {
    // After requesting Github access, Github redirects back to your app with a code parameter
    const url = window.location.href;
    const hasCode = url.includes("?code=");

    // If Github API returns the code parameter
    if (hasCode) {
      const newUrl = url.split("?code=");
      window.history.pushState({}, null, newUrl[0]);
      setData({ ...data, isLoading: true });

      const requestData = {
        client_id: state.client_id,
        redirect_uri: state.redirect_uri,
        client_secret: state.client_secret,
        code: newUrl[1],
      };

      const proxy_url = state.proxy_url;

      // Use code parameter and other parameters to make POST request to proxy_server
      fetch(proxy_url, {
        method: "POST",
        body: JSON.stringify(requestData),
      })
        .then((response) => response.json())
        .then(async (data) => {
          dispatch({
            type: "LOGIN",
            payload: { user: data, isLoggedIn: true },
          });
          try {
            const { dbUser, posts } = await getUserPosts(data, proxy_url);
            dispatch({
              type: "POSTS",
              payload: { posts, dbUser },
            });
          } catch (error) {
            console.error(error);
          }
        })
        .catch((error) => {
          setData({
            isLoading: false,
            errorMessage: "Sorry! Login failed",
          });
        });
    }
  }, [state, dispatch, data]);

  if (state.isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login">
      <div className="login-container">
        {data.isLoading ? (
          <div className="loader"></div>
        ) : (
          <div className="login-btn-container">
            <a
              className="login-btn"
              href={`https://github.com/login/oauth/authorize?scope=user&client_id=${client_id}&redirect_uri=${redirect_uri}`}
              onClick={() => {
                setData({ ...data, errorMessage: "" });
              }}
            >
              Login with Github
            </a>
            <span className="login-btn-error">{data.errorMessage}</span>
          </div>
        )}
      </div>
      <div className="login-header">
        <h1 className="login-header_name">fellowboard</h1>
        <p className="login-header_tagline">
          Navigate resources curated by fellows for fellows
        </p>
      </div>
    </div>
  );
}
