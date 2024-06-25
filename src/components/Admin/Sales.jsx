/* eslint-disable*/
import { useState } from "react";
import Loader from "../Common/Loader";
import useTodos from "./../../hooks/useTodos";
const Sales = () => {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  // const [userId, setUserId] = useState(null);
  const { data: todos, error, isLoading } = useTodos({ page, pageSize });
  return (
    <>
      <h3>Todos Page</h3>
      {/* <select
        onChange={(e) => setUserId(parseInt(e.target.value))}
        value={userId}
      >
        <option value="">Select User</option>
        <option value="1">User 1</option>
        <option value="2">User 2</option>
        <option value="3">User 3</option>
        <option value="4">User 4</option>
        <option value="5">User 5</option>
      </select> */}
      {isLoading && <Loader />}
      {error && <em>{error.message}</em>}
      {todos?.map((todo) => (
        <p key={todo.id}>{todo.title}</p>
      ))}
      <button disabled={page === 1} onClick={() => setPage(page - 1)}>
        Previous
      </button>
      <button
        disabled={page * pageSize > 200}
        onClick={() => setPage(page + 1)}
      >
        Next
      </button>
    </>
  );
};

export default Sales;
