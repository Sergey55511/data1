import styled from 'styled-components';

export const Wrapper = styled.div`
    padding: 8px;
    padding-right: 32px;
    display: flex;
    align-items: center;
    .menu {
        flex: 1;
        margin-right: 16px;
    }
    .icon {
        .green {
            font-size: 18px;
            path {
                fill: green;
            }
        }
        .red {
            path {
                fill: red;
            }
        }
    }
    .store {
        margin-right: 16px;
        span {
            font-weight: 600;
        }
    }
    .user {
        margin-right: 16px;
        span {
            font-weight: 600;
            a {
                color: rgba(0, 0, 0, 0.85);
            }
        }
    }
`;
