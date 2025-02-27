# Actividad 05 ➖ Manejo de datos descripcion 


En esta actividad se implementaron 2 ejemplos de manejo de datos en una App de Expo estos son **SecureStore** y **SQLite**

1. Vamos a comenzar con **SecureStore**
    - Lo primero que se realizo fue instalar la dependencia de SecureStore la cual es
      ```bash
      npx expo install expo-secure-store
      ```
    - Luego lo importamos al archivo SecureStore.jsx
      ```jsx
      import * as SecureStore from "expo-secure-store";
      ```
      
    - Ahora que ya tenemos estos pasos empezamos a crear nustras funciones que hacen lo siguiente: Crear un valor, Cargar el valor y Eliminar un valor.\
      \
      🟣 **Crear un valor**
      ```jsx
      const saveData = async (key, value) => {
        try {
          await SecureStore.setItemAsync(key, value);
          Alert.alert("Éxito", "Dato guardado correctamente.");
          setTempData(data);
        } catch (error) {
          Alert.alert("Error", "No se pudo guardar el dato.");
        }
      };
      ```
      
      🟣 **Cargar un valor**
      ```jsx
      const loadData = async (key) => {
        try {
          const result = await SecureStore.getItemAsync(key);
          if (result) {
            setStoredData(result);
            Alert.alert("Dato recuperado", result);
          } else {
            Alert.alert("Aviso", "No hay datos almacenados con esa clave.");
          }
        } catch (error) {
          Alert.alert("Error", "No se pudo recuperar el dato.");
        }
      };
      ```
      
       🟣 **Eliminar un valor**
      ```jsx
      const deleteData = async (key) => {
        try {
          await SecureStore.deleteItemAsync(key);
          setStoredData("");
          Alert.alert("Eliminado", "Dato eliminado correctamente.");
        } catch (error) {
          Alert.alert("Error", "No se pudo eliminar el dato.");
        }
      };
      ```
      
    - Este valor es agregado a la clave `userdata`, `userdata` se carga al momento de iniciar la App
      ```jsx
      useEffect(() => {
        loadData("userData");
      }, []);
      ```
    - Lo que sigue es llamar a las funciones para que podamos usarlas
      ```jsx
      return (
          <View style={{ padding: 20 }}>
            <Text>Ingresa un dato:</Text>
            <TextInput
              value={data}
              onChangeText={setData}
              style={{ borderWidth: 1, marginVertical: 10, padding: 5 }}
            />
            <Button
              title="Guardar Dato"
              onPress={() => {
                saveData("userData", data);
              }}
            />
            <Button
              title="Cargar Dato"
              onPress={() => loadData("userData")}
            />
            <Button
              title="Eliminar Dato"
              onPress={() => deleteData("userData")}
            />
            {storedData ? <Text>Dato guardado: {storedData}</Text> : null}
            <Text>Dato Temporal: {tempData}</Text>
          </View>
          
        );
      };
      ```
    - Y con esto finaliza la parte de **SecureStore**
  
2. Comenzamos con la parte de **SQLite**
    - Lo primero que hay que hacer es instalar la dependencia de SQLite
      ```bash      
      npx expo install expo-sqlite
      ```
    - Seguido de lo anterior, importamos a nuestro archivo sqlite.jsx lo siguiente
      ```jsx
      import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
      ```
    - Ahora lo que hacemos es crear la base de datos `test.db`
      ```jsx
      export default function App() {
        return (
          <View style={styles.container}>
            <SQLiteProvider databaseName="test.db" onInit={migrateDbIfNeeded}>
              <Header />
              <Content />
            </SQLiteProvider>
          </View>
        );
      }      
      ```
    - Ahora creamos nuestra tabla e insertamos nustros datos
      ```jsx
      async function migrateDbIfNeeded(db) {
        const DATABASE_VERSION = 1;
        let { user_version: currentDbVersion } = await db.getFirstAsync('PRAGMA user_version');
        if (currentDbVersion >= DATABASE_VERSION) {
          return;
        }
        if (currentDbVersion === 0) {
          await db.execAsync(`
            PRAGMA journal_mode = 'wal';
            CREATE TABLE todos (id INTEGER PRIMARY KEY NOT NULL, value TEXT NOT NULL, intValue INTEGER);
          `);
          await db.runAsync('INSERT INTO todos (value, intValue) VALUES (?, ?)', 'hello', 1);
          await db.runAsync('INSERT INTO todos (value, intValue) VALUES (?, ?)', 'world', 2);
          currentDbVersion = 1;
        }
        await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
      }
      ```
    - Realizamos un Select a nuestra tabla para guardar los datos
      ```jsx
      export function Content() {
        const db = useSQLiteContext();
        const [todos, setTodos] = useState([]);
      
        useEffect(() => {
          async function setup() {
            const result = await db.getAllAsync('SELECT * FROM todos');
            setTodos(result);
          }
          setup();
        }, []);
      ```
    - Y ultimo mostramos los datos en pantalla
      ```jsx
        return (
          <View style={styles.contentContainer}>
            {todos.map((todo, index) => (
              <View style={styles.todoItemContainer} key={index}>
                <Text>{todo.intValue} - {todo.value}</Text>
              </View>
            ))}
          </View>
        );
      }
      ```

      ## Gracias por ver! ➖ Diego Ramirez 🤠
      






      
