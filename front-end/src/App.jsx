import Header from "./components/Header";
import Button from "./components/Button";


function App() {
  return (
    <>
      <Header />
      <main className="px-[4rem] flex flex-col my-8">
        <h1 className="text-2xl font-bold mb-4">Bem vindo, Monitor</h1>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1 bg-white rounded-2xl p-7 xl:h-[20rem] 2xl:h-[30rem]">
            <div className="flex flex-col justify-end h-full">
              <h1 className="text-xl font-bold">João Vítor</h1>
              <span>Física e suas Aplicações</span>
            </div>
          </div>
          <div className="col-span-2 bg-white rounded-2xl p-7 xl:h-[20rem] 2xl:h-[30rem]">
            <h1 className="text-xl font-bold">Atendimentos</h1>
            <div className="grid grid-cols-8  h-full">
              <div className="col-span-5 flex justify-center items-center">
                <span>Gráfico</span>
              </div>
              <div className="col-span-3 flex justify-center items-center">
                <span>Tempo</span>
              </div>
            </div>
          </div>
          <div className="col-span-2 bg-white rounded-2xl p-7 xl:h-[20rem] 2xl:h-[30rem]">
            <h1 className="text-xl font-bold">Registrar atendimento</h1>
          </div>
          <div className="col-span-1 bg-white rounded-2xl p-7 xl:h-[20rem] 2xl:h-[30rem]">
            <h1 className="text-xl font-bold">Configurações</h1>
            <div className="h-full w-full px-6 flex flex-col justify-center items-center gap-12">
              <Button text="Editar atendimento"></Button>
              <Button text="Editar horários"></Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
