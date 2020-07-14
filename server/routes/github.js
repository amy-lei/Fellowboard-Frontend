const express = require("express");
const fetch = require('node-fetch');
const Post = require("../models/Post");
const router = express.Router();

const issues = "issues";
const pullRequests = "pulls";

/*
org and repo are hard-coded here, will need input from frontend to pass in params
*/
var org = "MLH-Fellowship";
var repo = "httpie";


function fetchIssues(org, repo) {
    try {
        fetch(`https://api.github.com/repos/${org}/${repo}/${issues}`)
        .then(response => response.json())
        .then(data => {
            var issues = [];
            for(var i=0; i<data.length; i++) {
                var allAssignees = [];

                var dict = data[i].assignees;
                dict.forEach(function(d){
                    allAssignees.push(d.login);
                });
                var issue = {
                    'creator': data[i].user.login,
                    'tags': [repo, org],
                    'title': data[i].title,
                    'type': "Github",
                    'timestamp': new Date(data[i].created_at),
                    'isPublic': true,
                    'content': {
                        'url': data[i].url,
                        'body': data[i].body,
                        'state': data[i].state,
                        'allAssignees': allAssignees
                    }
                };
                issues.push(issue);
                addPostToDatabase(issue);

            }
            console.log(issues);
            return issues;
        });
    } catch(err) {
        console.log(err);
    }
}



function fetchPRs(org, repo) {
    try {
        fetch(`https://api.github.com/repos/${org}/${repo}/${pullRequests}`)
        .then(response => response.json())
        .then(data => {
            var PRs = [];
            for(var i=0; i<data.length; i++) {
                var allAssignees = [];

                var dict = data[i].assignees;
                dict.forEach(function(d){
                    allAssignees.push(d.login);
                });

                var PR = {
                    'creator': data[i].user.login,
                    'tags': [repo, org],
                    'title': data[i].title,
                    'type': "Github",
                    'timestamp': new Date(data[i].created_at),
                    'isPublic': true,
                    'content': {
                        'url': data[i].url,
                        'body': data[i].body,
                        'state': data[i].state,
                        'allAssignees': allAssignees
                    }
                };
                PRs.push(PR);
                addPostToDatabase(PR);
            }
            console.log(PRs);
            return PRs;
        });
    } catch(err) {
        console.log(err);
    }
}

async function addPostToDatabase(post) {
    var toInsert = Post(post);
    try {
        const exists = await Post.findOne(post);
        if(!exists) {
            await toInsert.save();
            console.log(`added ${post.title} to database.`);
        }
        else {
            console.log(`${post.title} already exists.`);
        }
    } catch (e) {
        console.log(e);
    }
}

module.exports = {fetchIssues, fetchPRs};