// JavaScript for Professional Business Website with Enhanced Task Management

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const header = document.querySelector('.header');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.innerHTML = navMenu.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }
    
    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Show/hide back to top button
        const backToTopBtn = document.getElementById('back-to-top');
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // Back to top functionality
    document.getElementById('back-to-top').addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Dark/Light theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme or prefer-color-scheme
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.className = 'fas fa-sun';
    }
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            themeIcon.className = 'fas fa-moon';
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeIcon.className = 'fas fa-sun';
            localStorage.setItem('theme', 'dark');
        }
    });
    
    // Task Data with more sample tasks
    let tasks = [
        {
            id: 1,
            title: "Prepare Quarterly Financial Report",
            description: "Compile financial data, analyze performance metrics, and create presentation for board meeting",
            dueDate: "2023-12-15",
            priority: "high",
            category: "project",
            tags: ["finance", "report", "quarterly"],
            assignee: "alex",
            completed: false,
            createdAt: "2023-11-28"
        },
        {
            id: 2,
            title: "Team Strategy Meeting",
            description: "Weekly sync to discuss project progress, address blockers, and plan next sprint",
            dueDate: "2023-12-12",
            priority: "medium",
            category: "meeting",
            tags: ["meeting", "strategy", "planning"],
            assignee: "sarah",
            completed: false,
            createdAt: "2023-11-30"
        },
        {
            id: 3,
            title: "Website Content Update",
            description: "Add new case studies, testimonials, and blog posts to the company website",
            dueDate: "2023-12-18",
            priority: "medium",
            category: "marketing",
            tags: ["website", "content", "marketing"],
            assignee: "james",
            completed: true,
            createdAt: "2023-11-25"
        },
        {
            id: 4,
            title: "Client Presentation Preparation",
            description: "Prepare slides and demo materials for the upcoming client demo session",
            dueDate: "2023-12-14",
            priority: "high",
            category: "meeting",
            tags: ["client", "presentation", "demo"],
            assignee: "maria",
            completed: false,
            createdAt: "2023-12-01"
        },
        {
            id: 5,
            title: "Review Marketing Campaign Performance",
            description: "Analyze Q4 marketing campaign metrics and prepare optimization recommendations",
            dueDate: "2023-12-20",
            priority: "low",
            category: "marketing",
            tags: ["marketing", "analytics", "optimization"],
            assignee: "david",
            completed: false,
            createdAt: "2023-11-29"
        },
        {
            id: 6,
            title: "Update Security Protocols",
            description: "Review and update company security protocols in accordance with new regulations",
            dueDate: "2023-12-10",
            priority: "critical",
            category: "development",
            tags: ["security", "compliance", "protocols"],
            assignee: "alex",
            completed: false,
            createdAt: "2023-11-27"
        },
        {
            id: 7,
            title: "Plan Company Holiday Party",
            description: "Coordinate venue, catering, and activities for annual company holiday celebration",
            dueDate: "2023-12-22",
            priority: "low",
            category: "personal",
            tags: ["event", "holiday", "celebration"],
            assignee: "sarah",
            completed: true,
            createdAt: "2023-11-20"
        },
        {
            id: 8,
            title: "Software Deployment",
            description: "Deploy new version of customer portal to production environment",
            dueDate: "2023-12-08",
            priority: "high",
            category: "development",
            tags: ["deployment", "software", "production"],
            assignee: "james",
            completed: true,
            createdAt: "2023-11-22"
        }
    ];
    
    // Task assignee mapping
    const assigneeMap = {
        "alex": "Alex Morgan",
        "sarah": "Sarah Chen", 
        "james": "James Wilson",
        "maria": "Maria Garcia",
        "david": "David Kim",
        "unassigned": "Unassigned"
    };
    
    // DOM Elements
    const taskView = document.getElementById('task-view');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskModal = document.getElementById('task-modal');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const taskForm = document.getElementById('task-form');
    const categoryItems = document.querySelectorAll('.category-item');
    const sortBySelect = document.getElementById('sort-by');
    const priorityFilter = document.getElementById('priority-filter');
    const dateRangeFilter = document.getElementById('date-range');
    const taskSearch = document.getElementById('task-search');
    const viewButtons = document.querySelectorAll('.view-btn');
    const exportTasksBtn = document.getElementById('export-tasks-btn');
    const statsModal = document.getElementById('stats-modal');
    const watchDemoBtn = document.getElementById('watch-demo-btn');
    const loginBtn = document.getElementById('login-btn');
    const getStartedBtn = document.getElementById('get-started-btn');
    
    // Current filter state
    let currentFilter = 'all';
    let currentSort = 'due-date';
    let currentPriority = 'all';
    let currentDateRange = 'today';
    let currentView = 'list';
    let searchQuery = '';
    
    // Initialize tasks
    renderTasks();
    updateTaskStats();
    updateTaskCounts();
    
    // Set default due date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    document.getElementById('task-due-date').value = tomorrow.toISOString().split('T')[0];
    
    // Category Filtering
    categoryItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all categories
            categoryItems.forEach(cat => cat.classList.remove('active'));
            // Add active class to clicked category
            this.classList.add('active');
            
            currentFilter = this.getAttribute('data-category');
            renderTasks();
        });
    });
    
    // Sort change handler
    sortBySelect.addEventListener('change', function() {
        currentSort = this.value;
        renderTasks();
    });
    
    // Priority filter handler
    priorityFilter.addEventListener('change', function() {
        currentPriority = this.value;
        renderTasks();
    });
    
    // Date range filter handler
    dateRangeFilter.addEventListener('change', function() {
        currentDateRange = this.value;
        renderTasks();
    });
    
    // Search functionality
    taskSearch.addEventListener('input', function() {
        searchQuery = this.value.toLowerCase();
        renderTasks();
    });
    
    // View toggle
    viewButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const view = this.getAttribute('data-view');
            
            // Update active button
            viewButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            currentView = view;
            renderTasks();
        });
    });
    
    // Task Modal
    addTaskBtn.addEventListener('click', function() {
        openModal(taskModal);
    });
    
    // Export tasks
    exportTasksBtn.addEventListener('click', function() {
        exportTasksToCSV();
    });
    
    // Watch demo button
    if (watchDemoBtn) {
        watchDemoBtn.addEventListener('click', function() {
            showNotification('Demo video would play in a real implementation', 'info');
        });
    }
    
    // Login button
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            showNotification('Login modal would open in a real implementation', 'info');
        });
    }
    
    // Get started button
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', function() {
            showNotification('Registration process would start in a real implementation', 'info');
        });
    }
    
    // Close modal buttons
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
            if (modal.id === 'task-modal') {
                taskForm.reset();
                // Reset due date to tomorrow
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                document.getElementById('task-due-date').value = tomorrow.toISOString().split('T')[0];
            }
        });
    });
    
    // Close modal when clicking outside
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this);
                if (this.id === 'task-modal') {
                    taskForm.reset();
                }
            }
        });
    });
    
    // Add new task
    taskForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const title = document.getElementById('task-title').value;
        const description = document.getElementById('task-description').value;
        const dueDate = document.getElementById('task-due-date').value;
        const priority = document.getElementById('task-priority').value;
        const category = document.getElementById('task-category').value;
        const assignee = document.getElementById('task-assignee').value;
        const tagsInput = document.getElementById('task-tags').value;
        
        const tags = tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag);
        
        const newTask = {
            id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
            title,
            description,
            dueDate,
            priority,
            category,
            tags,
            assignee,
            completed: false,
            createdAt: new Date().toISOString().split('T')[0]
        };
        
        tasks.unshift(newTask);
        renderTasks();
        updateTaskStats();
        updateTaskCounts();
        
        // Close modal and reset form
        closeModal(taskModal);
        taskForm.reset();
        
        // Reset due date to tomorrow
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        document.getElementById('task-due-date').value = tomorrow.toISOString().split('T')[0];
        
        // Show success message
        showNotification('Task created successfully!', 'success');
    });
    
    // Render tasks based on current filters and view
    function renderTasks() {
        let filteredTasks = [...tasks];
        
        // Apply category filter
        if (currentFilter !== 'all') {
            if (currentFilter === 'pending') {
                filteredTasks = filteredTasks.filter(task => !task.completed);
            } else if (currentFilter === 'in-progress') {
                filteredTasks = filteredTasks.filter(task => !task.completed);
            } else if (currentFilter === 'completed') {
                filteredTasks = filteredTasks.filter(task => task.completed);
            } else if (currentFilter === 'high') {
                filteredTasks = filteredTasks.filter(task => task.priority === 'high' || task.priority === 'critical');
            } else if (currentFilter === 'today') {
                const today = new Date().toISOString().split('T')[0];
                filteredTasks = filteredTasks.filter(task => task.dueDate === today);
            } else if (currentFilter === 'overdue') {
                const today = new Date().toISOString().split('T')[0];
                filteredTasks = filteredTasks.filter(task => task.dueDate < today && !task.completed);
            }
        }
        
        // Apply priority filter
        if (currentPriority !== 'all') {
            filteredTasks = filteredTasks.filter(task => task.priority === currentPriority);
        }
        
        // Apply date range filter
        if (currentDateRange !== 'all') {
            const today = new Date();
            let startDate;
            
            if (currentDateRange === 'today') {
                startDate = new Date(today);
            } else if (currentDateRange === 'week') {
                startDate = new Date(today);
                startDate.setDate(today.getDate() - 7);
            } else if (currentDateRange === 'month') {
                startDate = new Date(today);
                startDate.setMonth(today.getMonth() - 1);
            }
            
            filteredTasks = filteredTasks.filter(task => {
                const taskDate = new Date(task.dueDate);
                return taskDate >= startDate && taskDate <= today;
            });
        }
        
        // Apply search filter
        if (searchQuery) {
            filteredTasks = filteredTasks.filter(task => 
                task.title.toLowerCase().includes(searchQuery) || 
                task.description.toLowerCase().includes(searchQuery) ||
                task.tags.some(tag => tag.toLowerCase().includes(searchQuery))
            );
        }
        
        // Apply sorting
        filteredTasks.sort((a, b) => {
            if (currentSort === 'due-date') {
                return new Date(a.dueDate) - new Date(b.dueDate);
            } else if (currentSort === 'priority') {
                const priorityOrder = { critical: 1, high: 2, medium: 3, low: 4 };
                return priorityOrder[a.priority] - priorityOrder[b.priority];
            } else if (currentSort === 'name') {
                return a.title.localeCompare(b.title);
            } else if (currentSort === 'created') {
                return new Date(b.createdAt) - new Date(a.createdAt);
            }
            return 0;
        });
        
        // Clear current view
        taskView.innerHTML = '';
        
        if (filteredTasks.length === 0) {
            taskView.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-tasks"></i>
                    <h3>No tasks found</h3>
                    <p>${searchQuery ? 'Try a different search term' : 'Create a new task to get started'}</p>
                    ${!searchQuery ? '<button class="btn btn-primary mt-3" id="add-task-empty">Add Task</button>' : ''}
                </div>
            `;
            
            // Add event listener to the empty state button
            const emptyStateBtn = document.getElementById('add-task-empty');
            if (emptyStateBtn) {
                emptyStateBtn.addEventListener('click', function() {
                    openModal(taskModal);
                });
            }
            
            return;
        }
        
        // Render based on current view
        if (currentView === 'list') {
            renderListView(filteredTasks);
        } else if (currentView === 'board') {
            renderBoardView(filteredTasks);
        } else if (currentView === 'calendar') {
            renderCalendarView(filteredTasks);
        }
    }
    
    // Render list view
    function renderListView(tasks) {
        const taskList = document.createElement('div');
        taskList.className = 'task-list';
        
        tasks.forEach(task => {
            const taskElement = createTaskElement(task);
            taskList.appendChild(taskElement);
        });
        
        taskView.appendChild(taskList);
    }
    
    // Render board view (Kanban style)
    function renderBoardView(tasks) {
        const boardContainer = document.createElement('div');
        boardContainer.className = 'task-board';
        boardContainer.innerHTML = `
            <div class="board-columns">
                <div class="board-column">
                    <h4>To Do <span class="column-count">${tasks.filter(t => !t.completed && t.priority !== 'high').length}</span></h4>
                    <div class="column-content" data-status="todo"></div>
                </div>
                <div class="board-column">
                    <h4>In Progress <span class="column-count">${tasks.filter(t => !t.completed && t.priority === 'high').length}</span></h4>
                    <div class="column-content" data-status="in-progress"></div>
                </div>
                <div class="board-column">
                    <h4>Review <span class="column-count">${tasks.filter(t => t.completed && new Date(t.dueDate) > new Date()).length}</span></h4>
                    <div class="column-content" data-status="review"></div>
                </div>
                <div class="board-column">
                    <h4>Done <span class="column-count">${tasks.filter(t => t.completed).length}</span></h4>
                    <div class="column-content" data-status="done"></div>
                </div>
            </div>
        `;
        
        // Style for board columns
        const style = document.createElement('style');
        style.textContent = `
            .task-board {
                height: 100%;
            }
            .board-columns {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 20px;
                height: 100%;
            }
            .board-column {
                background-color: var(--bg-lighter);
                border-radius: var(--radius-lg);
                padding: 20px;
                display: flex;
                flex-direction: column;
            }
            .board-column h4 {
                margin-bottom: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-bottom: 15px;
                border-bottom: 2px solid var(--border-color);
            }
            .column-count {
                background-color: var(--primary-color);
                color: white;
                padding: 4px 10px;
                border-radius: var(--radius-full);
                font-size: 0.8rem;
                font-weight: 700;
            }
            .column-content {
                flex: 1;
                overflow-y: auto;
                display: flex;
                flex-direction: column;
                gap: 15px;
            }
            .board-task {
                background-color: var(--bg-white);
                border-radius: var(--radius-md);
                padding: 15px;
                box-shadow: var(--shadow-sm);
                cursor: move;
                transition: var(--transition);
            }
            .board-task:hover {
                box-shadow: var(--shadow-md);
                transform: translateY(-2px);
            }
            .board-task h5 {
                margin-bottom: 8px;
                font-size: 0.95rem;
            }
            .board-task p {
                font-size: 0.85rem;
                color: var(--text-light);
                margin-bottom: 10px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
            .board-task-meta {
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 0.75rem;
                color: var(--text-lighter);
            }
            @media (max-width: 1200px) {
                .board-columns {
                    grid-template-columns: repeat(2, 1fr);
                }
            }
            @media (max-width: 768px) {
                .board-columns {
                    grid-template-columns: 1fr;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Add tasks to columns
        tasks.forEach(task => {
            const taskElement = createBoardTaskElement(task);
            const columnContent = boardContainer.querySelector(`.column-content[data-status="${getTaskStatus(task)}"]`);
            if (columnContent) {
                columnContent.appendChild(taskElement);
            }
        });
        
        taskView.appendChild(boardContainer);
    }
    
    // Render calendar view
    function renderCalendarView(tasks) {
        const calendarContainer = document.createElement('div');
        calendarContainer.className = 'task-calendar';
        
        // Get current month
        const now = new Date();
        const month = now.getMonth();
        const year = now.getFullYear();
        
        // Generate calendar HTML
        calendarContainer.innerHTML = `
            <div class="calendar-header">
                <button class="btn-icon prev-month"><i class="fas fa-chevron-left"></i></button>
                <h3>${now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h3>
                <button class="btn-icon next-month"><i class="fas fa-chevron-right"></i></button>
            </div>
            <div class="calendar-grid">
                <div class="calendar-day-name">Sun</div>
                <div class="calendar-day-name">Mon</div>
                <div class="calendar-day-name">Tue</div>
                <div class="calendar-day-name">Wed</div>
                <div class="calendar-day-name">Thu</div>
                <div class="calendar-day-name">Fri</div>
                <div class="calendar-day-name">Sat</div>
            </div>
        `;
        
        // Style for calendar
        const style = document.createElement('style');
        style.textContent = `
            .task-calendar {
                background-color: var(--bg-white);
                border-radius: var(--radius-lg);
                padding: 20px;
                box-shadow: var(--shadow-sm);
            }
            .calendar-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
            }
            .calendar-header h3 {
                margin: 0;
            }
            .calendar-grid {
                display: grid;
                grid-template-columns: repeat(7, 1fr);
                gap: 10px;
            }
            .calendar-day-name {
                text-align: center;
                font-weight: 600;
                color: var(--text-light);
                padding: 10px;
                font-size: 0.9rem;
            }
            .calendar-day {
                min-height: 100px;
                border: 1px solid var(--border-color);
                border-radius: var(--radius-sm);
                padding: 10px;
                background-color: var(--bg-white);
                transition: var(--transition);
            }
            .calendar-day:hover {
                background-color: var(--bg-lighter);
            }
            .calendar-day.empty {
                background-color: var(--bg-lighter);
                border: none;
            }
            .calendar-day-number {
                font-weight: 600;
                margin-bottom: 5px;
                color: var(--text-dark);
            }
            .calendar-day.today .calendar-day-number {
                background-color: var(--primary-color);
                color: white;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
            }
            .calendar-tasks {
                margin-top: 5px;
            }
            .calendar-task {
                background-color: var(--primary-light);
                color: var(--primary-color);
                padding: 3px 6px;
                border-radius: 4px;
                font-size: 0.75rem;
                margin-bottom: 3px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                cursor: pointer;
            }
            .calendar-task:hover {
                background-color: var(--primary-color);
                color: white;
            }
            .calendar-task.high {
                background-color: rgba(231, 76, 60, 0.1);
                color: var(--danger-color);
            }
            .calendar-task.high:hover {
                background-color: var(--danger-color);
                color: white;
            }
            .calendar-task.completed {
                opacity: 0.6;
                text-decoration: line-through;
            }
        `;
        document.head.appendChild(style);
        
        // Generate calendar days
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDay = firstDay.getDay();
        
        const calendarGrid = calendarContainer.querySelector('.calendar-grid');
        
        // Add empty cells for days before the first day of the month
        for (let i = 0; i < startingDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day empty';
            calendarGrid.appendChild(emptyDay);
        }
        
        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            
            // Check if this is today
            const currentDate = new Date();
            if (day === currentDate.getDate() && month === currentDate.getMonth() && year === currentDate.getFullYear()) {
                dayElement.classList.add('today');
            }
            
            dayElement.innerHTML = `
                <div class="calendar-day-number">${day}</div>
                <div class="calendar-tasks" data-day="${day}"></div>
            `;
            
            calendarGrid.appendChild(dayElement);
        }
        
        // Add tasks to calendar
        tasks.forEach(task => {
            const dueDate = new Date(task.dueDate);
            if (dueDate.getMonth() === month && dueDate.getFullYear() === year) {
                const day = dueDate.getDate();
                const dayTasks = calendarContainer.querySelector(`.calendar-tasks[data-day="${day}"]`);
                if (dayTasks) {
                    const taskElement = document.createElement('div');
                    taskElement.className = `calendar-task ${task.priority} ${task.completed ? 'completed' : ''}`;
                    taskElement.textContent = task.title;
                    taskElement.title = `${task.title} - ${task.priority} priority`;
                    taskElement.addEventListener('click', function() {
                        showTaskDetails(task);
                    });
                    dayTasks.appendChild(taskElement);
                }
            }
        });
        
        taskView.appendChild(calendarContainer);
        
        // Add event listeners for month navigation
        const prevMonthBtn = calendarContainer.querySelector('.prev-month');
        const nextMonthBtn = calendarContainer.querySelector('.next-month');
        
        // For demo purposes, we'll just show a notification
        if (prevMonthBtn) {
            prevMonthBtn.addEventListener('click', function() {
                showNotification('Previous month would load in a full implementation', 'info');
            });
        }
        
        if (nextMonthBtn) {
            nextMonthBtn.addEventListener('click', function() {
                showNotification('Next month would load in a full implementation', 'info');
            });
        }
    }
    
    // Create task element for list view
    function createTaskElement(task) {
        const taskDiv = document.createElement('div');
        taskDiv.className = `task-item ${task.completed ? 'completed' : ''} ${task.priority}-priority ${isOverdue(task) ? 'overdue' : ''}`;
        taskDiv.setAttribute('data-id', task.id);
        
        const formattedDate = new Date(task.dueDate).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
        
        const tagsHTML = task.tags && task.tags.length > 0 
            ? `<div class="task-tags">${task.tags.map(tag => `<span class="task-tag">${tag}</span>`).join('')}</div>`
            : '';
        
        const assigneeHTML = task.assignee && task.assignee !== 'unassigned'
            ? `<div class="task-assignee"><i class="fas fa-user"></i> <span>${assigneeMap[task.assignee] || task.assignee}</span></div>`
            : '';
        
        taskDiv.innerHTML = `
            <div class="task-info">
                <div class="task-title">
                    <input type="checkbox" ${task.completed ? 'checked' : ''} class="task-checkbox">
                    <h4>${task.title}</h4>
                </div>
                <p class="task-description">${task.description}</p>
                ${tagsHTML}
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
                    ${assigneeHTML}
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
            editTask(task);
        });
        
        return taskDiv;
    }
    
    // Create task element for board view
    function createBoardTaskElement(task) {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'board-task';
        taskDiv.setAttribute('data-id', task.id);
        taskDiv.setAttribute('draggable', 'true');
        
        const priorityClass = task.priority === 'high' || task.priority === 'critical' ? 'high' : '';
        
        taskDiv.innerHTML = `
            <h5>${task.title}</h5>
            <p>${task.description.substring(0, 60)}${task.description.length > 60 ? '...' : ''}</p>
            <div class="board-task-meta">
                <span class="priority-indicator ${priorityClass}">${task.priority}</span>
                <span>${new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
            </div>
        `;
        
        taskDiv.addEventListener('click', function() {
            showTaskDetails(task);
        });
        
        // Add drag and drop functionality
        taskDiv.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('text/plain', task.id);
            this.classList.add('dragging');
        });
        
        taskDiv.addEventListener('dragend', function() {
            this.classList.remove('dragging');
        });
        
        return taskDiv;
    }
    
    // Get task status for board view
    function getTaskStatus(task) {
        if (task.completed) return 'done';
        if (task.priority === 'high' || task.priority === 'critical') return 'in-progress';
        if (new Date(task.dueDate) < new Date() && !task.completed) return 'review';
        return 'todo';
    }
    
    // Show task details
    function showTaskDetails(task) {
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${task.title}</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="task-detail">
                        <div class="detail-section">
                            <h4>Description</h4>
                            <p>${task.description}</p>
                        </div>
                        <div class="detail-grid">
                            <div class="detail-item">
                                <h5>Due Date</h5>
                                <p>${new Date(task.dueDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            </div>
                            <div class="detail-item">
                                <h5>Priority</h5>
                                <p><span class="priority ${task.priority}">${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</span></p>
                            </div>
                            <div class="detail-item">
                                <h5>Category</h5>
                                <p>${task.category.charAt(0).toUpperCase() + task.category.slice(1)}</p>
                            </div>
                            <div class="detail-item">
                                <h5>Assignee</h5>
                                <p>${assigneeMap[task.assignee] || 'Unassigned'}</p>
                            </div>
                            <div class="detail-item">
                                <h5>Status</h5>
                                <p>${task.completed ? 'Completed' : 'Pending'}</p>
                            </div>
                            <div class="detail-item">
                                <h5>Created</h5>
                                <p>${new Date(task.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                        ${task.tags && task.tags.length > 0 ? `
                        <div class="detail-section">
                            <h4>Tags</h4>
                            <div class="tags-list">${task.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>
                        </div>` : ''}
                        <div class="detail-actions">
                            <button class="btn btn-outline" id="mark-complete">${task.completed ? 'Mark as Incomplete' : 'Mark as Complete'}</button>
                            <button class="btn btn-primary" id="edit-task-detail">Edit Task</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add styles for task detail modal
        const style = document.createElement('style');
        style.textContent = `
            .task-detail {
                padding: 10px;
            }
            .detail-section {
                margin-bottom: 25px;
            }
            .detail-section h4 {
                margin-bottom: 10px;
                color: var(--text-dark);
            }
            .detail-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 20px;
                margin-bottom: 25px;
            }
            .detail-item h5 {
                font-size: 0.9rem;
                color: var(--text-light);
                margin-bottom: 5px;
                font-weight: 600;
            }
            .detail-item p {
                margin-bottom: 0;
                color: var(--text-dark);
            }
            .tags-list {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
            }
            .tag {
                background-color: var(--primary-light);
                color: var(--primary-color);
                padding: 5px 12px;
                border-radius: var(--radius-full);
                font-size: 0.85rem;
                font-weight: 500;
            }
            .detail-actions {
                display: flex;
                gap: 15px;
                margin-top: 30px;
                justify-content: flex-end;
            }
            @media (max-width: 768px) {
                .detail-grid {
                    grid-template-columns: 1fr;
                }
                .detail-actions {
                    flex-direction: column;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Add event listeners
        modal.querySelector('.close-modal').addEventListener('click', function() {
            modal.remove();
            style.remove();
        });
        
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                modal.remove();
                style.remove();
            }
        });
        
        modal.querySelector('#mark-complete').addEventListener('click', function() {
            toggleTaskCompletion(task.id, !task.completed);
            modal.remove();
            style.remove();
        });
        
        modal.querySelector('#edit-task-detail').addEventListener('click', function() {
            modal.remove();
            style.remove();
            editTask(task);
        });
    }
    
    // Toggle task completion
    function toggleTaskCompletion(taskId, completed) {
        const taskIndex = tasks.findIndex(task => task.id === taskId);
        if (taskIndex !== -1) {
            tasks[taskIndex].completed = completed;
            renderTasks();
            updateTaskStats();
            updateTaskCounts();
            
            const status = completed ? 'completed' : 'marked as pending';
            showNotification(`Task ${status}!`, 'success');
        }
    }
    
    // Delete task
    function deleteTask(taskId) {
        if (confirm('Are you sure you want to delete this task?')) {
            tasks = tasks.filter(task => task.id !== taskId);
            renderTasks();
            updateTaskStats();
            updateTaskCounts();
            showNotification('Task deleted successfully!', 'success');
        }
    }
    
    // Edit task
    function editTask(task) {
        openModal(taskModal);
        
        // Populate form with task data
        document.getElementById('task-title').value = task.title;
        document.getElementById('task-description').value = task.description;
        document.getElementById('task-due-date').value = task.dueDate;
        document.getElementById('task-priority').value = task.priority;
        document.getElementById('task-category').value = task.category;
        document.getElementById('task-assignee').value = task.assignee;
        document.getElementById('task-tags').value = task.tags ? task.tags.join(', ') : '';
        
        // Update form submit to edit instead of create
        const form = document.getElementById('task-form');
        const originalSubmit = form.onsubmit;
        
        form.onsubmit = function(e) {
            e.preventDefault();
            
            // Update task
            const taskIndex = tasks.findIndex(t => t.id === task.id);
            if (taskIndex !== -1) {
                tasks[taskIndex].title = document.getElementById('task-title').value;
                tasks[taskIndex].description = document.getElementById('task-description').value;
                tasks[taskIndex].dueDate = document.getElementById('task-due-date').value;
                tasks[taskIndex].priority = document.getElementById('task-priority').value;
                tasks[taskIndex].category = document.getElementById('task-category').value;
                tasks[taskIndex].assignee = document.getElementById('task-assignee').value;
                const tagsInput = document.getElementById('task-tags').value;
                tasks[taskIndex].tags = tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag);
                
                renderTasks();
                updateTaskStats();
                updateTaskCounts();
                
                closeModal(taskModal);
                form.reset();
                form.onsubmit = originalSubmit;
                
                showNotification('Task updated successfully!', 'success');
            }
        };
    }
    
    // Update task counts in sidebar
    function updateTaskCounts() {
        const totalTasks = tasks.length;
        const pendingTasks = tasks.filter(task => !task.completed).length;
        const completedTasks = tasks.filter(task => task.completed).length;
        const highPriorityTasks = tasks.filter(task => task.priority === 'high' || task.priority === 'critical').length;
        
        const today = new Date().toISOString().split('T')[0];
        const todayTasks = tasks.filter(task => task.dueDate === today).length;
        
        const overdueTasks = tasks.filter(task => isOverdue(task)).length;
        
        // Update counts in sidebar
        document.querySelector('.category-item[data-category="all"] .task-count').textContent = totalTasks;
        document.querySelector('.category-item[data-category="pending"] .task-count').textContent = pendingTasks;
        document.querySelector('.category-item[data-category="completed"] .task-count').textContent = completedTasks;
        document.querySelector('.category-item[data-category="high"] .task-count').textContent = highPriorityTasks;
        document.querySelector('.category-item[data-category="today"] .task-count').textContent = todayTasks;
        document.querySelector('.category-item[data-category="overdue"] .task-count').textContent = overdueTasks;
        
        // Update progress bar
        const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
        const progressFill = document.querySelector('.progress-fill');
        if (progressFill) {
            progressFill.style.width = `${progressPercent}%`;
            document.querySelector('.progress-text span:first-child').textContent = `${progressPercent}% Complete`;
            document.querySelector('.progress-text span:last-child').textContent = `${completedTasks} of ${totalTasks} tasks`;
        }
    }
    
    // Update task statistics
    function updateTaskStats() {
        const completedTasks = tasks.filter(task => task.completed).length;
        const inProgressTasks = tasks.filter(task => !task.completed && (task.priority === 'high' || task.priority === 'critical')).length;
        const pendingTasks = tasks.filter(task => !task.completed && task.priority !== 'high' && task.priority !== 'critical').length;
        const overdueTasks = tasks.filter(task => isOverdue(task)).length;
        
        // Update stat cards
        document.querySelectorAll('.stat-card')[0].querySelector('h3').textContent = completedTasks;
        document.querySelectorAll('.stat-card')[1].querySelector('h3').textContent = inProgressTasks;
        document.querySelectorAll('.stat-card')[2].querySelector('h3').textContent = pendingTasks;
        document.querySelectorAll('.stat-card')[3].querySelector('h3').textContent = overdueTasks;
    }
    
    // Check if task is overdue
    function isOverdue(task) {
        if (task.completed) return false;
        const today = new Date().toISOString().split('T')[0];
        return task.dueDate < today;
    }
    
    // Export tasks to CSV
    function exportTasksToCSV() {
        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += "ID,Title,Description,Due Date,Priority,Category,Assignee,Status,Tags\n";
        
        tasks.forEach(task => {
            const row = [
                task.id,
                `"${task.title}"`,
                `"${task.description}"`,
                task.dueDate,
                task.priority,
                task.category,
                assigneeMap[task.assignee] || task.assignee,
                task.completed ? "Completed" : "Pending",
                task.tags ? task.tags.join("; ") : ""
            ].join(",");
            
            csvContent += row + "\n";
        });
        
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `tasks_export_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showNotification('Tasks exported successfully!', 'success');
    }
    
    // Open modal
    function openModal(modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Close modal
    function closeModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // Show notification
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Style the notification
        notification.style.cssText = `
            position: fixed;
            top: 30px;
            right: 30px;
            padding: 16px 24px;
            border-radius: var(--radius-md);
            box-shadow: var(--shadow-lg);
            z-index: 3000;
            transform: translateX(150%);
            transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55);
            font-weight: 500;
            max-width: 350px;
            display: flex;
            align-items: center;
            gap: 12px;
        `;
        
        // Set color based on type
        if (type === 'success') {
            notification.style.backgroundColor = 'var(--success-color)';
            notification.style.color = 'white';
            notification.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
        } else if (type === 'error') {
            notification.style.backgroundColor = 'var(--danger-color)';
            notification.style.color = 'white';
            notification.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
        } else {
            notification.style.backgroundColor = 'var(--info-color)';
            notification.style.color = 'white';
            notification.innerHTML = `<i class="fas fa-info-circle"></i> ${message}`;
        }
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Remove after 4 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(150%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 400);
        }, 4000);
        
        // Allow click to dismiss
        notification.addEventListener('click', function() {
            notification.style.transform = 'translateX(150%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        });
    }
    
    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            // In a real app, you would send this to your backend
            showNotification(`Thank you for subscribing with ${email}!`, 'success');
            this.reset();
        });
    }
    
    // Initialize tooltips
    function initTooltips() {
        const tooltips = document.querySelectorAll('[data-tooltip]');
        tooltips.forEach(element => {
            element.addEventListener('mouseenter', function() {
                const tooltip = document.createElement('div');
                tooltip.className = 'tooltip';
                tooltip.textContent = this.getAttribute('data-tooltip');
                tooltip.style.cssText = `
                    position: absolute;
                    background-color: var(--bg-dark);
                    color: white;
                    padding: 8px 12px;
                    border-radius: var(--radius-sm);
                    font-size: 0.8rem;
                    white-space: nowrap;
                    z-index: 10000;
                    pointer-events: none;
                    box-shadow: var(--shadow-md);
                `;
                
                const rect = this.getBoundingClientRect();
                tooltip.style.top = `${rect.top - 40}px`;
                tooltip.style.left = `${rect.left + rect.width / 2}px`;
                tooltip.style.transform = 'translateX(-50%)';
                
                document.body.appendChild(tooltip);
                this._tooltip = tooltip;
            });
            
            element.addEventListener('mouseleave', function() {
                if (this._tooltip) {
                    this._tooltip.remove();
                    this._tooltip = null;
                }
            });
        });
    }
    
    // Initialize tooltips
    initTooltips();
    
    // Add some demo interactions
    console.log('Nexus Dynamics Business Website loaded successfully!');
    console.log('Try creating, editing, and filtering tasks in the task manager.');
});
