import { useReceitasFetch } from "@/hook/useReceitasFetch";
import { Receita } from "@/types/receita";
import { Clock } from "lucide-react-native";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Button, FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

function getRandomInt(min: number, max: number) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); 
}

export default function Index() {
  const { listar, criar } = useReceitasFetch()
  const [receitas, setReceitas] = useState<Receita[]>([])
  const [nomeReceita, setNomeReceita] = useState<string>("")
  const [refreshing, setRefreshing] = useState<boolean>(false)

  const carregarReceitas = async () => {
    if(refreshing) return;
    try {
      setRefreshing(true)
      setReceitas(await listar())
    } catch (error) {
      
    } finally {
      setRefreshing(false)
    }
  }

  const criarReceita = async () => {
    const data = {
      nome: nomeReceita,
      tempoPreparo: getRandomInt(10, 360),
      ingredientes: "Alma dos derrotados"
    }

    try {
      await criar(data)
      setNomeReceita("")
      carregarReceitas()
    } catch (error) {
      Alert.alert("Erro ao criar receita :(")
    }
  }

  useEffect(() => {
    carregarReceitas()
  }, [])

  if (refreshing) return <ActivityIndicator style={{ alignSelf: 'center'}}/>

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} value={nomeReceita} placeholder="Nome Receita" onChangeText={(t) => setNomeReceita(t)} />
        <Button title="Enviar" onPress={criarReceita} />
      </View>
      <View style={styles.separator}></View>
      <FlatList
        data={receitas}
        onRefresh={() => carregarReceitas()}
        refreshing={refreshing}
        keyExtractor={(r) => r.id}
        renderItem={({ item }) => (
          <Pressable style={styles.itemContainer}>
            <View style={{ flexDirection: 'row', gap: 10}}>
              <Text style={{ fontSize: 10, alignSelf: 'center', backgroundColor: "lightgray", borderRadius: 15, padding: 1 }}>#{item.id}</Text>
              <Text>{item.nome}</Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 10, marginTop: 15}}>
              <Text>{item.ingredientes}</Text>
              <Text><Clock/> {item.tempoPreparo} min</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  inputContainer: {
    width: 400
  },
  input: {
    minWidth: 400
  },
  separator: {
    backgroundColor: "#000000",
    minWidth: '95%',
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 15
  },
  itemContainer: {
    minWidth: 350,
    maxWidth: '90%',
    backgroundColor: "#FFF",
    padding: 15,
    margin: 10,
    borderRadius: 15
  }
});
