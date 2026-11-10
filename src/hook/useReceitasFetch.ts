import { Receita } from "@/types/receita";

const URL_API = 'http://10.10.87.33:3000/receitas'

export function useReceitasFetch() {

    const listar = async (): Promise<Receita[]> => {
        const response = await fetch(URL_API);
        return await response.json();
    }

    const buscarPorId = async (id: string): Promise<Receita> => {
        const response = await fetch(URL_API + `/${id}`);
        return await response.json();
    }

    const criar = async (r: Omit<Receita, "id">): Promise<void> => {

        const response = await fetch(URL_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(r)
        });

        if (!response.ok) throw new Error("Erro ao criar receita!")

    }

    const editar = async (r: Receita): Promise<void> => {

        const response = await fetch(URL_API + `/${r.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(r)
        })

        if (!response.ok) throw new Error("Erro ao editar receita!")

    }

    const deletarPorId = async (id: string): Promise<void> => {

        const response = await fetch(URL_API + `/${id}`, {
            method: 'DELETE'
        })

        if (!response.ok) throw new Error("Erro ao deletar receita!")
    }

    return {
        listar,
        buscarPorId,
        criar
    }

}