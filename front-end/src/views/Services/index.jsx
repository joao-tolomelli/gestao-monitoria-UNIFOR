import { useEffect, useState } from "react";
import Header from "../../components/Header";
import InputBox from "../../components/InputBox";
import ServiceCard from "../../components/ServiceCard";
import Button from "../../components/Button";
import axios from "axios";

function Services() {
  const [services, setServices] = useState(null);
  const [newServed, setNewServed] = useState("");

  const [form, setForm] = useState({
    id: "",
    id_monitor: "",
    date: "",
    category: "",
    in_time: "",
    out_time: "",
    served: [],
  });

  useEffect(() => {
    fetchServicesData();
  }, []);

  const fetchServicesData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?.id;

      if (!userId) {
        console.error("Usuário não encontrado no localStorage");
        return;
      }

      const response = await axios.get(
        `http://localhost:3000/api/atendimentos/monitor/${userId}`
      );

      setServices(response.data);
    } catch (error) {
      console.error("Erro ao buscar dados da home:", error);
    }
  };

  const updateService = async () => {
    try {
      const payload = {
        date: form.date,
        in_time: form.in_time,
        out_time: form.out_time,
        category: form.category,
        served: form.served,
      };
  
      await axios.put(`http://localhost:3000/api/atendimentos/${form.id}`, payload);
  
      // Atualiza a lista local após a atualização no banco
      await fetchServicesData();
  
      // Limpa o formulário
      setForm({
        id: "",
        id_monitor: "",
        date: "",
        category: "",
        in_time: "",
        out_time: "",
        served: [],
      });
  
      alert("Atendimento atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar atendimento:", error);
      alert("Erro ao atualizar atendimento.");
    }
  }


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

  function setUpdateService(id) {
    const currentForm = services.find((service) => service.id === id);
    setForm(currentForm);
  }

  if (!services) {
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
        <h1 className="text-2xl font-bold mb-4">Atendimentos</h1>
        <section className="grid grid-cols-12 gap-4">
          <div className="col-span-6 bg-white rounded-2xl p-7 xl:h-[20rem] 2xl:h-[30rem]">
            <div className="flex flex-col h-full overflow-y-scroll gap-3">
              {services.map((service, index) => (
                <div key={index} className="pr-6">
                  <ServiceCard
                    service={service}
                    setUpdateService={setUpdateService}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-6 bg-white rounded-2xl p-7 xl:h-[20rem] 2xl:h-[30rem]">
            <div className="flex flex-col h-full w-full">
              <h1 className="text-xl font-bold mb-4">Atualizar atendimento</h1>
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
                  onClick={() => {updateService()}}
                >
                  <Button text="Atualizar"></Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Services;
