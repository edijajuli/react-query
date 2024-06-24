import React, { useEffect, useState } from "react";
import apiClient from "../../utils/api-client";
import Loader from "../Common/Loader";

const Sellers = () => {
    const [name, setName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState("");
    const [sellers, setSellers] = useState([]);

    useEffect(() => {
        // fetchSellers();
        setIsLoading(true);
        apiClient
            .get("/users")
            .then((res) => {
                setSellers(res.data);
                setIsLoading(false);
            })
            .catch((err) => {
                setIsLoading(false);
                setErrors(err.message);
            });
    }, []);

    const addSeller = () => {
        const newSeller = {
            name,
            id: sellers.length + 1,
        };
        setSellers([newSeller, ...sellers]);

        apiClient
            .post("/users", newSeller)
            .then((res) => setSellers([res.data, ...sellers]))
            .catch((err) => {
                setErrors(err.message);
                setSellers(sellers);
            });
    };

    const deleteSeller = (id) => {
        setSellers(sellers.filter((s) => s.id !== id));
        apiClient.delete(`/users/${id}`).catch((err) => {
            setErrors(err.message);
            setSellers(sellers);
        });
    };

    const updateSeller = (seller) => {
        const updatedSeller = {
            ...seller,
            name: seller.name + " Updated",
        };
        setSellers(
            sellers.map((s) => (s.id === seller.id ? updatedSeller : s))
        );

        apiClient.patch(`/users/${seller.id}`, updatedSeller).catch((err) => {
            setErrors(err.message);
            setSellers(sellers);
        });
    };

    return (
        <>
            <h3>Admin Sellers Page</h3>
            <input type='text' onChange={(e) => setName(e.target.value)} />
            <button onClick={addSeller}>Add Seller</button>
            {isLoading && <Loader />}
            {errors && <em>{errors}</em>}

            <table>
                <tbody>
                    {sellers.map((seller) => (
                        <tr key={seller.id}>
                            <td>{seller.name}</td>
                            <td>
                                <button onClick={() => updateSeller(seller)}>
                                    Update
                                </button>
                            </td>
                            <td>
                                <button onClick={() => deleteSeller(seller.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default Sellers;
