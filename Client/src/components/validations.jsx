// //validaciones necesarias para loguearse en el formulario

// function validation(input) {
//   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//   let errors = {};

//   if (!input.email) {
//     errors.email = "Agrega un mail";
//   } else if (!regex.test(input.email)) {
//     //El método .test() es una función en JavaScript que se utiliza para verificar si una cadena de texto (string) cumple con un patrón definido por una expresión regular (regex).
//     errors.email = "El formato del email no es válido";
//   }
//   if (!input.password) {
//     errors.password = "Agrega una contraseña";
//   }
  
//   if (input.password && input.password.length < 6) {
//     errors.password = "Debe tener minimo 6 caracteres u 8";
//   }

//   return errors;
// }

// export default validation;
