function GraphHoursLabel({ hours }) {
  
    function converterMinutosEmString(valor) {
    const horas = Math.floor(valor/60);

    const minutos =  parseInt(((valor/60) - horas)*60);

    // Retorna a string no formato "Xh Ymin"
    return `${horas}h ${minutos}min`;
  }


  return (
    <div className="bg-[#044CF4] px-2 py-1 rounded-2xl mb-3">
      <h1 className="text-white text-sm font-medium">{converterMinutosEmString(hours)}</h1>
    </div>
  );
}

export default GraphHoursLabel;
