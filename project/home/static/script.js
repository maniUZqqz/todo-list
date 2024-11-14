const tasks = [];
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskImageInput = document.getElementById('taskImage');
    const taskText = taskInput.value.trim();
    if (taskText) {
        const task = { text: taskText, completed: false };
        if (taskImageInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                task.image = e.target.result;
                tasks.push(task);
                renderTasks();
            };
            reader.readAsDataURL(taskImageInput.files[0]);
        } else {
            tasks.push(task);
            renderTasks();
        }
        taskInput.value = '';
        taskImageInput.value = '';
    }
}
function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.className = `list-group-item d-flex justify-content-between align-items-center ${task.
            completed ? 'completed' : ''}`;

        taskItem.innerHTML = `
      <div class="d-flex align-items-center">
        ${task.image ? `<img src="${task.image}" class="task-image" alt="Task Image">` : ''}
        <span onclick="toggleComplete(${index})">${task.text}</span>
      </div>
      <div>
        <button class="btn btn-sm btn-success mr-2 btn-custom" onclick="completeTask(${index})
">Complete</button>
        <button class="btn btn-sm btn-warning mr-2 btn-custom" onclick="editTask(${index})">Edit</
button>
        <button class="btn btn-sm btn-danger btn-custom" onclick="deleteTask(${index})">Delete</
button>
      </div>
    `;
        taskList.appendChild(taskItem);
    });
}
// function toggleComplete(index) {
//     tasks[index].completed = !tasks[index].completed;
//     renderTasks();
// }
function completeTask(index) {
    tasks[index].completed = true;
    renderTasks();
}
function editTask(index) {
    const newTaskText = prompt("Edit the task:", tasks[index].text);
    if (newTaskText !== null && newTaskText.trim()) {
        tasks[index].text = newTaskText.trim();
        renderTasks();
    }
}
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}
// بخش وبلاگ
function showBlog() {
    document.getElementById('todoSection').style.display = 'none';
    document.getElementById('blogSection').style.display = 'block';
    fetchBlogPosts();
}
function showTodo() {
    document.getElementById('todoSection').style.display = 'block';
    document.getElementById('blogSection').style.display = 'none';
}
function fetchBlogPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(posts => {
            const blogList = document.getElementById('blogList');
            blogList.innerHTML = '';
            posts.slice(0, 5).forEach(post => { // نمایش فقط ۵ پست اول
                const postItem = document.createElement('li');
                postItem.className = 'list-group-item';
                postItem.innerHTML = `
          <h5>${post.title}</h5>
          <p>${post.body}</p>
        `;
                blogList.appendChild(postItem);
            });
        })
        .catch(error => console.error('Error fetching posts:', error));
}


function toggleComplete(taskId) {
  fetch(`/toggle-complete/${taskId}/`, { method: 'POST', headers: {'X-CSRFToken': '{{ csrf_token }}'}})
    .then(response => {
      if (response.ok) {
        location.reload();
      }
    });
}
