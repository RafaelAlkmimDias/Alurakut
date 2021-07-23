import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { postLogin } from '../src/services/Communication';
import nookies from 'nookies';

export default function LoginScreen() {
    const router = useRouter();
    const [githubUser, setGithubUser] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const presentError = Boolean(errorMessage.length);

    const submitHandler = async (event) => {
        event.preventDefault();

        if(githubUser.length === 0){
            setErrorMessage('Favor preencher usuário de github');
            return;
        }
        const data = await postLogin(githubUser)
        if(data){
            nookies.set(null, 'USER_TOKEN', data, {
                path: '/',
                maxAge: 86400 * 7
            });
            router.push('/', {})
            return;
        }

        setErrorMessage('Erro ao realizar login');
    }

    const inputChangeHandler = (event) => {
        const value = event.target.value;
        setErrorMessage('');
        setGithubUser(value);
    }

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
                    <form className="box" onSubmit={submitHandler}>
                        <p>
                            Acesse agora mesmo com seu usuário do <strong>GitHub</strong>!
                        </p>
                        <input placeholder="Usuário" value={githubUser} onChange={ inputChangeHandler } />
                        {presentError && (<p>{ errorMessage }</p>)}
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

                <footer className="footerArea">
                    <p>
                        © 2021 alura.com.br - <a href="/">Sobre o Orkut.br</a> - <a href="/">Centro de segurança</a> - <a href="/">Privacidade</a> - <a href="/">Termos</a> - <a href="/">Contato</a>
                    </p>
                </footer>
            </div>
        </main>
    )
} 