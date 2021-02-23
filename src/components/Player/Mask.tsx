import PlayArrowIcon from "@material-ui/icons/PlayArrow"
import './Mask.css'

function Mask() {
    return (
        <div className="mask-container">
            <div className="mask-icon">
                <PlayArrowIcon
                    htmlColor="white"
                    fontSize="large"
                />
            </div>
        </div>
    )
}

export default Mask