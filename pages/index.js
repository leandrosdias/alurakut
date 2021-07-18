import React from 'react';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, ProfileSidebar, OrkutNostalgicIconSet } from '../src/lib/AluraCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import utilFunctions from '../src/lib/Utils'
import BoxItemImageList from '../src/components/BoxItemImageList'
import SelectTimes from '../src/components/SelectTimes'
import nookie from 'nookies'
import jwt from 'jsonwebtoken'
import { AluraKutFooter } from '../src/components/AluraKutFooter';

export default function Home(props) {

  const user = props.user;
  const usuarioAleatorio = props.githubUser;
  const pessoasFavoritas = utilFunctions.GetFavorites();
 
  const [times, setTimes] = React.useState([]);
  const [seguidores, setSeguidores] = React.useState([]);
 
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

    utilFunctions.GetTimeByUser(user.times)
      .then((timesResult) => { setTimes([...times, ...timesResult]); });

  }, [])

  return (
    <>
      <AlurakutMenu githubUser={usuarioAleatorio} />
      <MainGrid>

        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={usuarioAleatorio} />
        </div>

        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem vindo(a), {usuarioAleatorio}
            </h1>

            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>

            <form onSubmit={async function handleCriaComunidade(e) {
              e.preventDefault();

              const dadosDoForm = new FormData(e.target);
              const timeName = dadosDoForm.get('time');

              const time = await utilFunctions.GetTime(timeName)

              const timesUser = user.times === '' ? time.nome : user.times + '|' + time.nome;

              await fetch('/api/user', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'action': 'AddTeam',
                  'timesuser': timesUser,
                  'userid': user.id
                },
              }).then(async (response) => {
                user.times = timesUser
                setTimes([...times, time]);
              })

            }}>

              <div>
                <label>
                  Gostaria de entrar na comunidade de qual time?
                </label>
              </div>
              <br />

              <div>
                <SelectTimes name='time'>

                </SelectTimes>
              </div>

              <hr />
              <button>Entrar na comunidade</button>

            </form>
          </Box>
        </div>

        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>

          <ProfileRelationsBoxWrapper>
            <BoxItemImageList title="Seguidores" lista={seguidores} />
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <BoxItemImageList title="Comunidades" lista={times} />
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <BoxItemImageList title="Pessoas da comunidade" lista={pessoasFavoritas} />
          </ProfileRelationsBoxWrapper>

        </div>
      </MainGrid>
      <AluraKutFooter />
    </>
  )
}


export async function getServerSideProps(context) {

  const token = nookie.get(context).USER_TOKEN;
  const urlApi = process.env.URL_API;
  const { isAuthenticated } = await fetch(urlApi + '/api/auth', {
    headers: {
      Authorization: token
    }
  })
    .then((resposta) => resposta.json())

  if (!isAuthenticated) {
    nookie.set(context, 'ERROR_LOGIN', true, {
      path: '/',
      maxAge: 86400 * 7
    });

    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  nookie.set(context, 'ERROR_LOGIN', false, {
    path: '/',
    maxAge: 86400 * 7
  });

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

  return {
    props: {
      githubUser,
      user
    }
  }
}