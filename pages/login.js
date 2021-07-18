import React from 'react';
import { useRouter } from 'next/router';
import nookies, { parseCookies } from 'nookies';
import { AluraKutFooter } from '../src/components/AluraKutFooter';

export default function LoginScreen() {
    const router = useRouter();
    const [githubUser, setGithubUser] = React.useState('');

    const cookies = parseCookies()

    return (
        <main style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <div className="loginScreen">
                <section className="logoArea">
                    <img src="https://alurakut.vercel.app/logo.svg" />

                    <p><strong>Conecte-se</strong> aos seus amigos e familiares usando recados e mensagens instantâneas</p>
                    <p><strong>Conheça</strong> novas pessoas através de amigos de seus amigos e comunidades</p>
                    <p><strong>Compartilhe</strong> seus vídeos, fotos e paixões em um só lugar</p>
                </section>

                <section className="formArea">
                    <form className="box" onSubmit={(infosDoEvento) => {
                        infosDoEvento.preventDefault();

                        fetch('https://alurakut.vercel.app/api/login', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ githubUser: githubUser })
                        })
                            .then(async (respostaDoServer) => {
                                const dadosDaResposta = await respostaDoServer.json()
                                const token = dadosDaResposta.token;
                                nookies.set(null, 'USER_TOKEN', token, {
                                    path: '/',
                                    maxAge: 86400 * 7
                                })
                                router.push('/')
                            })
                    }}>
                        <p>
                            Acesse agora mesmo com seu usuário do <strong>GitHub</strong>!
                        </p>
                        <input
                            placeholder="Usuário"
                            value={githubUser}
                            onChange={(evento) => {
                                setGithubUser(evento.target.value)
                            }}
                        />
                        {
                            cookies.ERROR_LOGIN !== undefined && cookies.ERROR_LOGIN === "true" ?
                                <p className="erroMsg">Usuário não existe</p> :
                                githubUser.length === 0
                                    ? 'Preencha o campo'
                                    : ''
                        }
                        <button type="submit">
                            Login
                        </button>
                    </form>

                    <footer className="box">
                        <p>
                            Ainda não é membro? <br />
                            <a href="/login">
                                <strong>
                                    ENTRAR JÁ
                                </strong>
                            </a>
                        </p>
                    </footer>
                </section>

                <AluraKutFooter />
            </div>
        </main>
    )
}