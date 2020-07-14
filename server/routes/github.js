const express = require("express");
const fetch = require('node-fetch')
const router = express.Router();

const issues = "issues"
const pullRequests = "pulls"

/*
org and repo are hard-coded here, will need input from frontend to pass in params
*/
var org = "MLH-Fellowship"
var repo = "httpie"


function fetchIssues(org, repo) {
    try {
        fetch(`https://api.github.com/repos/${org}/${repo}/${issues}`)
        .then(response => response.json())
        .then(data => {
            var issues = []
            for(var i=0; i<data.length; i++) {
                var allAssignees = []

                var dict = data[i].assignees
                dict.forEach(function(d){
                    allAssignees.push(d.login)
                });

                var issue = {
                    'url': data[i].url,
                    'title': data[i].title,
                    'body': data[i].body,
                    'timestamp': data[i].created_at,
                    'avatar': data[i].user.avatar_url,
                    'id': data[i].id,
                    'creator': data[i].user.login,
                    'state': data[i].state,
                    'allAssignees': allAssignees
                }
                issues.push(issue)
            }
            console.log(issues)
            return issues
        })
    } catch(err) {
        console.log(err)
    }
}



function fetchPRs(org, repo) {
    try {
        fetch(`https://api.github.com/repos/${org}/${repo}/${pullRequests}`)
        .then(response => response.json())
        .then(data => {
            var PRs = []
            for(var i=0; i<data.length; i++) {
                var allAssignees = []

                var dict = data[i].assignees
                dict.forEach(function(d){
                    allAssignees.push(d.login)
                });

                var PR = {
                    'url': data[i].url,
                    'title': data[i].title,
                    'body': data[i].body,
                    'timestamp': data[i].created_at,
                    'avatar': data[i].user.avatar_url,
                    'id': data[i].id,
                    'creator': data[i].user.login,
                    'state': data[i].state,
                    'allAssignees': allAssignees
                }
                PRs.push(PR)
            }
            console.log(PRs)
            return PRs
        })
    } catch(err) {
        console.log(err)
    }
}

module.exports = {fetchIssues, fetchPRs};