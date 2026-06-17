
        let lists = [];

        
        loadTasks();

        document.querySelector('.add').addEventListener('click', addTask);
        document.querySelector('input').addEventListener('keydown', (e) => {
            if (e.key === 'Enter') addTask();
        });

        function addTask() {
            const input = document.querySelector('input');
            let text = input.value;
            if (text.trim() === '') {
                return alert('Please enter valid input');
            }
            let task = {
                id: Date.now().toString(36),
                data: text,
                completed: false
            };
            lists.push(task);
            renderTask(task);

           
            saveTasks();

            input.value = '';
        }

        function renderTask(task) {
            let container = document.querySelector('.task-container');

            const item = document.createElement("div");
            item.classList.add("task-item");
            item.dataset.id = task.id;

            item.innerHTML = `
        <div class="text${task.completed ? ' completed' : ''}">${task.data}</div>
        <button class="btn remove">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EA3323">
                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
            </svg>
        </button>
    `;

            item.querySelector('.remove').addEventListener('click', () => removeTask(task.id, item));
            item.addEventListener('click', (e) => {
                if (e.target !== item.querySelector('.remove') && !e.target.closest('.remove')) {
                    toggleComplete(task);
                }
            });

            container.appendChild(item);
        }

        function removeTask(id, element) {
            lists = lists.filter(task => task.id !== id);
            element.remove();

            saveTasks();
        }

        function toggleComplete(task) {
            task.completed = !task.completed;
            const textDiv = document.querySelector(`[data-id="${task.id}"] .text`);
            textDiv.classList.toggle('completed');

            saveTasks();
        }


        function saveTasks() {
            localStorage.setItem('myTodoList', JSON.stringify(lists));
        }

        function loadTasks() {
            const savedData = localStorage.getItem('myTodoList');
            if (savedData) {
                lists = JSON.parse(savedData);
                lists.forEach(task => renderTask(task));
            }
        }

