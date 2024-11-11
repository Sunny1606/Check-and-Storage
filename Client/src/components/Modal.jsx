//otro tipo

import React from "react";
import style from "./modal.module.css"; // Asegúrate de tener los estilos en este archivo
import GoogleIcon from "@mui/icons-material/Google";

export default function Modal() {
  return (
    <div className={style.modaloverlay}>
      <h2 className={style.h1}>Iniciar sesion con Google</h2>
      <GoogleIcon style={{ top: 10, fontSize: 40, marginBottom: 20 }} />
      <button>ENTRAR</button>
    </div>
  );
}
