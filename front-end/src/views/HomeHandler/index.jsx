import { useState } from "react";
import Button from "../../components/Button";
import Header from "../../components/Header";
import InputBox from "../../components/InputBox";
import Graph from "../../components/Graph";

function HomeHandler() {
  const [data, setData] = useState({
    name: "João Vítor",
    subject: "Física e suas Aplicações",
    workingHours: {
      Monday: "2",
      Tuesday: "4",
      Wednesday: "1",
      Thursday: "0",
      Friday: "6",
    },
    today: "Monday",
  });

  return (
    <>
      <Header />
      <main className="px-[4rem] flex flex-col my-8">
        <h1 className="text-2xl font-bold mb-4">Bem vindo, Monitor</h1>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1 bg-white rounded-2xl p-7 xl:h-[20rem] 2xl:h-[30rem]">
            <div className="flex flex-col justify-end h-full">
              <h1 className="text-xl font-bold">{data.name}</h1>
              <span>{data.subject}</span>
            </div>
          </div>
          <div className="col-span-2 bg-white rounded-2xl p-7 xl:h-[20rem] 2xl:h-[30rem]">
            <div className="flex flex-col h-full">
              <h1 className="text-xl font-bold">Atendimentos</h1>
              <div className="grid grid-cols-8 h-full">
                <Graph
                  workingHours={data.workingHours}
                  today={data.today}
                ></Graph>
                <div className="col-span-3 flex justify-center items-center">
                  <span>Tempo</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-2 bg-white rounded-2xl p-7 xl:h-[20rem] 2xl:h-[30rem]">
            <div className="flex flex-col h-full w-full">
              <h1 className="text-xl font-bold mb-4">Registrar atendimento</h1>
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-4">
                  <InputBox label="Data" type="date"></InputBox>
                </div>
                <div className="col-span-8">
                  <InputBox label="Categoria" type="text"></InputBox>
                </div>
                <div className="col-span-5">
                  <div className="flex flex-row items-end">
                    <InputBox
                      label="Alunos atendidos (matricula)"
                      type="text"
                    ></InputBox>
                    <div className="flex  w-full h-full ml-2 mb-[.4rem]">
                      <button className="flex justify-center items-center bg-blue-800 h-[1.5rem] w-[1.5rem] rounded-2xl transition duration-300 transform hover:bg-blue-700 hover:scale-105 cursor-pointer">
                        <i className="pi pi-plus text-white text-sm" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-full w-full flex justify-center items-end">
                <div>
                  <Button text="Registrar"></Button>
                </div>
              </div>
            </div>
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

export default HomeHandler;
