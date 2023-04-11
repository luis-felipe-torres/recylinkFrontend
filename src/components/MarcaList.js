import { useQuery } from "@apollo/client";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { GET_MARCAS } from "../graphql/queries/Marcas";
import { GET_MODELOS } from "../graphql/queries/Modelos";

const MarcaList = () => {
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

  if (marcasLoading || modelosLoading) return <p>Loading...</p>;
  if (marcasError) return <p>Error: {marcasError.message}</p>;
  if (modelosError) return <p>Error: {modelosError.message}</p>;

  const handleClick = (marcaId) => {
    // Debo considerar ejecutar una accion al apretar  cada modelo ? pendiente de desarrollo futuro.
  };

  const getModelosByMarcaId = (marcaId) => {
    return modelosData.modelos.filter((modelo) => modelo.marca.id === marcaId);
  };

  return (
    <div>
      <h1>Marcas de carros</h1>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {marcasData.marcas.map((marca) => {
          const modelos = getModelosByMarcaId(marca.id);
          return (
            <li
              key={marca.id}
              onClick={() => handleClick(marca.id)}
              style={{
                backgroundColor: "#C8E6C9",
                marginBottom: 10,
                borderRadius: 5,
                padding: 10,
              }}
            >
              <h2 style={{ textAlign: "center" }}>{marca.nombre}</h2>
              <p style={{ textAlign: "center" }}>{marca.descripcion}</p>
              <img
                src={marca.url_imagen}
                alt={marca.nombre}
                style={{
                  display: "block",
                  width: "100%",
                  height: "auto",
                  maxWidth: "300px",
                  maxHeight: "200px",
                  objectFit: "contain",
                  borderRadius: 5,
                  margin: "0 auto 10px",
                }}
              />
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography>Modelos</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {modelos.length ? (
                    modelos.map((modelo) => (
                      <div key={modelo.id}>
                        <h3>{modelo.nombre}</h3>
                        <p>{modelo.descripcion}</p>
                        <img
                          src={modelo.url_imagen}
                          alt={modelo.nombre}
                          style={{
                            width: "100%",
                            height: "auto",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    ))
                  ) : (
                    <Typography variant="body1">
                      No hay modelos disponibles para esta marca.
                    </Typography>
                  )}
                </AccordionDetails>
              </Accordion>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MarcaList;
