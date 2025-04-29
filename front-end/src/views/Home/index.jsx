import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/Button";
import Header from "../../components/Header";
import InputBox from "../../components/InputBox";
import Graph from "../../components/Graph";
import axios from "axios";

function Home() {
  const navigate = useNavigate();

  const [data, setData] = useState(null); // Começa como null, e atualizamos com a resposta

  const [form, setForm] = useState({
    id_monitor: "",
    date: "",
    category: "",
    in_time: "",
    out_time: "",
    served: [],
  });

  const [newServed, setNewServed] = useState("");

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?.id;

      if (!userId) {
        console.error("Usuário não encontrado no localStorage");
        return;
      }

      const response = await axios.get(
        `http://localhost:3000/api/monitores/${userId}/home`
      );

      setData(response.data);
    } catch (error) {
      console.error("Erro ao buscar dados da home:", error);
    }
  };

  const handleRegister = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?.id;

      const formToSend = {
        ...form,
        id_monitor: userId,
      };

      const response = await axios.post(
        "http://localhost:3000/api/atendimentos",
        formToSend
      );

      alert("Atendimento registrado com sucesso!");

      setForm({
        id_monitor: "",
        date: "",
        category: "",
        in_time: "",
        out_time: "",
        served: [],
      });

      // Atualiza os dados da home
      await fetchHomeData();
    } catch (error) {
      console.error("Erro ao registrar atendimento:", error);
      alert(
        "Erro ao registrar atendimento. Verifique os dados e tente novamente."
      );
    }
  };

  // Função para permitir que um componente edite um valor interno do form
  const changeInfo = (key) => (e) => {
    setForm((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  function removeServed(indexToRemove) {
    setForm((prevForm) => ({
      ...prevForm,
      served: prevForm.served.filter((_, index) => index !== indexToRemove),
    }));
  }

  if (!data) {
    return (
      <>
        <Header />
        <div className="h-screen w-screen flex items-center justify-center">
          <p className="text-xl font-semibold">Carregando informações...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="px-[4rem] flex flex-col my-8">
        <h1 className="text-2xl font-bold mb-4">Bem vindo, Monitor</h1>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1 bg-white rounded-2xl p-7 xl:h-[20rem] 2xl:h-[30rem]">
            <div
              className="flex flex-col justify-end h-full bg-cover bg-center rounded-2xl p-4"
              style={{
                backgroundImage: `url(${
                  data.photo || "https://via.placeholder.com/300"
                })`,
              }}
            >
              <div className="bg-white bg-opacity-80 p-2 rounded-md">
                <h1 className="text-xl font-bold">{data.name}</h1>
                <span>{data.subject}</span>
              </div>
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
                <div className="col-span-3 flex flex-col justify-center items-center">
                  <h1 className="text-4xl font-bold">{data.total_trabalho}</h1>
                  <span>Horas trabalhadas nessa semana</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-2 bg-white rounded-2xl p-7 xl:h-[20rem] 2xl:h-[30rem]">
            <div className="flex flex-col h-full w-full">
              <h1 className="text-xl font-bold mb-4">Registrar atendimento</h1>
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-4">
                  <InputBox
                    label="Data"
                    type="date"
                    value={form.date}
                    onChange={changeInfo("date")}
                  ></InputBox>
                </div>
                <div className="col-span-8">
                  <InputBox
                    label="Categoria"
                    type="text"
                    value={form.category}
                    onChange={changeInfo("category")}
                  ></InputBox>
                </div>
                <div className="col-span-3">
                  <div className=" items-end">
                    <InputBox
                      label="Entrada"
                      type="time"
                      value={form.in_time}
                      onChange={changeInfo("in_time")}
                    />
                  </div>
                </div>
                <div className="col-span-3">
                  <div className="items-end">
                    <InputBox
                      label="Saída"
                      type="time"
                      value={form.out_time}
                      onChange={changeInfo("out_time")}
                    />
                  </div>
                </div>
                <div className="col-span-6">
                  <div className="flex flex-row items-end">
                    <div className="w-full">
                      <InputBox
                        label="Alunos atendidos (matricula)"
                        type="text"
                        value={newServed}
                        onChange={(e) => {
                          setNewServed(e.target.value);
                        }}
                      ></InputBox>
                    </div>
                    <div className="flex   h-full ml-2 mb-[.4rem]">
                      <button
                        className="flex justify-center items-center bg-blue-800 h-[1.5rem] w-[1.5rem] rounded-2xl transition duration-300 transform hover:bg-blue-700 hover:scale-105 cursor-pointer"
                        onClick={(e) => {
                          setForm((prev) => ({
                            ...prev,
                            served: [...prev.served, newServed],
                          }));
                          setNewServed("");
                        }}
                      >
                        <i className="pi pi-plus text-white text-sm" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 my-4">
                {form.served.map((student, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-blue-800 text-white text-sm rounded-xl px-3 py-1"
                  >
                    <span className="mr-2">{student}</span>
                    <button
                      onClick={() => removeServed(index)}
                      className="text-white hover:text-red-600 transition"
                    >
                      x
                    </button>
                  </div>
                ))}
              </div>
              <div className="h-full w-full flex justify-center items-end">
                <div
                  onClick={() => {
                    const isNum = /^[0-9]+$/.test(newServed);
                    console.log(!isNum);
                    if (newServed.length < 7 || !isNum) {
                      alert("Matrícula incorreta!");
                      return;
                    }
                    setForm((prev) => ({
                      ...prev,
                      served: [...prev.served, newServed],
                    }));
                    setNewServed("");
                  }}
                ></div>
                <div
                  onClick={() => {
                    handleRegister();
                  }}
                >
                  <Button text="Registrar" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-1 bg-white rounded-2xl p-7 xl:h-[20rem] 2xl:h-[30rem]">
            <h1 className="text-xl font-bold">Configurações</h1>
            <div className="h-full w-full px-6 flex flex-col justify-center items-center gap-12">
              <div
                className="w-full"
                onClick={() => {
                  navigate("atendimentos");
                }}
              >
                <Button text="Editar atendimento"></Button>
              </div>
              <div
                className="w-full"
                onClick={() => {
                  navigate("horarios");
                }}
              >
                <Button text="Editar horários"></Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
