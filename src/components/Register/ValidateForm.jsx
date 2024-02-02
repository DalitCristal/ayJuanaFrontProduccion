export const validateForm = async (formData) => {
  const nameRegex = /^[A-Za-zñÑ\s]+$/;
  if (
    !nameRegex.test(formData.first_name) ||
    !nameRegex.test(formData.last_name)
  ) {
    return "El nombre y el apellido solo pueden contener letras.";
  }

  const ageValue = parseInt(formData.age, 10);
  if (isNaN(ageValue) || ageValue < 16) {
    return "Debes ser mayor de 16";
  }

  if (isNaN(ageValue) || ageValue > 105) {
    return "Debes ser menor de 105";
  }

  if (isNaN(ageValue) || ageValue < 0) {
    return "La edad debe ser un número positivo.";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    return "El correo electrónico no tiene un formato válido.";
  }

  if (formData.password !== formData.confirmPassword) {
    return "Las contraseñas no coinciden.";
  }

  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;
  if (!passwordRegex.test(formData.password)) {
    return "La contraseña debe tener al menos 6 caracteres, incluir al menos una mayúscula, al menos una minúscula y al menos un número.";
  }

  // Si no hay errores
  return null;
};
