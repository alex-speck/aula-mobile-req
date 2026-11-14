import { useReceitasAxios } from "@/hook/useReceitasAxios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Clock } from "lucide-react-native";
import { ActivityIndicator, Alert, FlatList, Pressable, StyleSheet, Text, View } from "react-native";


function TanstackRequest() {

  const { listar, criar } = useReceitasAxios()

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['receitas'],
    queryFn: listar,
    retry: 3,
    retryDelay: 1000,
    staleTime: 1*60*1000
  })

  const criarMutation = useMutation({
    mutationKey: ['criar-receita'],
    mutationFn: criar,
    onSuccess: () => {
      Alert.alert("Receita cadastrada com sucesso")
      refetch()
    },
    onError: () => {
      Alert.alert("Erro ao cadastrar a receita")
    },
    onSettled: () => {
      console.log("Finalizado!")
    }
  })

  if (isLoading) {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center'  }}>
        <Text>Carregando...</Text>
        <ActivityIndicator color={'blue'} />
      </View>
    )
  }
  
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
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
  )
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

export default TanstackRequest