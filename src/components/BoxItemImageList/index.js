import { useRouter } from 'next/router';
import Loader from '../Loader';

export function BoxItemImageList(props) {
    const router = useRouter();

    if (props.loading) {
        return (
            <>
                <h2 className="smallTitle">
                    {props.title} ({props.lista.length})
                </h2>

                <Loader />
            </>
        )
    }

    return (
        <>
            <h2 className="smallTitle">
                {props.title} ({props.lista.length})
            </h2>


            <ul>
                {props.lista.slice(0, 6).map((itemAtual) => {
                    return (
                        <li key={itemAtual.id}>
                            <a href={itemAtual.url} key={itemAtual.id} onClick={(e) => {
                                e.preventDefault();
                                router.push(itemAtual.url)
                            }}>
                                <img src={itemAtual.image} />
                                <span>{itemAtual.nome}</span>
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

