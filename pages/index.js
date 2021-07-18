import React from 'react';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AluraCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import utilFunctions from '../src/lib/Utils'
import BoxItemImageList from '../src/components/BoxItemImageList'
import SelectTimes from '../src/components/SelectTimes'
import nookie from 'nookies'
import jwt from 'jsonwebtoken'
import { AluraKutFooter } from '../src/components/AluraKutFooter';

function ProfileSidebar(propriedades) {
  return (
    <Box as="aside">
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px' }} />

      <hr />

      <p>
        <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`}>
          @{propriedades.githubUser}
        </a>
      </p>

      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

export default function Home(props) {

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
      })

    fetch('/api/times', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Action': 'Get'
      },
    }).then(async (response) => {
      const responseObj = await response.json();
      setTimes(responseObj.registroCriado);
    })

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

            <form onSubmit={function handleCriaComunidade(e) {
              e.preventDefault();

              const dadosDoForm = new FormData(e.target);
              const timeName = dadosDoForm.get('time');

              const time = utilFunctions.GetTime(timeName)

              fetch('/api/times', {
                method: 'POST',
                body: JSON.stringify(time),
                headers: {
                  'Content-Type': 'application/json',
                  'Action': 'Create'
                },
              }).then(async (response) => {
                const dados = await response.json();

                time.id = dados.registroCriado.id;
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
      <AluraKutFooter/>
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
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  const { githubUser } = jwt.decode(token);

  return {
    props: {
      githubUser
    }
  }
}