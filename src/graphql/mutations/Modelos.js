import { gql } from "@apollo/client";

export const REMOVE_MODELO = gql`
  mutation RemoveModelo($id: String!) {
    removeModelo(id: $id) {
      id
    }
  }
`;

export const UPDATE_MODELO = gql`
  mutation UpdateModelo(
    $id: String!
    $nombre: String
    $descripcion: String
    $url_imagen: String
    $Marca_id: String
  ) {
    updateModelo(
      updateModeloInput: {
        id: $id
        nombre: $nombre
        descripcion: $descripcion
        url_imagen: $url_imagen
        marca_id: $Marca_id
      }
    ) {
      id
      nombre
      url_imagen
      descripcion
      marca {
        id
        nombre
      }
    }
  }
`;
export const CREATE_MODELO = gql`
  mutation CreateModelo($input: CreateModeloInput!) {
    createModelo(createModeloInput: $input) {
      id
      nombre
      descripcion
      url_imagen
      marca {
        id
        nombre
      }
    }
  }
`;
