import styled from 'styled-components';

export const Wrapper = styled.div`
    height: 100vh; // Высота
    display: flex; // команда обозначения для блока
    align-items: center; // вертикаль ценр
    overflow: hidden;
    > div {
        flex: 1;
        &.stoneWrapper {
            align-self: flex-end;
            position: relative;
            height: 100%;
        }

        &.formWrapper {
            display: flex;
            justify-content: center;
            position: relative;
            top: -100px;
            .form {
                width: 400px; // ширина
                padding: 32px; // отступ от края внутри блока
                box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; // тень окна
                border-radius: 8px; // заругление углов
                .menu {
                    /* margin-bottom: 16px; */
                    position: relative;
                    top: -24px;
                }
            }
        }
    }
    .videoBackground {
        position: absolute;
        /* height: 100vh; */
        width: 100vw;
    }
`;
