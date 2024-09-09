// //Flujo del Modal
// // Abrir el Modal: Cuando el usuario haga clic en "Guardar Lista", el modal se abrirá si el usuario no está autenticado.
// // Formulario de Autenticación: El modal mostrará un formulario para iniciar sesión o registrarse.
// // Guardar Tareas: Después de iniciar sesión o registrarse exitosamente, el modal se cerrará y el usuario podrá guardar la lista de tareas.

// import React, { useState } from "react";
// import style from "./modal.module.css"; // Asegúrate de tener los estilos en este archivo

// const Modal = ({ isOpen, onClose, onSave }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLoggingIn, setIsLoggingIn] = useState(true); // Para cambiar entre login y registro

//   if (!isOpen) return null;

//   const handleAuth = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await fetch(
//         `/api/users/${isLoggingIn ? "login" : "register"}`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ email, password }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Autenticación fallida");
//       }

//       const data = await response.json();
//       localStorage.setItem("authToken", data.token); // Guarda el token en localStorage
//       onClose(); // Cierra el modal después de iniciar sesión
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   return (
//     <div className={style.modaloverlay}>
//       <div className={style.modalConteiner}>
//         <button className={style.modalClose} onClick={onClose}>
//           X
//         </button>
//         <h2>{isLoggingIn ? "Iniciar sesión" : "Registrarse"}</h2>
//         <form onSubmit={handleAuth}>
//           <input
//             className={style.input}
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <input
//             className={style.input}
//             type="password"
//             placeholder="Contraseña"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <div className={style.btnConteiner}>
//             <button className={style.btn} type="submit">
//               Iniciar Sesion
//             </button>
//           </div>
//           <button style={{ marginTop: "10px" }}>
//             Iniciar sesión con Google
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Modal;



//otro tipo 
