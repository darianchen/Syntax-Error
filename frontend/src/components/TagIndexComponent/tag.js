import './index.css'

const TagComponent = ({tag}) => {
    return (
        <div className="tag-item">
          {tag.name}
        </div>
    )
     
}

export default TagComponent