import { useState } from "react";
import Header from "../../components/Header";
import InputBox from "../../components/InputBox";
import ServiceCard from "../../components/ServiceCard";
import Button from "../../components/Button";

function Services() {
  const [services, setServices] = useState([
    {
      id: 1,
      id_monitor: 12,
      date: "2025-04-28",
      category: "Tira dúvidas",
      inTime: "19:15",
      outTime: "21:15",
      served: ["2217309", "2217308"],
    },
    {
      id: 2,
      id_monitor: 12,
      date: "2025-04-28",
      category: "Tira dúvidas",
      inTime: "19:15",
      outTime: "21:15",
      served: ["2217309", "2217308"],
    },
    {
      id: 3,
      id_monitor: 12,
      date: "2025-04-28",
      category: "Tira dúvidas",
      inTime: "19:15",
      outTime: "21:15",
      served: ["2217309", "2217308"],
    },
    {
      id: 4,
      id_monitor: 12,
      date: "2025-04-28",
      category: "Tira dúvidas",
      inTime: "19:15",
      outTime: "21:15",
      served: ["2217309", "2217308"],
    },
  ]);

  const [form, setForm] = useState({
    id: "",
    id_monitor: "",
    date: "",
    category: "",
    inTime: "",
    outTime: "",
    served: [],
  });

  const [newServed, setNewServed] = useState("");

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
                      value={form.inTime}
                      onChange={changeInfo("inTime")}
                    />
                  </div>
                </div>
                <div className="col-span-3">
                  <div className="items-end">
                    <InputBox
                      label="Saída"
                      type="time"
                      value={form.outTime}
                      onChange={changeInfo("outTime")}
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
                  onClick={() => {
                    const updatedFormIndex = services.findIndex(
                      (service) => service.id === form.id
                    );

                    services[updatedFormIndex] = form;

                    setForm({
                      id: "",
                      id_monitor: "",
                      date: "",
                      category: "",
                      inTime: "",
                      outTime: "",
                      served: [],
                    });
                  }}
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
