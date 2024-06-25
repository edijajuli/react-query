/*eslint-disable*/
import apiClient from "../utils/api-client";
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';

const useTodos = (query) => {
    // const params = {}
    // if (userId) {
    //     params.userId = userId
    // }
    const fetchTodos = ({ pageParam = 1 }) => apiClient.get(`/todos`, {
        params: {
            _limit: query.pageSize,
            _start: (pageParam.page - 1) * query.pageSize,
        }
    }).then(res => res.data)
    return useInfiniteQuery({

        queryKey: ["todos", query],
        queryFn: fetchTodos,
        placeholderData: keepPreviousData,
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.length > 0 ? allPages.length + 1 : null
        }
    })
}

export default useTodos;