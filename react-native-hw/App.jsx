/*
Динамічне отримання та відображення списку завдань:
Напишіть код прямо у Expo Snack (https://snack.expo.dev/) 
та після перевірки вставте результат у ваш поточний файл.

Вимоги:
- Використати React Native компоненти:
    - TextInput для введення числа — кількості завдань для запиту;
    - Button для виконання запиту;
    - FlatList для відображення списку завдань.
- Керувати станом за допомогою useState та useEffect:
    - tasks — масив отриманих завдань;
    - error — для обробки помилок.
    - loading — для індикації завантаження;
- При натисканні кнопки робити запит на API https://jsonplaceholder.typicode.com/todos?_limit=<число з TextInput> та оновлювати список tasks.
  Приклад запиту: якщо у TextInput введено 5, URL буде https://jsonplaceholder.typicode.com/todos?_limit=5
- Відобразити:
    - повідомлення про завантаження, коли loading === true;
    - повідомлення про помилку, якщо error не порожній;
    - список завдань через FlatList, показуючи title кожного елемента.
*/


import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, ActivityIndicator, StyleSheet } from 'react-native';

export default function App() {
  const [numTasks, setNumTasks] = useState('');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchTasks = async () => {
    if (!numTasks || isNaN(numTasks)) {
      setError('Будь ласка, введіть число');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos?_limit=${numTasks}`);
      if (!response.ok) throw new Error('Помилка при завантаженні');
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Динамічне завантаження завдань</Text>
      <TextInput
        style={styles.input}
        placeholder="Введіть кількість завдань"
        keyboardType="numeric"
        value={numTasks}
        onChangeText={setNumTasks}
      />
      <Button title="Завантажити завдання" onPress={fetchTasks} />

      {loading && <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />}
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.title}</Text>
          </View>
        )}
        style={{ marginTop: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 40 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10 },
  error: { color: 'red', marginTop: 10 },
  item: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
});


