let addTaskInput = document.getElementById('add-task');
let addTaskForm = document.querySelector('.add-task__form');
let taskList = document.querySelector('.taskboard__list');
let tasksLists = document.querySelectorAll('.taskboard__list');

let backlogArr = [];

if (localStorage.getItem('newTask')) {
	backlogArr = JSON.parse(localStorage.getItem('newTask'));
	displayMessages();
};

// создание новой задачи

addTaskForm.addEventListener('submit', function (e) {
	e.preventDefault();
	const newTask = {
		arr: 'backlog',
		data: addTaskInput.value,
		index: backlogArr.length
	};
	document.querySelector('.add-task__form').reset();
	backlogArr.push(newTask);
	localStorage.setItem('newTask', JSON.stringify(backlogArr));
	displayMessages();
});


//создание нового блока для задачи
function displayMessages() {
	let displayMessage = ``;
	backlogArr.forEach(function (item, index) {
		displayMessage += `
<div class="taskboard__item task" draggable="true">
								<div class="task__body">
								<p class="task__view"> ${item.data}</p>
								<input class="task__input" id="${index}" type="text" value="${item.data}">
						</div>
							<button class="task__edit" type="button" aria-label="Изменить"></button>
</div>`;
		taskList.innerHTML = displayMessage;
	});

};

// редактирование элемента по нажатию

const oldTask = document.querySelectorAll('.taskboard__item');


for (let i = 0; i < oldTask.length; i++) {
	const item = oldTask[i];
	const taskInput = item.querySelector('.task__input');
	const taskView = item.querySelector('.task__view');

	item.addEventListener('click', function (e) {
		item.classList.add('task--active');
		item.contentEditable = 'true';
		taskInput.focus();
	});

	item.addEventListener('keydown', function (e) {
		if (e.keyCode === 13) {
			item.classList.remove('task--active');
			taskInput.textContent = taskInput.value;
			taskView.textContent = taskInput.value;
			item.contentEditable = 'false';
		} else {};
	});
};

//отслеживание изменений после редактирования элемента

tasksLists.forEach(changing => {
	changing.addEventListener('change', function (event) {
		let idInput = event.target.getAttribute('id');
		let forView = document.getElementById(idInput);
		let newData = forView.value;
		let allData = JSON.parse(localStorage.getItem('newTask'));
		allData.forEach(function (item) {
			if (idInput == !allData[idInput].index) {} else {
				allData[idInput].data = newData;
				localStorage.setItem('newTask', JSON.stringify(allData));
			}
		});
	});
});


//drag and drop

const taskboardItem = document.querySelectorAll('.task');
const taskboardList = document.querySelectorAll('.taskboard__list');

let draggedItem = null;

for (let i = 0; i < taskboardItem.length; i++) {
	const item = taskboardItem[i];

	item.addEventListener('dragstart', function () {
		draggedItem = item;
		setTimeout(function () {
			item.classList.add('task--dragged');
		}, 0);
	});

	item.addEventListener('dragend', function (e) {
		setTimeout(function () {
			item.classList.remove('task--dragged');
			draggedItem = null;
		}, 0);
	});

	for (let j = 0; j < taskboardList.length; j++) {
		const list = taskboardList[j];
		const emptyTask = list.querySelector(".task--empty");
		list.addEventListener('dragover', function (e) {
			e.preventDefault();
			const afterElements = getDragAfterElement(taskboardList, e.clientY);
			if (afterElements == null) {
				list.appendChild(draggedItem);
			} else {
				list.insertBefore(draggedItem, afterElements);
			};
			if (this.classList.contains("taskboard__list--backlog")) {
				draggedItem.classList.remove('task--processing');
				draggedItem.classList.remove('task--done');
				draggedItem.classList.remove('task--basket');
			} else if (this.classList.contains("taskboard__list--processing")) {
				draggedItem.classList.add('task--processing');
				draggedItem.classList.remove('task--done');
				draggedItem.classList.remove('task--basket');
			} else if (this.classList.contains("taskboard__list--sorted")) {
				draggedItem.classList.remove('task--processing');
				draggedItem.classList.add('task--done');
				draggedItem.classList.remove('task--basket');
			} else if (this.classList.contains("taskboard__list--trash")) {
				draggedItem.classList.remove('task--processing');
				draggedItem.classList.remove('task--done');
				draggedItem.classList.add('task--basket');
			} else {

			}
		});
		list.addEventListener('dragenter', function (e) {
			e.preventDefault();
		});

		list.addEventListener('dragleave', function (e) {
			emptyTask.style.display = 'block';
		});

		list.addEventListener('drop', function (e) {
			emptyTask.style.display = 'none';
		});

		function getDragAfterElement(taskboardList, y) {
			const draggableElements = [...list.querySelectorAll('.taskboard__item')];

			return draggableElements.reduce((closest, child) => {
				const box = child.getBoundingClientRect();
				const offset = y - box.top - box.height / 2;
				if (offset < 0 && offset > closest.offset) {
					return {
						offset: offset,
						element: child
					}
				} else {
					return closest
				}
			}, {
				offset: Number.NEGATIVE_INFINITY
			}).element
		};
	};
};

// попытка реализации удаления элементов

let taskboardListTrash = document.querySelector('.taskboard__list--trash');
let trashButton = document.querySelector('.button--clear');
let taskInBasket = document.querySelectorAll('.task--basket');
trashButton.disabled = true;
