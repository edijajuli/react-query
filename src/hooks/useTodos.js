/*eslint-disable*/
import apiClient from "../utils/api-client";
import { useQuery } from '@tanstack/react-query';

const useTodos = (userId) => {
    const params = {}
    if (userId) {
        params.userId = userId
    }
    const fetchTodos = () => apiClient.get(`/todos`, {
        params
    }).then(res => res.data)
    return useQuery({
        //users/1/todos
        queryKey: userId ? ["user", userId, "todos"] : ["todos"],
        queryFn: fetchTodos,
    })
}

export default useTodos;