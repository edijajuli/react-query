/*eslint-disable*/
import apiClient from "../utils/api-client";
import { keepPreviousData, useQuery } from '@tanstack/react-query';

const useTodos = (query) => {
    // const params = {}
    // if (userId) {
    //     params.userId = userId
    // }
    const fetchTodos = () => apiClient.get(`/todos`, {
        params: {
            _limit: query.pageSize,
            _start: (query.page - 1) * query.pageSize,
        }
    }).then(res => res.data)
    return useQuery({

        queryKey: ["todos", query],
        queryFn: fetchTodos,
        placeholderData: keepPreviousData,
    })
}

export default useTodos;