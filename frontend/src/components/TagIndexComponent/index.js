import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './index.css'
import { getTags, fetchTags } from "../../store/tags";
import TagsComponent from "./tags"

const TagIndexComponent = () => {
    const dispatch = useDispatch();
    const tags = useSelector(getTags).slice()

    useEffect(() => {
        dispatch(fetchTags())
    }, [])
    return (
        <>
            <div className="tag-index">
                <TagsComponent tags={tags} />
            </div>
        </>
    )
     
}

export default TagIndexComponent