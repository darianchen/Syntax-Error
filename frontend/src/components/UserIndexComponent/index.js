import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, getUsers } from "../../store/users";
import LeftSidebar from "../LeftSidebarComponent";

const UsersPage = () => {
    const dispatch = useDispatch();
    const users = useSelector(getUsers);


    useEffect(() => {
         dispatch(fetchUsers());
    }, [dispatch]);

    if (users){
    return (
        <>
            <LeftSidebar/>
            <div>
                 {users.map(user => (
          <div key={user.id}>
            <ul>
              <li>
                <h4>Display Name: {user.displayName}</h4>
              </li>
              <li>
                <p>Email: {user.email}</p>
              </li>
            </ul>
          </div>
        ))}
            </div>
        </>
    )
    }else{
        return (
            <div>user not found</div>
        )
    }
}

export default UsersPage;