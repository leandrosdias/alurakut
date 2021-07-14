export function BoxItemImageList(props) {
    return (
        <>
            <h2 className="smallTitle">
                {props.title} ({props.lista.length})
            </h2>

            <ul>
                {props.lista.slice(0, 6).map((itemAtual) => {
                    return (
                        <li key={itemAtual.id}>
                            <a href={itemAtual.url} key={itemAtual.id} target="_blank">
                                <img src={itemAtual.image} />
                                <span>{itemAtual.title}</span>
                            </a>
                        </li>
                    )
                })}
            </ul>
            {
                props.lista.length <= 6 ? null : (
                    <label >Ver mais</label>)
            }
        </>
    )
}

export default BoxItemImageList;