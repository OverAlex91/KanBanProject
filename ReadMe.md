# Дипломная работа над Канбан-доской

## Запуск проекта
 * В проект добавлен таск-менеджер gulp. Поэтому для запуска проекта необходимо ввести команду:
```
gulp serve 
```

## Задачи, которые удалось реализовать:
### 1. Добавление задачи 
***реализовано полностью***
  * Название карточки вводится в поле ввода, поле обязательно для заполнения. 
  *	Чтобы добавить новую карточку с задачей на доску, надо ввести текст в поле и нажать кнопку «Добавить». 
  *	Новая карточка добавляется в конец списка «Бэклог» с текстом, который был введён в поле. 
  *	Поле ввода после добавления карточки в бэклог очищается. 
  
### 2.Редактирование задачи 
***реализовано полностью***
*	При наведении на карточку появляется иконка с карандашом.
*	По клику на иконку ставится фокус в название задачи, появляется возможность редактировать текст. 
*	При нажатии на ENTER фокус с текста убирается, режим редактирования завершается, в описании сохраняется введённый текст.

### 3. Перемещение задач 
***для перемешения задач после добавления элемента необходима перезагрузка страницы***
*	Любую из задач можно перемещать внутри колонки или между колонками ***сделано***
*	При подъёме карточки, она исчезает из колонки, остальные карточки смещаются, занимая свободное место. ***сделано***
*	При поднесении карточки к возможному месту дропа, задачи рядом раздвигаются, освобождая место для карточки. Появляется серый блочок с контурной рамкой, который показывает возможное расположение карточки. ***сделано***
*	После дропа цвет на карточке слева становится такой же, как и у остальных в колонке.***сделано***
*	Если из колонки перенесли все карточки и она стала пустой, в колонке после названия появляется серый блочок с текстом «Перетащите карточку». ***удалось реализовать частично***

### 4. Удаление задач 
*	По клику на кнопку «Очистить» все карточки из колонки «Корзина» удаляются без возможности восстановления. ***не реализовано***
*	Если корзина пуста, кнопка «Очистить» блокируется и появляется серый блочок с информацией о том, что корзина сейчас пуста (тот же блок, что и в пустых колонках, только с текстом «Корзина пуста». ***сделано***


## Важные задачи которые необходимо сделать:

* Реализовать перемещение между массивами
* Реализовать удаление задач

