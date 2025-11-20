/*
Отримання та відображення завдання з API:
Редагувати App компонент, 
який виконує запит до API https://jsonplaceholder.typicode.com/todos/1
і відображає дані завдання.

Вимоги:
- Використати useEffect для виконання запиту при першому рендері компонента.
- Створити три стани за допомогою useState:
    - task — для збереження отриманого завдання;
    - error — для обробки помилок при запиті;
    - loading — для індикації завантаження даних.
- Відобразити:
    - повідомлення про завантаження, коли loading === true;
    - повідомлення про помилку, якщо error не порожній;
    - інформацію про завдання, коли task успішно отриманий.
- Використати fetch для запиту до API.
*/

import React from 'react';
import './App.css';

function App() {
    const [task, setTask] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState('');

    React.useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos/1')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Помилка при завантаженні');
                }
                return response.json();
            })
            .then(data => {
                setTask(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    return (
        <div className='container'>
            <h1>React Homework</h1>

            {loading && <p>Завантаження...</p>}
            {error && <p style={{ color: 'red' }}>Помилка: {error}</p>}
            {task && (
                <div>
                    <h2>Завдання #{task.id}</h2>
                    <p>Назва: {task.title}</p>
                    <p>Статус: {task.completed ? 'Виконано' : 'Не виконано'}</p>
                </div>
            )}
        </div>
    );
}

export default App;


