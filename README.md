Задача:

Поля формы:
1. Имя
2. Email
3. Телефон
4. 3 чекбокса
5. Раскрывающийся список с одиночным выбором
6. 2 радиокнопки: если выбрана 2-я показывать поле для ввода числа
7. Файл: не более 5mb

Валидация полей:
1. Имя: не должно содержать символов (кроме дефиса) и цифр, убирать пробелы в начале и в конце
2. Email проверять что адрес почты валидный
3. Телефон: маска ввода, проверять что введен сотовый телефон актуальный для РФ (+7 или 8)
4. Число от 1 до 100

Ошибка валидации при отправке:
1. Инпут в красной рамке
2. Сообщение под инпутом (данные неверны)

Успешная валидация:
1. Записывать значения полей в get-запрос
2. Модальное окно: “Данные отправлены”, через 3 секунды закрывать окно
3. Post-запрос, вывести отправленные данные в блок под формой, обновлять при каждой отправке

Выполнить с помощью:
1. JQuery
2. Native JavaScript
    - XMLHttpRequest
    - Fetch
