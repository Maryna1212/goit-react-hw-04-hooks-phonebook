import styled from 'styled-components';

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid rgb(11, 37, 4);
  padding: 20px;
  width: 450px;
  margin: 0 auto;
`;

export const FormLabel = styled.label`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
`;

export const FormInput = styled.input`
  width: 250px;
  height: 30px;
  margin-bottom: 15px;
`;

export const FormButton = styled.button`
  padding: 10px 15px;
  width: 170px;
  height: 50px;
  font-size: 20px;
  background-color: rgb(175, 177, 218);
  color: rgb(4, 2, 10);
  border: none;
  border-radius: 15px;
  text-align: center;
`;
