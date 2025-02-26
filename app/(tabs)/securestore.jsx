import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import * as SecureStore from "expo-secure-store";

const StorageExample = () => {
  const [tempData, setTempData] = useState("");
  const [data, setData] = useState("");
  const [storedData, setStoredData] = useState("");

  // Función para guardar datos en SecureStore
  const saveData = async (key, value) => {
    try {
      await SecureStore.setItemAsync(key, value);
      Alert.alert("Éxito", "Dato guardado correctamente.");
      setTempData(data);
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar el dato.");
    }
  };

  // Función para recuperar datos de SecureStore
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

  // Función para eliminar datos de SecureStore
  const deleteData = async (key) => {
    try {
      await SecureStore.deleteItemAsync(key);
      setStoredData("");
      Alert.alert("Eliminado", "Dato eliminado correctamente.");
    } catch (error) {
      Alert.alert("Error", "No se pudo eliminar el dato.");
    }
  };

  // Al iniciar la app se carga el dato almacenado con la clave "userData"
  useEffect(() => {
    loadData("userData");
  }, []);

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

export default StorageExample;
