import { gql } from "@apollo/client";

export const GET_MODELOS = gql`
  query GetModelos {
    modelos {
      id
      nombre
      descripcion
      url_imagen
      marca {
        id
      }
    }
  }
`;

export const REMOVE_MODELO = gql`
  mutation RemoveModelo($id: String!) {
    removeModelo(id: $id) {
      id
    }
  }
`;
