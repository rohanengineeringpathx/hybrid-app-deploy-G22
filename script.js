// YAHAN APNA ACTUAL LOAD BALANCER URL DALNA
const API_URL = 'http://a563e1964b1404e17be4d2491b5236a9-425959192.ap-south-1.elb.amazonaws.com/api/tasks';

// Tasks fetch karne ka function
async function loadTasks() {
    try {
        const response = await fetch(API_URL);
        const tasks = await response.json();
        
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = '';
        
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = task.title;
            taskList.appendChild(li);
        });
    } catch (error) {
        console.error('Error loading tasks:', error);
    }
}

// Naya task add karne ka function
async function addTask() {
    const input = document.getElementById('taskInput');
    const title = input.value.trim();
    
    if (!title) return;
    
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title })
        });
        
        if (response.ok) {
            input.value = '';
            loadTasks(); // Refresh tasks list
        }
    } catch (error) {
        console.error('Error adding task:', error);
    }
}

// Page load hone pe tasks load karo
document.addEventListener('DOMContentLoaded', loadTasks);