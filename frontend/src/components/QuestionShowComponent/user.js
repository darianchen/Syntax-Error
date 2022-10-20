import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, getUser } from "../../store/users";

const GetUserHelper = (userId) => {
    const dispatch = useDispatch();
    const user = useSelector(getUser(userId));

    useEffect(() => {
        dispatch(fetchUser(userId));
    }, [dispatch, userId]);

    if (user){
        return (
            {user}
        )
    }
}

export default GetUserHelper;