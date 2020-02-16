import styled from "styled-components";

export const Button = styled.div`
  display: ${props => (props.block ? "block" : "inline-block")};
  padding: 8px 24px;
  border: 1px solid teal;
  color: teal;
  margin-left: ${props => props.marginLeft || 0};
  margin-bottom: ${props => props.marginBottom || 0};
`;

export const Input = styled.input`
  padding: 8px 12px;
  margin-top: ${props => props.marginTop || 0};
  margin-left: ${props => props.marginLeft || 0};
  margin-right: ${props => props.marginRight || 0};
  margin-bottom: ${props => props.marginBottom || 0};
`;
