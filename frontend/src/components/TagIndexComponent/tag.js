import './index.css'
import {Link} from "react-router-dom";

const TagComponent = ({tag}) => {
    return (
        <div className="tag-item">
          <Link to={`/questions?tag=${tag.name}`}>
            {tag.name}
          </Link>
        </div>
    )
}

export default TagComponent