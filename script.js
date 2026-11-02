

const INITIAL_LIKES = 100;
const INITIAL_DISLIKES = 20;

let likes = INITIAL_LIKES;
let dislikes = INITIAL_DISLIKES;
let commentsList = [];


const likeBtn = document.getElementById("like-btn");
const dislikeBtn = document.getElementById("dislike-btn");
const likeCountEl = document.getElementById("like-count");
const dislikeCountEl = document.getElementById("dislike-count");
const commentInput = document.getElementById("comment-input");
const submitBtn = document.getElementById("submit-btn");
const clearBtn = document.getElementById("clear-btn");
const commentsDisplay = document.getElementById("comments-display");

function setCookie(name, value, days = 7) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; ${expires}; path=/; SameSite=Lax`;
}

function getCookie(name) {
    const cName = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(cName) === 0) {
            return c.substring(cName.length, c.length);
        }
    }
    return "";
}

function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}


function initApp() {
    const savedLikes = getCookie("likes_count");
    const savedDislikes = getCookie("dislikes_count");

    if (savedLikes !== "") likes = parseInt(savedLikes, 10);
    if (savedDislikes !== "") dislikes = parseInt(savedDislikes, 10);

    
    const userVote = getCookie("has_voted");
    if (userVote !== "") {
        likeBtn.disabled = true;
        dislikeBtn.disabled = true;
    }

    const storedComment = getCookie("user_comment");
    if (storedComment !== "") {
        commentsList = [storedComment];
        submitBtn.disabled = true;
        commentInput.disabled = true;
        commentInput.placeholder = "You have already commented.";
    }

    renderUI();
}


function renderUI() {
    likeCountEl.textContent = likes;
    dislikeCountEl.textContent = dislikes;

    commentsDisplay.innerHTML = "";
    commentsList.forEach(comment => {
        const item = document.createElement("div");
        item.className = "comment-item";
        item.textContent = comment;
        commentsDisplay.appendChild(item);
    });
}


likeBtn.addEventListener("click", () => {
    if (getCookie("has_voted") !== "") return;

    likes++;
    setCookie("has_voted", "like");
    setCookie("likes_count", likes);

    likeBtn.disabled = true;
    dislikeBtn.disabled = true;
    renderUI();
});


dislikeBtn.addEventListener("click", () => {
    if (getCookie("has_voted") !== "") return;

    dislikes++;
    setCookie("has_voted", "dislike");
    setCookie("dislikes_count", dislikes);

    likeBtn.disabled = true;
    dislikeBtn.disabled = true;
    renderUI();
});


submitBtn.addEventListener("click", () => {
    if (getCookie("user_comment") !== "") {
        alert("You have already submitted a comment!");
        return;
    }

    const text = commentInput.value.trim();
    if (!text) {
        alert("Please write a comment first.");
        return;
    }

    commentsList.push(text);
    setCookie("user_comment", text);

    commentInput.value = "";
    submitBtn.disabled = true;
    commentInput.disabled = true;
    commentInput.placeholder = "You have already commented.";
    renderUI();
});


clearBtn.addEventListener("click", () => {
    deleteCookie("has_voted");
    deleteCookie("user_comment");
    deleteCookie("likes_count");
    deleteCookie("dislikes_count");

    likes = INITIAL_LIKES;
    dislikes = INITIAL_DISLIKES;
    commentsList = [];

    likeBtn.disabled = false;
    dislikeBtn.disabled = false;
    submitBtn.disabled = false;
    commentInput.disabled = false;
    commentInput.value = "";
    commentInput.placeholder = "Write a comment...";

    renderUI();
});


document.addEventListener("DOMContentLoaded", initApp);