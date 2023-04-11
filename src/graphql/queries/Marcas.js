import { gql } from "@apollo/client";

export const GET_MARCAS = gql`
  query GetMarcas {
    marcas {
      id
      nombre
      descripcion
      url_imagen
    }
  }
`;
