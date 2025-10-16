// Add task when Enter key is pressed
document.getElementById('taskInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

function addTask() {
    const input = document.getElementById('taskInput');
    const taskText = input.value.trim();
    
    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    const taskList = document.getElementById('taskList');
    
    // Remove empty state if it exists
    const emptyState = taskList.querySelector('.empty-state');
    if (emptyState) {
        emptyState.remove();
    }

    // Create new task element
    const li = document.createElement('li');
    li.className = 'task-item';
    
    li.innerHTML = `
        <span class="task-text" onclick="toggleTask(this)">${taskText}</span>
        <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
    `;
    
    taskList.appendChild(li);
    input.value = '';
    input.focus();
    
    // Update the counter
    updateCounter();
}

function toggleTask(element) {
    element.parentElement.classList.toggle('completed');
    
    // Update the counter
    updateCounter();
}

function deleteTask(button) {
    const taskItem = button.parentElement;
    taskItem.remove();
    
    // Show empty state if no tasks left
    const taskList = document.getElementById('taskList');
    if (taskList.children.length === 0) {
        taskList.innerHTML = '<div class="empty-state">No tasks yet. Add one above!</div>';
    }
    
    // Update the counter
    updateCounter();
}

function updateCounter() {
    const taskList = document.getElementById('taskList');
    const tasks = taskList.querySelectorAll('.task-item');
    const completed = taskList.querySelectorAll('.task-item.completed');
    
    const total = tasks.length;
    const completedCount = completed.length;
    const remaining = total - completedCount;
    
    document.getElementById('totalTasks').textContent = total;
    document.getElementById('completedTasks').textContent = completedCount;
    document.getElementById('remainingTasks').textContent = remaining;
}
