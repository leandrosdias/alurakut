export function BoxItemImageList(props) {
    return (
        <>
            <h2 className="smallTitle">
                {props.title} ({props.lista.length})
            </h2>

            <ul style={{ listStyle: 'none' }}>
                {props.lista.slice(0, 6).map((itemAtual) => {
                    return (
                        <li key={itemAtual.id} style={{ marginTop: '30px' }}>
                            <a href={itemAtual.url} key={itemAtual.id} target="_blank">

                                <div className="flex-container" style={{ background: 'beige', display: "flex", alignItems: 'center' }}>
                                    <img style={{ marginLeft: '40px', width: '60px' }}
                                        src={`https://github.com/${itemAtual.usuario}.png`} />
                                    <div style={{ marginTop: '30px' }}>
                                        <span style={{ padding: '30px' }}>Usuário: <strong>{itemAtual.usuario}</strong></span>
                                        <p style={{ padding: '30px' }} >{itemAtual.comentario}</p>
                                    </div>
                                </div>
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