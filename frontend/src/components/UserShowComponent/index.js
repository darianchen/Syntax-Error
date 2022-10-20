import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchUser, getUser } from "../../store/users";

const UserPage = () => {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const user = useSelector(getUser(userId));

    useEffect(() => {
        dispatch(fetchUser(userId));
    }, [dispatch, userId]);

    if (user){
    return (
        <>
            <div>
                <div>{user.email}</div>
                <div>{user.createdAt}</div>
            </div>
        </>
    )
    }else{
        return (
            <div>user not found</div>
        )
    }
}

export default UserPage;