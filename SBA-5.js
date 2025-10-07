//creating DOM Elements
const postForm = document.getElementById('postForm')
const titleInput = document.getElementById('title')
const contentInput = document.getElementById('content')
const submitButtonInput = document.getElementById('submitButton')
const postsList = document.getElementById('postsList')

//span error DOM elements
const titleError = document.getElementById('titleError')
const contentError = document.getElementById('contentError')


let posts =[];
let editingPostId = null;

//Generating Unique ID
const generateId = () => Date.now().toString()

const saveToLocalStorage = () => {
  localStorage.setItem('posts', JSON.stringify(posts))
}

const loadFromLocalStorage = ()=> {
  const storedPosts = localStorage.getItem('posts')
  if (storedPosts){
    posts = JSON.parse(storedPosts)
  }
}
//post rendering
// Render Posts
const renderPosts = () => {
    postsList.innerHTML = ''; // Clear existing posts
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <small>Posted on: ${new Date(post.timestamp).toLocaleString()}</small>
            <div>
                <button class="edit-btn" data-id="${post.id}">Edit</button>
                <button class="delete-btn" data-id="${post.id}">Delete</button>
            </div>
        `;
        postsList.appendChild(postElement);
    });
};

// Handle Form Submission
postForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();
    
    // Clear previous errors
    titleError.textContent = '';
    contentError.textContent = '';
    
    let isValid = true;
    
    // Validation
    if (!title) {
        titleError.textContent = 'Title is required!';
        isValid = false;
    }
    if (!content) {
        contentError.textContent = 'Content is required!';
        isValid = false;
    }
    
    if (!isValid) {
        return;
    }
    
    if (editingPostId) {
        // Update existing post
        posts = posts.map(post => 
            post.id === editingPostId 
                ? { ...post, title, content, timestamp: Date.now() }
                : post
        );
        editingPostId = null;
        submitButton.textContent = 'Submit';
    } else {
        // Create new post
        const newPost = {
            id: generateId(),
            title,
            content,
            timestamp: Date.now()
        };
        posts.push(newPost);
    }
    
    // Save and render
    saveToLocalStorage();
    renderPosts();
    
    // Clear form
    titleInput.value = '';
    contentInput.value = '';
});

// Handle Delete and Edit (Event Delegation)
postsList.addEventListener('click', (e) => {
    const id = e.target.dataset.id;
    
    if (e.target.classList.contains('delete-btn')) {
        // Delete post
        posts = posts.filter(post => post.id !== id);
        saveToLocalStorage();
        renderPosts();
    }
    
    if (e.target.classList.contains('edit-btn')) {
        // Populate form for editing
        const postToEdit = posts.find(post => post.id === id);
        if (postToEdit) {
            titleInput.value = postToEdit.title;
            contentInput.value = postToEdit.content;
            editingPostId = id;
            submitButton.textContent = 'Update';
        }
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadFromLocalStorage();
    renderPosts();
});



