const esTextoValido = (texto) => {
    if (typeof texto !== 'string') return false;
    return texto.trim().length > 0;
};

const limpiarTexto = (texto) => {
    return typeof texto === 'string' ? texto.trim().toLowerCase() : '';
};

module.exports = {
    esTextoValido,
    limpiarTexto
};