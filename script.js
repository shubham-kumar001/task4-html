// JavaScript for Task Management Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });
    
    // Task Data
    let tasks = [
        {
            id: 1,
            title: "Prepare Quarterly Report",
            description: "Compile financial data and create presentation for stakeholders",
            dueDate: "2023-12-15",
            priority: "high",
            category: "project",
            completed: false
        },
        {
            id: 2,
            title: "Team Meeting",
            description: "Weekly sync to discuss project progress and blockers",
            dueDate: "2023-12-12",
            priority: "medium",
            category: "meeting",
            completed: false
        },
        {
            id: 3,
            title: "Update Website Content",
            description: "Add new case studies and testimonials to the website",
            dueDate: "2023-12-18",
            priority: "medium",
            category: "project",
            completed: true
        },
        {
            id: 4,
            title: "Client Presentation",
            description: "Prepare slides for the upcoming client demo",
            dueDate: "2023-12-14",
            priority: "high",
            category: "meeting",
            completed: false
        },
        {
            id: 5,
            title: "Review Marketing Campaign",
            description: "Analyze performance metrics and suggest improvements",
            dueDate: "2023-12-20",
            priority: "low",
            category: "general",
            completed: false
        }
    ];
    
    // DOM Elements
    const taskList = document.getElementById('task-list');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskModal = document.getElementById('task-modal');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const taskForm = document.getElementById('task-form');
    const categoryItems = document.querySelectorAll('.category-item');
    const sortBySelect = document.getElementById('sort-by');
    const viewTypeSelect = document.getElementById('view-type');
    
    // Initialize tasks
    renderTasks(tasks);
    
    // Category Filtering
    categoryItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all categories
            categoryItems.forEach(cat => cat.classList.remove('active'));
            // Add active class to clicked category
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            filterTasks(category);
        });
    });
    
    // Filter tasks by category
    function filterTasks(category) {
        let filteredTasks = [...tasks];
        
        if (category !== 'all') {
            if (category === 'pending') {
                filteredTasks = filteredTasks.filter(task => !task.completed);
            } else if (category === 'in-progress') {
                filteredTasks = filteredTasks.filter(task => !task.completed);
            } else if (category === 'completed') {
                filteredTasks = filteredTasks.filter(task => task.completed);
            } else if (category === 'high') {
                filteredTasks = filteredTasks.filter(task => task.priority === 'high');
            }
        }
        
        renderTasks(filteredTasks);
    }
    
    // Sort tasks
    sortBySelect.addEventListener('change', function() {
        sortTasks(this.value);
    });
    
    function sortTasks(sortBy) {
        const activeCategory = document.querySelector('.category-item.active');
        const category = activeCategory ? activeCategory.getAttribute('data-category') : 'all';
        let filteredTasks = [...tasks];
        
        if (category !== 'all') {
            if (category === 'pending' || category === 'in-progress') {
                filteredTasks = filteredTasks.filter(task => !task.completed);
            } else if (category === 'completed') {
                filteredTasks = filteredTasks.filter(task => task.completed);
            } else if (category === 'high') {
                filteredTasks = filteredTasks.filter(task => task.priority === 'high');
            }
        }
        
        if (sortBy === 'due-date') {
            filteredTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        } else if (sortBy === 'priority') {
            const priorityOrder = { high: 1, medium: 2, low: 3 };
            filteredTasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
        } else if (sortBy === 'name') {
            filteredTasks.sort((a, b) => a.title.localeCompare(b.title));
        }
        
        renderTasks(filteredTasks);
    }
    
    // Task Modal
    addTaskBtn.addEventListener('click', function() {
        taskModal.classList.add('active');
        // Set default due date to tomorrow
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        document.getElementById('task-due-date').value = tomorrow.toISOString().split('T')[0];
    });
    
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            taskModal.classList.remove('active');
            taskForm.reset();
        });
    });
    
    // Close modal when clicking outside
    taskModal.addEventListener('click', function(e) {
        if (e.target === taskModal) {
            taskModal.classList.remove('active');
            taskForm.reset();
        }
    });
    
    // Add new task
    taskForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const title = document.getElementById('task-title').value;
        const description = document.getElementById('task-description').value;
        const dueDate = document.getElementById('task-due-date').value;
        const priority = document.getElementById('task-priority').value;
        const category = document.getElementById('task-category').value;
        
        const newTask = {
            id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
            title,
            description,
            dueDate,
            priority,
            category,
            completed: false
        };
        
        tasks.unshift(newTask);
        renderTasks(tasks);
        
        // Update task counts
        updateTaskCounts();
        
        // Close modal and reset form
        taskModal.classList.remove('active');
        taskForm.reset();
        
        // Show success message
        showNotification('Task added successfully!');
    });
    
    // Render tasks to the DOM
    function renderTasks(taskArray) {
        taskList.innerHTML = '';
        
        if (taskArray.length === 0) {
            taskList.innerHTML = '<div class="empty-state">No tasks found. Add a new task to get started!</div>';
            return;
        }
        
        taskArray.forEach(task => {
            const taskElement = createTaskElement(task);
            taskList.appendChild(taskElement);
        });
    }
    
    // Create task element
    function createTaskElement(task) {
        const taskDiv = document.createElement('div');
        taskDiv.className = `task-item ${task.completed ? 'completed' : ''}`;
        taskDiv.setAttribute('data-id', task.id);
        
        const formattedDate = new Date(task.dueDate).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
        
        taskDiv.innerHTML = `
            <div class="task-info">
                <div class="task-title">
                    <input type="checkbox" ${task.completed ? 'checked' : ''} class="task-checkbox">
                    <h4>${task.title}</h4>
                </div>
                <p class="task-description">${task.description}</p>
                <div class="task-meta">
                    <div class="task-meta-item">
                        <i class="far fa-calendar"></i>
                        <span>${formattedDate}</span>
                    </div>
                    <div class="task-meta-item">
                        <span class="priority ${task.priority}">${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority</span>
                    </div>
                    <div class="task-meta-item">
                        <i class="fas fa-tag"></i>
                        <span>${task.category.charAt(0).toUpperCase() + task.category.slice(1)}</span>
                    </div>
                </div>
            </div>
            <div class="task-actions-item">
                <button class="edit-task" title="Edit Task">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="delete-task" title="Delete Task">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        // Add event listeners for task actions
        const checkbox = taskDiv.querySelector('.task-checkbox');
        checkbox.addEventListener('change', function() {
            toggleTaskCompletion(task.id, this.checked);
        });
        
        const deleteBtn = taskDiv.querySelector('.delete-task');
        deleteBtn.addEventListener('click', function() {
            deleteTask(task.id);
        });
        
        const editBtn = taskDiv.querySelector('.edit-task');
        editBtn.addEventListener('click', function() {
            editTask(task.id);
        });
        
        return taskDiv;
    }
    
    // Toggle task completion
    function toggleTaskCompletion(taskId, completed) {
        const taskIndex = tasks.findIndex(task => task.id === taskId);
        if (taskIndex !== -1) {
            tasks[taskIndex].completed = completed;
            renderTasks(tasks);
            updateTaskCounts();
            
            const status = completed ? 'completed' : 'marked as pending';
            showNotification(`Task ${status}!`);
        }
    }
    
    // Delete task
    function deleteTask(taskId) {
        if (confirm('Are you sure you want to delete this task?')) {
            tasks = tasks.filter(task => task.id !== taskId);
            renderTasks(tasks);
            updateTaskCounts();
            showNotification('Task deleted successfully!');
        }
    }
    
    // Edit task (simplified - in a real app would open a modal with task data)
    function editTask(taskId) {
        showNotification('Edit functionality would open in a real application');
    }
    
    // Update task counts in sidebar
    function updateTaskCounts() {
        const totalTasks = tasks.length;
        const pendingTasks = tasks.filter(task => !task.completed).length;
        const completedTasks = tasks.filter(task => task.completed).length;
        const highPriorityTasks = tasks.filter(task => task.priority === 'high').length;
        
        // Update counts in sidebar
        document.querySelector('.category-item[data-category="all"] .task-count').textContent = totalTasks;
        document.querySelector('.category-item[data-category="pending"] .task-count').textContent = pendingTasks;
        document.querySelector('.category-item[data-category="completed"] .task-count').textContent = completedTasks;
        document.querySelector('.category-item[data-category="high"] .task-count').textContent = highPriorityTasks;
        
        // Update progress bar
        const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
        document.querySelector('.progress-fill').style.width = `${progressPercent}%`;
        document.querySelector('.progress-text span:first-child').textContent = `${progressPercent}% Complete`;
        document.querySelector('.progress-text span:last-child').textContent = `${completedTasks} of ${totalTasks} tasks`;
    }
    
    // Show notification
    function showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: var(--primary-color);
            color: white;
            padding: 12px 20px;
            border-radius: var(--radius-sm);
            box-shadow: var(--shadow-md);
            z-index: 3000;
            transform: translateX(150%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(150%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
    
    // Initialize task counts
    updateTaskCounts();
});
