import Button from "../../components/Button";
import Header from "../../components/Header";
import MonitorCard from "../../components/MonitorCard";

function AdminHome() {
    const users = [
        {
          usuario_id: 1,
          subject: "Física e suas Aplicações",
          institucional: true,
          name: "João Vítor",
          matricula: "2217300",
          tipo_usuario: "monitor",
          photo: "https://i.imgur.com/abcd1234.png"
        },
        {
          usuario_id: 2,
          subject: "Cálculo Diferencial",
          institucional: true,
          name: "Maria Clara",
          matricula: "2217301",
          tipo_usuario: "monitor",
          photo: "https://i.imgur.com/efgh5678.png"
        },
        {
          usuario_id: 3,
          subject: "Química Geral",
          institucional: false,
          name: "Carlos Eduardo",
          matricula: "2217302",
          tipo_usuario: "aluno",
          photo: "https://i.imgur.com/hijk9012.png"
        },
        {
          usuario_id: 4,
          subject: "Álgebra Linear",
          institucional: true,
          name: "Fernanda Lima",
          matricula: "2217303",
          tipo_usuario: "monitor",
          photo: "https://i.imgur.com/lmno3456.png"
        },
        {
          usuario_id: 5,
          subject: "História do Brasil",
          institucional: false,
          name: "Lucas Martins",
          matricula: "2217304",
          tipo_usuario: "aluno",
          photo: "https://i.imgur.com/pqrs7890.png"
        },
        {
          usuario_id: 6,
          subject: "Programação em Python",
          institucional: true,
          name: "Isabela Souza",
          matricula: "2217305",
          tipo_usuario: "monitor",
          photo: "https://i.imgur.com/tuvw1234.png"
        },
        {
          usuario_id: 7,
          subject: "Estatística Básica",
          institucional: true,
          name: "Thiago Santos",
          matricula: "2217306",
          tipo_usuario: "monitor",
          photo: "https://i.imgur.com/xyza5678.png"
        },
        {
          usuario_id: 8,
          subject: "Geometria Analítica",
          institucional: false,
          name: "Aline Costa",
          matricula: "2217307",
          tipo_usuario: "aluno",
          photo: "https://i.imgur.com/bcde9012.png"
        },
        {
          usuario_id: 9,
          subject: "Literatura Brasileira",
          institucional: false,
          name: "Marcos Paulo",
          matricula: "2217308",
          tipo_usuario: "aluno",
          photo: "https://i.imgur.com/fghi3456.png"
        },
        {
          usuario_id: 10,
          subject: "Biologia Celular",
          institucional: true,
          name: "Juliana Ferreira",
          matricula: "2217309",
          tipo_usuario: "monitor",
          photo: "https://i.imgur.com/jklm7890.png"
        }
      ];
      


  return (
    <>
      <Header />
      <main className="px-[4rem] flex flex-col my-8">
        <h1 className="text-2xl font-bold mb-4">Monitores</h1>
        <section className="grid grid-cols-12 gap-4">
          <div className="col-span-7 bg-white rounded-2xl p-7 flex flex-col gap-8">
            <div className="flex flex-col h-[20rem] overflow-y-scroll gap-3">
            {users.map((user, index) => (
                <div key={index} className="pr-6">
                  <MonitorCard
                    monitor={user}
                    setUpdateMonitor={()=>{alert(user.name)}}
                  />
                </div>
              ))}
            </div>
            <div className="px-40">
              <Button text="Criar novo monitor" />
            </div>
          </div>
          <div className="col-span-5 bg-white rounded-2xl p-7 ">
            <div className="flex flex-col h-full w-full">
              <h1 className="text-xl font-bold mb-4">Informações do monitor</h1>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default AdminHome;
