function ServiceCard({ service, setUpdateService, showInfo }) {
  const formattedDate = new Date(service.date).toLocaleDateString("pt-BR");
  const formattedInTime = service.in_time?.slice(0, 5);
  const formattedOutTime = service.out_time?.slice(0, 5);

  return (
    <div className="flex flex-row justify-between items-center bg-blue-800 text-white text-[.7rem] rounded-xl px-6 py-2">
      <div className="flex flex-col font-normal gap-1">
        <span>Data: {formattedDate}</span>
        <span>Categoria: {service.category}</span>
        <div className="flex flex-row gap-6">
          <span>Entrada: {formattedInTime}</span>
          <span>Saída: {formattedOutTime}</span>
        </div>
        <span>Alunos: {service.served.length}</span>
      </div>
      {setUpdateService ? (
        <div onClick={() => setUpdateService(service.id)}>
          <i className="pi pi-file-edit text-white text-base cursor-pointer"></i>
        </div>
      ) : (
        <div onClick={() => showInfo(service.id)}>
          <i className="pi pi-info-circle text-white text-base cursor-pointer"></i>
        </div>
      )}
    </div>
  );
}

export default ServiceCard;
