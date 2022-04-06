import React from "react";
import { ThreeDots } from "react-loader-spinner";
import { Container } from "semantic-ui-react";
import { useMediaQuery } from "react-responsive";

function Loading() {
  const isMobile = useMediaQuery({
    query: "(max-width : 768px)",
  });

  return (
    <>
      {isMobile ? (
        <Container
          style={{
            display: "flex",
            justifyContent: "center",
            position: "relative",
            top: "150px",
          }}
        >
          <ThreeDots color="#219F94" height={80} width={80} timeout={3000} />
        </Container>
      ) : (
        <Container
          style={{
            display: "flex",
            justifyContent: "center",
            position: "relative",
            top: "220px",
          }}
        >
          <ThreeDots color="#219F94" height={80} width={80} />
        </Container>
      )}
    </>
  );
}

export default Loading;
