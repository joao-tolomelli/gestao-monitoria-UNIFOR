function GraphHoursLabel({ hours }) {
  
    function converterHorasEmString(valor) {
    // Parte inteira do valor (horas)
    const horas = Math.floor(valor);

    // Parte decimal multiplicada por 60 para obter os minutos
    const minutos = Math.round((valor - horas) * 60);

    // Retorna a string no formato "Xh Ymin"
    return `${horas}h ${minutos}min`;
  }


  return (
    <div className="bg-[#044CF4] px-2 py-1 rounded-2xl mb-3">
      <h1 className="text-white text-sm font-medium">{converterHorasEmString(hours)}</h1>
    </div>
  );
}

export default GraphHoursLabel;
