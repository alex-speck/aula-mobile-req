import { apiReceitas } from "@/lib/api"
import { Receita } from "@/types/receita"

export function useReceitasAxios() {
    const listar = async (): Promise<Receita[]> =>  {
        const { data } = await apiReceitas.get<Receita[]>('/receitas')
        return data
    }

    const criar = async (payload: Omit<Receita, "id">) => {
        await apiReceitas.post('/receitas', payload)
    }

    const buscarPorId = async (id: string) : Promise<Receita> => {
        const { data } = await apiReceitas.get<Receita>(`/receitas/${id}`)
        return data
    }

    const deletarPorId = async (id: string) => {
        await apiReceitas.delete(`/receitas/${id}`);
    }

    return { listar, criar, buscarPorId }
}