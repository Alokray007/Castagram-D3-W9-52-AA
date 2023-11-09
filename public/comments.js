export const createCommentSection = () => {
    const container = document.querySelector(".container");

    const commentForm = createCommentForm();
    const commentsList = createCommentsList();

    container.appendChild(commentForm);
    container.appendChild(commentsList);

    // Load comments from localStorage
    loadComments();

};

const loadComments = () => {
    // Retrieve comments from localStorage
    const storedComments = localStorage.getItem("comments");

    if (storedComments) {
        const comments = JSON.parse(storedComments);

        // Display the retrieved comments
        comments.forEach((commentText) => {
            createComment(commentText);
        });
    }
};

const createCommentsList = () => {
    // Create comments section
    const comments = document.createElement("div");
    comments.className = "comments";
    comments.style.border = "solid grey 1px";
    comments.style.height = "400px";
    comments.style.width = "80%";
    comments.style.margin = "10px";
    comments.style.padding = "5px";
    comments.style.overflow = "scroll";

    return comments;
};

const createCommentForm = () => {
    // Create form
    const commentForm = document.createElement("form");
    commentForm.className = "comment-form";
    commentForm.style.margin = "20px";
    commentForm.style.display = "flex";
    commentForm.style.width = "100%";
    commentForm.style.justifyContent = "center";
    commentForm.style.alignItems = "center";

    commentForm.appendChild(createCommentInput());
    commentForm.appendChild(createCommentSubmitBtn());

    return commentForm;
};

const createCommentInput = () => {
    // Create comment input
    const userCommentContainer = document.createElement("div");
    userCommentContainer.className = "user-comment-container";
    userCommentContainer.style.marginRight = "10px";

    const label = document.createElement("label");
    label.setAttribute("for", "user-comment");
    label.innerText = "Comment: ";

    const commentInput = document.createElement("input");
    commentInput.id = "user-comment";
    commentInput.name = "user-comment";
    commentInput.placeholder = "Add a comment... ";
    commentInput.required = true;

    userCommentContainer.appendChild(label);
    userCommentContainer.appendChild(commentInput);

    return userCommentContainer;
};

const createCommentSubmitBtn = () => {
    // Create submit button
    const submitBtn = document.createElement("input");
    submitBtn.id = "submit-comment"
    submitBtn.type = "submit";
    submitBtn.value = "Submit";

    submitBtn.addEventListener('click', submitComment);

    return submitBtn;
};

const submitComment = e => {
    e.preventDefault();
    const commentInput = document.querySelector('#user-comment');
    const commentText = commentInput.value;
    createComment(commentText);
    commentInput.value = "";
    localStorage.setItem("comment", commentText);

    // Save the comment to localStorage
    saveComment(commentText);
}

const createComment = (commentText) => {
    const newCommentContainer = document.createElement('div');
    newCommentContainer.style.display = "flex";
    newCommentContainer.style.margin = "10px";

    const newComment = document.createElement("p");
    newComment.innerText = commentText;

    const deleteButton = document.createElement('button');
    deleteButton.className = "delete-button";
    deleteButton.style.marginLeft = "15px";
    deleteButton.innerText = 'Delete';
    deleteButton.addEventListener('click', e => {
        // Remove comment from HTML DOM
        newCommentContainer.remove();
        // Remove the comment from localStorage
        removeComment(commentText);
    });

    newCommentContainer.appendChild(newComment);
    newCommentContainer.appendChild(deleteButton);
    const comments = document.querySelector(".comments");
    comments.appendChild(newCommentContainer);
};

const saveComment = (commentText) => {
    // Retrieve existing comments from localStorage
    const storedComments = localStorage.getItem("comments");
    const comments = storedComments ? JSON.parse(storedComments) : [];

    // Add the new comment to the array
    comments.push(commentText);

    // Save the updated comments back to localStorage
    localStorage.setItem("comments", JSON.stringify(comments));
};

const removeComment = (commentText) => {
    // Retrieve existing comments from localStorage
    const storedComments = localStorage.getItem("comments");
    const comments = storedComments ? JSON.parse(storedComments) : [];

    // Remove the comment from the array
    const commentIndex = comments.indexOf(commentText);
    if (commentIndex !== -1) {
        comments.splice(commentIndex, 1);
    }

    // Save the updated comments back to localStorage
    localStorage.setItem("comments", JSON.stringify(comments));
};


export const resetComments = () => {
    const comments = document.querySelector(".comments");
    Array.from(comments.children).forEach(child => child.remove());

    // Clear comments from localStorage
    localStorage.removeItem("comments");
};
