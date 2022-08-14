import styled from 'styled-components'

export const Wrapper = styled.div`
    height: 100vh;// Высота
    display: flex;// команда обозначения для блока
    justify-content: center; // горизонт центр
    align-items: center; // вертикаль ценр
    

    .form{
        width: 400px; // ширина
        padding: 32px; // отступ от края внутри блока    
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;// тень окна
        border-radius: 8px; // заругление углов
        .input{
            margin-bottom: 16px; // отсуп между строками (логин, пароль)
        }

    }
`