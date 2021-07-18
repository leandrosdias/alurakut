import styled from 'styled-components';

AluraKutFooter.Footer = styled.footer`
    background-color: #308BC5;
    padding  : 20px;
    align-items: center;

    p{
        color: white;
        text-align: center;
    }

    a{
        color: white;
    }
`;

export function AluraKutFooter() {
    return (
        <AluraKutFooter.Footer className="footerArea">
            <p>
                © 2021 alura.com.br - Criado por Leandro Dias - <a href="/">Sobre o AluraKut.br</a> - <a href="/">Centro de segurança</a> - <a href="/">Privacidade</a> - <a href="/">Termos</a> - <a href="/">Contato</a>
            </p>
        </AluraKutFooter.Footer>
    )
c}