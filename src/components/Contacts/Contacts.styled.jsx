import styled from 'styled-components';

export const ContactList = styled.ul`
  /* width: 600px; */
  list-style: none;
  padding: 0;
  margin: 0 auto;
  width: 450px;
`;

export const ContactItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  font-size: 18px;
  font-weight: 500;

  :not(:last-child) {
    margin-bottom: 20px;
  }
`;

export const ContactText = styled.p`
  margin-top: 0;
  margin-bottom: 0;
  margin-right: 10px;
`;
