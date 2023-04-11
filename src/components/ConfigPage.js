import { useQuery, useMutation } from "@apollo/client";
import React, { useState, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { Save, Edit, Delete, Cancel, Button } from "@mui/icons-material";

import { GET_MARCAS } from "../graphql/queries/Marcas";
import { GET_MODELOS } from "../graphql/queries/Modelos";
import {
  REMOVE_MODELO,
  UPDATE_MODELO,
  CREATE_MODELO,
} from "../graphql/mutations/Modelos";

const ConfigPage = () => {
  const nombreEditRef = useRef(null);
  const descripcionEditRef = useRef(null);
  const urlImagenEditRef = useRef(null);

  const nombreCreateRef = useRef(null);
  const descripcionCreateRef = useRef(null);
  const urlImagenCreateRef = useRef(null);

  const {
    loading: marcasLoading,
    error: marcasError,
    data: marcasData,
  } = useQuery(GET_MARCAS);
  const {
    loading: modelosLoading,
    error: modelosError,
    data: modelosData,
  } = useQuery(GET_MODELOS);

  const [updateModelo] = useMutation(UPDATE_MODELO, {
    update(cache, { data: { updateModelo } }) {
      // Lee los datos actuales de la caché
      const { modelos } = cache.readQuery({ query: GET_MODELOS });

      // Encuentra el índice del modelo que ha sido actualizado
      const index = modelos.findIndex(
        (modelo) => modelo.id === updateModelo.id
      );

      // Reemplaza el modelo actualizado en la lista de modelos
      const updatedModelos = [
        ...modelos.slice(0, index),
        updateModelo,
        ...modelos.slice(index + 1),
      ];

      // Escribe los datos actualizados en la caché
      cache.writeQuery({
        query: GET_MODELOS,
        data: { modelos: updatedModelos },
      });
    },
  });

  const [removeModelo] = useMutation(REMOVE_MODELO, {
    update(cache, { data: { removeModelo } }) {
      const { modelos } = cache.readQuery({ query: GET_MODELOS });

      const updatedModelos = modelos.filter(
        (modelo) => modelo.id !== removeModelo.id
      );

      cache.writeQuery({
        query: GET_MODELOS,
        data: { modelos: updatedModelos },
      });
    },
  });
  const [createModelo] = useMutation(CREATE_MODELO, {
    update(cache, { data: { createModelo } }) {
      const { modelos } = cache.readQuery({ query: GET_MODELOS });

      const updatedModelos = [...modelos, createModelo];

      cache.writeQuery({
        query: GET_MODELOS,
        data: { modelos: updatedModelos },
      });
    },
  });

  const [editingModeloId, setEditingModeloId] = useState(null);
  const [addingModelo_MarcaId, setAddingModelo_MarcaId] = useState(null);

  const getModelosByMarcaId = (marcaId) => {
    return modelosData.modelos.filter((modelo) => modelo.marca.id === marcaId);
  };
  const handleEdit = (modeloId) => {
    setEditingModeloId(modeloId);
  };
  const handleDelete = async (modeloId) => {
    try {
      await removeModelo({ variables: { id: modeloId } });
    } catch (error) {
      console.error(error);
    }
  };
  const handleSave = async (modeloId, marcaId) => {
    const updatedModelo = {
      id: modeloId,
      nombre: nombreEditRef.current.value,
      descripcion: descripcionEditRef.current.value,
      url_imagen: urlImagenEditRef.current.value,
      marca_id: marcaId,
    };

    console.log(updatedModelo);
    try {
      await updateModelo({ variables: updatedModelo });
    } catch (error) {
      console.error(error);
    }

    setEditingModeloId(null);
  };

  const handleCreate = async (marcaId) => {
    const createdModelo = {
      nombre: nombreCreateRef.current?.value ?? "Default Value",
      descripcion: descripcionCreateRef.current?.value ?? "Default Value",
      url_imagen: urlImagenCreateRef.current?.value ?? "Default Value",
      marca_id: marcaId,
    };

    console.log(createdModelo);
    try {
      await createModelo({ variables: { input: createdModelo } });
    } catch (error) {
      console.error(error);
    }
    setAddingModelo_MarcaId(null);
  };

  const handleAdd = (marcaId) => {
    setAddingModelo_MarcaId(marcaId);
  };
  const handleCancel = () => {
    setAddingModelo_MarcaId(null);
  };

  if (marcasLoading || modelosLoading) return <p>Loading...</p>;
  if (marcasError) return <p>Error: {marcasError.message}</p>;
  if (modelosError) return <p>Error: {modelosError.message}</p>;

  return (
    <div>
      <h1>Configuración de marcas y modelos</h1>
      {marcasData.marcas.map((marca) => {
        const modelos = getModelosByMarcaId(marca.id);
        return (
          <div key={marca.id} style={{ marginBottom: 20 }}>
            <h2 style={{ textAlign: "center" }}>{marca.nombre}</h2>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Descripción</TableCell>
                    <TableCell>URL Imagen</TableCell>
                    <TableCell>Editar</TableCell>
                    <TableCell>Borrar</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {modelos.map((modelo) => (
                    <TableRow key={modelo.id}>
                      <TableCell>
                        {editingModeloId === modelo.id ? (
                          <input
                            ref={nombreEditRef}
                            defaultValue={modelo.nombre}
                          />
                        ) : (
                          modelo.nombre
                        )}
                      </TableCell>
                      <TableCell>
                        {editingModeloId === modelo.id ? (
                          <input
                            ref={descripcionEditRef}
                            defaultValue={modelo.descripcion}
                          />
                        ) : (
                          modelo.descripcion
                        )}
                      </TableCell>
                      <TableCell>
                        {editingModeloId === modelo.id ? (
                          <input
                            ref={urlImagenEditRef}
                            defaultValue={modelo.url_imagen}
                          />
                        ) : (
                          modelo.url_imagen
                        )}
                      </TableCell>
                      <TableCell>
                        {editingModeloId === modelo.id ? (
                          <Save
                            onClick={() => handleSave(modelo.id, marca.id)}
                          />
                        ) : (
                          <Edit onClick={() => handleEdit(modelo.id)} />
                        )}
                      </TableCell>
                      <TableCell>
                        <Delete onClick={() => handleDelete(modelo.id)} />
                      </TableCell>
                    </TableRow>
                  ))}
                  {addingModelo_MarcaId === marca.id && (
                    <TableRow>
                      <TableCell>
                        <input ref={nombreCreateRef} placeholder="Nombre" />
                      </TableCell>
                      <TableCell>
                        <input
                          ref={descripcionCreateRef}
                          placeholder="Descripción"
                        />
                      </TableCell>
                      <TableCell>
                        <input
                          ref={urlImagenCreateRef}
                          placeholder="URL Imagen"
                        />
                      </TableCell>
                      <TableCell>
                        <Save onClick={() => handleCreate(marca.id)} />
                      </TableCell>
                      <TableCell>
                        <Cancel onClick={handleCancel} />
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
                {addingModelo_MarcaId !== marca.id && (
                  <caption>
                    <button
                      onClick={() => handleAdd(marca.id)}
                      variant="contained"
                      color="primary"
                    >
                      Agregar modelo
                    </button>
                  </caption>
                )}
              </Table>
            </TableContainer>
          </div>
        );
      })}
    </div>
  );
};

export default ConfigPage;
