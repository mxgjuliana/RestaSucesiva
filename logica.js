
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("botonDividir").addEventListener("click", realizarDivision);
    document.getElementById("dividendo").addEventListener("input", limpiarResultados);
    document.getElementById("divisor").addEventListener("input", limpiarResultados);
  });
  

  const limpiarResultados = () => {
    document.getElementById("mensajeError").textContent = "";
    document.getElementById("resultadoDivision").innerHTML = "";
  };
  
  /**
   * Valida que el valor ingresado sea un número.
   * @param {number} valor - Valor a validar.
   * @param {string} nombreCampo - Nombre del campo (para mensajes de error).
   * @returns {boolean} True si es un número válido.
   */
  const validarNumero = (valor, nombreCampo) => {
    if (valor === null || isNaN(valor)) {
      document.getElementById("mensajeError").textContent = `Ingresa un número válido para ${nombreCampo}.`;
      return false;
    }
    return true;
  };
  
  /**
   * Función que se ejecuta al hacer click en el botón de dividir.
   * Obtiene los valores del DOM, valida la entrada y muestra los pasos de la división.
   */
  const realizarDivision = () => {
    let dividendo = parseInt(document.getElementById("dividendo").value);
    let divisor = parseInt(document.getElementById("divisor").value);
  
    // Validamos que ambos valores sean números válidos
    if (!validarNumero(dividendo, "dividendo") || !validarNumero(divisor, "divisor")) return;

    if (divisor <= 0) {
      document.getElementById("mensajeError").textContent = "El divisor debe ser un número entero positivo mayor a 0.";
      return;
    }
    
    // Obtenemos los pasos de la división
    const pasos = divisionPorRestasSucesivas(dividendo, divisor);
    
    // Mostramos cada paso en el contenedor de resultados
    const resultadoDiv = document.getElementById("resultadoDivision");
    resultadoDiv.innerHTML = "";
    pasos.forEach(paso => {
      const p = document.createElement("p");
      p.textContent = paso;
      resultadoDiv.appendChild(p);
    });
  };
  
  /**
   * Realiza la resta de dos números usando el complemento a dos.
   * @param {number} a - Número desde el cual se resta.
   * @param {number} b - Número que se va a restar.
   * @returns {number} Resultado de a - b.
   */
  function restaBinaria(a, b) {
    // Utiliza el complemento a dos para obtener el negativo de b: (~b + 1)
    return a + ((~b) + 1);
  }
  
  /**
   * Realiza la división de dos números enteros mediante restas sucesivas.
   * Cada resta se realiza utilizando la función 'restaBinaria'.
   * Se retorna un arreglo con los pasos de la operación, mostrando cada iteración 
   * y finalizando con el cociente y el resto, que puede interpretarse como la parte decimal.
   *
   * @param {number} dividendo - Número a dividir.
   * @param {number} divisor - Número divisor.
   * @returns {Array<string>} Lista con los pasos y el resultado final.
   */
  function divisionPorRestasSucesivas(dividendo, divisor) {
    let pasos = [];
    let cociente = 0;
    let valorActual = dividendo;
    
    // Se realizan restas sucesivas mientras el valor actual sea mayor o igual que el divisor
    while (valorActual >= divisor) {
      let resultado = restaBinaria(valorActual, divisor);
      pasos.push(`${valorActual} - ${divisor} = ${resultado}`);
      valorActual = resultado;
      cociente++;

    }
    
    // Se calcula la parte decimal a partir del resto (si lo hubiera)
    let mensajeFinal = `Resultado: ${cociente} sobra ${valorActual}`;
    if (valorActual > 0) {
      let parteDecimal = (valorActual / divisor).toFixed(2);
      mensajeFinal += ` (Parte decimal: ${valorActual}/${divisor} = ${parteDecimal})`;
    }

    
    pasos.push(mensajeFinal);
    return pasos;
  }
  