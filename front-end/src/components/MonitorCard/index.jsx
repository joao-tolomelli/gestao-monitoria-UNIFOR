function MonitorCard({ monitor, setUpdateMonitor }) {

  return (
    <div className="flex flex-row justify-between items-center bg-blue-800 text-white text-[.7rem] rounded-xl px-6 py-2">
      <div className="flex flex-col font-normal gap-1">
        <span>Nome: {monitor.name}</span>
        <span>Matricula: {monitor.matricula}</span>
        <span>Disciplina: {monitor.subject}</span>
      </div>
      <div onClick={() => setUpdateMonitor(monitor.id)}>
          <i className="pi pi-info-circle text-white text-base cursor-pointer"></i>
        </div>
    </div>
  );
}

export default MonitorCard;
