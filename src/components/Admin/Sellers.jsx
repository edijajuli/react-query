/* eslint-disable */
import { useState } from "react";
import apiClient from "../../utils/api-client";
import Loader from "../Common/Loader";
import useSellers from "./../../hooks/useSellers";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Sellers = () => {
  const [name, setName] = useState("");
  const { data: sellers, error, isLoading } = useSellers();
  const queryClient = useQueryClient();

  const addSellerMutation = useMutation({
    mutationFn: (newSeller) =>
      apiClient.post("/users", newSeller).then((res) => res.data),
    onSuccess: (savedSeller, newSeller) => {
      //method 1: invalid cached data
      // queryClient.invalidateQueries({
      //   queryKey: ["sellers"],
      // });

      //method 2: direct update the cached data
      queryClient.setQueryData(["sellers"], (sellers) => [
        savedSeller,
        ...sellers,
      ]);
    },
  });

  const deleteSellerMutation = useMutation({
    mutationFn: (id) =>
      apiClient.delete(`/users/${id}`).then((res) => res.data),

    //delete seller from server
    // onSuccess: (deletedSeller) =>
    //   queryClient.setQueryData(["sellers"], (sellers) =>
    //     sellers.filter((s) => s.id !== deletedSeller.id)
    //   ),
  });

  const updateSellerMutation = useMutation({
    mutationFn: (updatedSeller) => {
      apiClient
        .patch(`/users/${updatedSeller.id}`, updatedSeller)
        .then((res) => res.data);
    },
    onSuccess: (updatedSeller) => {
      queryClient.setQueryData(["sellers"], (sellers) =>
        sellers.map((s) => (s.id === updatedSeller.id ? updatedSeller : s))
      );
    },
  });

  const addSeller = () => {
    const newSeller = {
      name,
      id: sellers.length + 1,
    };
    addSellerMutation.mutate(newSeller);
  };

  const deleteSeller = (id) => {
    deleteSellerMutation.mutate(id, {
      onSuccess: () =>
        queryClient.setQueryData(["sellers"], (sellers) =>
          sellers.filter((s) => s.id !== id)
        ),
    });
  };

  const updateSeller = (seller) => {
    const updatedSeller = {
      ...seller,
      name: seller.name + " Updated",
    };
    updateSellerMutation.mutate(updatedSeller);
  };

  // const [isLoading, setIsLoading] = useState(false);
  // const [errors, setErrors] = useState("");
  // const [sellers, setSellers] = useState([]);

  // useEffect(() => {
  //     // fetchSellers();
  //     setIsLoading(true);
  //     apiClient
  //         .get("/users")
  //         .then((res) => {
  //             setSellers(res.data);
  //             setIsLoading(false);
  //         })
  //         .catch((err) => {
  //             setIsLoading(false);
  //             setErrors(err.message);
  //         });
  // }, []);

  // setSellers([newSeller, ...sellers]);

  // apiClient
  //   .post("/users", newSeller)
  //   .then((res) => setSellers([res.data, ...sellers]))
  //   .catch((err) => {
  //     setErrors(err.message);
  //     setSellers(sellers);
  //   });

  // const deleteSeller = (id) => {
  //   setSellers(sellers.filter((s) => s.id !== id));
  //   apiClient.delete(`/users/${id}`).catch((err) => {
  //     setErrors(err.message);
  //     setSellers(sellers);
  //   });
  // };

  // const updateSeller = (seller) => {
  //   const updatedSeller = {
  //     ...seller,
  //     name: seller.name + " Updated",
  //   };
  //   setSellers();

  //   apiClient.patch(`/users/${seller.id}`, updatedSeller).catch((err) => {
  //     setErrors(err.message);
  //     setSellers(sellers);
  //   });
  // };

  return (
    <>
      <h3>Admin Sellers Page</h3>
      <input type="text" onChange={(e) => setName(e.target.value)} />
      <button onClick={addSeller}>Add Seller</button>
      {isLoading && <Loader />}
      {error && <em>{error.message}</em>}

      <table>
        <tbody>
          {sellers?.map((seller) => (
            <tr key={seller.id}>
              <td>{seller.name}</td>
              <td>
                <button onClick={() => updateSeller(seller)}>Update</button>
              </td>
              <td>
                <button onClick={() => deleteSeller(seller.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Sellers;
