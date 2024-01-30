
## Для роботи локально додати до адреси 

```
    ?id=2324&type=flat
```

#### Вимоги до розробки

- Node.js 18+ версія, якщо встановлена інша версія - для перемикання можна використовувати [nvm](https://github.com/nvm-sh/nvm "nvm")

### Config

**[Config file](https://github.com/Dron2019/smarto-booking-online/blob/main/src/config.json "Config file")**

|  Властивість | Опис  |
| ------------ | ------------ |
|  **DISABLE_DISCOUNT** |  Відключення етапу "Запит на знижку" |
|  **year_annual_income_percent** |  значення для рахування орієнтовного річного доходу (відсоток / 100) |
|  **project_title** | Назва проекту для виводу в модулі  |
| **logo_src**  | Логотип проекту (серверний шлях)  |
| **manager{}**  |  Контакти менджера |
| manager.name  | Ім'я  |
| manager.phone  |  Телефон |
| **pdf{}**  | Налаштування ПФД квитанції  |
|  pdf.background_color | Колір фону  |
|  **dashboardPortalSelector** |  Селектор елементу поза модулем, куди буде відмальовуватися Інформація про приміщення  |
|  **callBookingFormSelector** | Селектор елементу поза модулем, куди буде відмальовуватися посилання на початок бронювання/запиту на знижку  |
| **currencies**{}  | Об'єкт з символами валют  |
| **statuses**{}  | Опис статусів приміщення(актуальні можна брати з девбейзу, який буд працювати з цим модулем)  |
| **statuses** element  |   |
| text  |  Підпис статусу  |
|  color | Колір статусу  |
| **BOOKING_REUSULT_NEGATIVE_STATUSES** | массив негативних відповідей при перевірці статусу бронювання |
| **BOOKING_REUSULT_POSITIVE_STATUSES** | массив позитивних відповідей при перевірці статусу бронювання |
| **form[]** | Поля для форми |

```
{
            "type": "text", // text |phone | checkbox
            "name": "name",
            "label_key": "form.name", // ключ i18n для перекладів (не впроваджено)
            "label": "Ім'я", // Підпис
            "is_required": true, 
            "invalid_message": "Введіть ім'я", // Підпис, коли не заповнене поле
            "value": "", // значення
            "input_pattern": "[^a-zA-Z\\s]*", //регулярний вираз яки заміняє вибрані символи, які відповідають виразу, на пустий рядок
             "validationExspression": "[0-9a-zA-Z]{4,}" //Регулярний вираз для перевірки чи валідне поле
},
```

## Routing

Для переключення сторінок в модулі використовується 

**HashRouter** 

**[react-router-dom](https://reactrouter.com/en/main/start/tutorial "react-router-dom")**

**[Роути модуля](https://github.com/Dron2019/smarto-booking-online/blob/main/src/routes.jsx "routes.jsx")**

Компоненти для роутів прописуються у **[App.jsx](https://github.com/Dron2019/smarto-booking-online/blob/main/src/App.jsx "App.jsx")**

Для старту роботи роутера: 
- у об\`єкт **window** має передаватися event - **historyUpdated** (якщо базовий роутинг відбувається не за допомогою цього модуля - **historyUpdated** має передаватися при кожній зміні адресної строки)
- Url має містити:
        - GET параметри: type=flat id=[id приміщення]

**Якщо параметри відсутні модуль нічого не відмальовує**



## Точка входу

[main.jsx](https://github.com/Dron2019/smarto-booking-online/blob/main/src/main.jsx "main.jsx")

### ** Контент : **
- Глобальні контексти:
ThemeProvider
HashRouter
[LocalHistoryProvider](https://github.com/Dron2019/smarto-booking-online/blob/main/src/contexts/LocalHistory/LocalHistoryContext.jsx "LocalHistoryProvider")
[FlatContextProvider](https://github.com/Dron2019/smarto-booking-online/blob/main/src/contexts/FlatContext/FlatContextProvider.jsx "FlatContextProvider")
[DiscountProvider](https://github.com/Dron2019/smarto-booking-online/blob/main/src/contexts/DiscountContext/DiscountContext.jsx, "DiscountProvider")

- Базовий компонент [App.jsx](https://github.com/Dron2019/smarto-booking-online/blob/main/src/App.jsx "App.jsx")


## Структура модуля

#### Сторінки

[Список](https://github.com/Dron2019/smarto-booking-online/blob/main/src/pages "Список")

#### Компоненти

[Список](https://github.com/Dron2019/smarto-booking-online/blob/main/src/components "Список")