import { error } from "console";
import exp from "constants";
import React, { useState, useEffect } from "react";

// récupération des données des users
export const FetchUsers = () => {
    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        fetchData();
    }, []);
    
    const fetchData = async () => {
        try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}users`);
        if (!response.ok) {
            throw new Error("erreur lors de la récupération des données");
        }
        const result = await response.json();
        setUsers(result);
        } catch (error) {
        console.log("erreur", error);
        }
    };
    return users;
    };

// récupération des users par id
export const FetchUserById = (id: any) => {
    const [user, setUser] = useState({});
    
    useEffect(() => {
        fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    const fetchData = async () => {
        try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}/${id}`);
        if (!response.ok) {
            throw new Error("erreur lors de la récupération des données");
        }
        const result = await response.json();
        setUser(result);
        } catch (error) {
        console.log("erreur", error);
        }
    };
    return user;
    };

// créer un nouvel utilisateur 
export const AddUser = (user: any) => {
    const fetchData = async () => {
        try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}/users`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        if (!response.ok) {
            throw new Error("erreur lors de la création de l'utilisateur");
        }
        } catch (error) {
        console.log("erreur", error);
        }
    };
    fetchData();
    };

// modifier un utilisateur 
export const EditUser = (user: any) => {
    const fetchData = async () => {
        try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}/users/${user.id}`, {
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        if (!response.ok) {
            throw new Error("erreur lors de la modification de l'utilisateur");
        }
        } catch (error) {
        console.log("erreur", error);
        }
    };
    fetchData();
    };

// supprimer un utilisateur *********************VOIR POUR ADMINISTRATEUR***
export const DeleteUser = (id: any) => {
    const fetchData = async () => {
        try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}/users/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error("erreur lors de la suppression de l'utilisateur");
        }
        } catch (error) {
        console.log("erreur", error);
        }
    };
    fetchData();
    };
