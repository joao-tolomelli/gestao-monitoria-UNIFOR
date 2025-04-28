function ServiceCard({service, setUpdateService}) {
  return (
    <div className="flex flex-row justify-between items-center bg-blue-800 text-white text-[.7rem] rounded-xl px-6 py-2">
      <div className="flex flex-col font-normal gap-1">
        <span>Data: {service.date}</span>
        <span>Categoria:  {service.category}</span>
        <div className="flex flex-row gap-6">
          <span>Entrada:  {service.inTime}</span>
          <span>Saída:  {service.outTime}</span>
        </div>
        <span>Alunos: {service.served.length}</span>
      </div>
      <div onClick={()=>{setUpdateService(service.id)}}>
        <i className="pi pi-file-edit text-white text-base cursor-pointer"></i>
      </div>
    </div>
  );
}

export default ServiceCard;
