import Icon from '../Icon/Icon'
import {} from '../Card/Card.css'
function Card({player,onPlay,index}) {
    let icon = <Icon/>
    if(player == 'X') {
        icon = <Icon name="cross"/>
    } else if(player == 'O') {
        icon = <Icon name="circle"/>
    }
    return (
        <div className={`card ${player}`} onClick={()=>player == "" && onPlay(index)}>
            {icon}
        </div>
    )
}

export default Card;
