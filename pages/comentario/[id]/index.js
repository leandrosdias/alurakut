import React from 'react';
import MainGrid from '../../../src/components/MainGrid';
import Box from '../../../src/components/Box';
import { AlurakutMenu, OrkutNostalgicIconSet, ProfileSidebar } from '../../../src/lib/AluraCommons';
import { ProfileRelationsBoxWrapper } from '../../../src/components/ProfileRelations';
import BoxItemImageList from '../../../src/components/BoxItemImageList';
import BoxCommentItems from '../../../src/components/BoxCommentItems';
import { AluraKutFooter } from '../../../src/components/AluraKutFooter';
import utilFunctions from '../../../src/lib/Utils';
import nookie from 'nookies';
import jwt from 'jsonwebtoken';


export default function ComentarioPage(props) {

    const user = props.user;
    const usuarioAleatorio = props.githubUser;
    const pessoasFavoritas = utilFunctions.GetFavorites();

    const [times, setTimes] = React.useState([]);
    const [seguidores, setSeguidores] = React.useState([]);
    const [comentarios, setCommentarios] = React.useState([]);
    const [comunLoading, setcomunLoading] = React.useState(true);
    const [comentarioLoading, setComentarioLoading] = React.useState(true);
    const time = props.time;

    React.useEffect(function () {
        //GET
        fetch(`https://api.github.com/users/${usuarioAleatorio}/followers`).
            then(function (respostaServidor) {
                return respostaServidor.json();
            }).
            then(function (respostaCompleta) {
                setSeguidores(respostaCompleta.map((item) => {
                    return {
                        id: item.id,
                        title: item.login,
                        image: item.avatar_url,
                        url: item.html_url
                    }
                }));
            });

        utilFunctions.GetTimeByUser(user.times, '')
            .then((timesResult) => { setTimes([...times, ...timesResult]); setcomunLoading(false) });

        utilFunctions.GetComentarios(time.id)
            .then((comentariosResult) => { setCommentarios([...comentarios, ...comentariosResult]); setComentarioLoading(false); })

    }, [])

    return (
        <>
            <AlurakutMenu githubUser={usuarioAleatorio} />
            <MainGrid>

                <div className="profileArea" style={{ gridArea: 'profileArea' }}>
                    <ProfileSidebar isTime={true} time={time.nome} url={time.url} image={time.image} />
                </div>

                <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
                    <Box>
                        <h1 className="title">
                            Bem vindo(a), {usuarioAleatorio}
                        </h1>

                        <OrkutNostalgicIconSet />
                    </Box>

                    <Box>
                        <h2 className="subTitle">Deixe seu comentário sobre o time:</h2>
                        <div>
                            <div className="flex-container" style={{ display: "flex", alignItems: 'center' }}>
                                <img src={`https://github.com/${props.githubUser}.png`} style={{ borderRadius: '8px', width: '80px' }} />
                                <h3 style={{ padding: '10px' }}>{props.githubUser}</h3>
                            </div>
                        </div>

                        <form style={{ padding: '10px' }} onSubmit={async function handleCriaComunidade(e) {
                            e.preventDefault();

                            setComentarioLoading(true);
                            const dadosDoForm = new FormData(e.target);
                            const comment = dadosDoForm.get('comment');

                            fetch('/api/comentario', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',

                                },
                                body: JSON.stringify({
                                    usuario: usuarioAleatorio,
                                    time: props.time.id,
                                    comentario: comment
                                })
                            })
                                .then((response) => {
                                    return response.json();
                                })
                                .then((respostaCompleta) => {
                                    const comentario = respostaCompleta
                                    setCommentarios([...comentarios, comentario]);
                                })

                            setComentarioLoading(false);
                        }}>

                            <textarea style={{ padding: '20px' }}
                                name="comment"
                                rows="5"
                                cols="60">

                            </textarea>

                            <button>Comentar</button>
                        </form>

                    </Box>

                    <Box>
                        <BoxCommentItems title="Comentários" lista={comentarios} loading={comentarioLoading} ></BoxCommentItems>
                    </Box>

                </div>


                <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>

                    <ProfileRelationsBoxWrapper>
                        <BoxItemImageList title="Seguidores" lista={seguidores} />
                    </ProfileRelationsBoxWrapper>

                    <ProfileRelationsBoxWrapper>
                        <BoxItemImageList title="Comunidades" lista={times} loading={comunLoading} />
                    </ProfileRelationsBoxWrapper>

                    <ProfileRelationsBoxWrapper>
                        <BoxItemImageList title="Pessoas da comunidade" lista={pessoasFavoritas} />
                    </ProfileRelationsBoxWrapper>

                </div>
            </MainGrid>
            <AluraKutFooter />
        </>
    );
}


export async function getServerSideProps(context) {

    const { id } = context.query;
    const token = nookie.get(context).USER_TOKEN;
    const urlApi = process.env.URL_API;
    const { isAuthenticated } = await fetch(urlApi + '/api/auth', {
        headers: {
            Authorization: token
        }
    })
        .then((resposta) => resposta.json())

    if (!isAuthenticated) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }

    const { githubUser } = jwt.decode(token);

    const user = await fetch(urlApi + '/api/user', {
        method: 'POST',
        body: JSON.stringify({ username: githubUser, nome: githubUser, times: '' }),
        headers: {
            'Content-Type': 'application/json',
            'Action': 'Create',
            'Username': githubUser
        },
    })
        .then((resposta) => resposta.json())

    const time = await utilFunctions.GetTimeById(urlApi, id);
    return {
        props: {
            githubUser,
            user,
            time
        }
    }
}