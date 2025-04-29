import Button from "../../components/Button";
import InputBox from "../../components/InputBox";
import logoUnifor from "../../assets/logo-unifor.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../Services/auth.service";

function Login() {
  const [credentials, setCredentials] = useState({
    matricula: "",
    senha: "",
  });

  const [errorMessage, setErrorMessage] = useState(""); // estado para mensagem de erro
  const navigate = useNavigate();

  const changeInfo = (key) => (e) => {
    setCredentials((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  const handleLogin = async () => {
    try {
      const response = await authService.login(credentials);
      localStorage.setItem("user", JSON.stringify(response.data));
      navigate("/home");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage("Erro ao tentar fazer login.");
      }
    }
  };

  return (
    <main className="grid grid-cols-2 h-screen w-screen">
      <section className="col-span-1 h-full bg-white">
        <div className="flex flex-col h-full justify-center gap-8 px-40">
          <div className="flex flex-col">
            <h1 className="text-3xl font-extrabold text-blue-800">
              Seja bem vindo(a)
            </h1>
            <h2 className="text-xl font-extrabold text-gray-500">
              Por favor, insira seus dados
            </h2>
          </div>

          <div className="flex flex-col w-full gap-4">
            <InputBox label={"Matricula"} onChange={changeInfo("matricula")} />
            <InputBox label={"Senha"} type="password" onChange={changeInfo("senha")} />
          </div>

          <div className="flex flex-col gap-2">
            <div onClick={handleLogin}>
              <Button text="Entrar" />
            </div>

            {/* Exibir erro se existir */}
            {errorMessage && (
              <div className="bg-red-100 text-red-700 border border-red-400 p-3 rounded-md text-center">
                {errorMessage}
              </div>
            )}
          </div>

        </div>
      </section>
      <section className="col-span-1 h-full bg-blue-800">
        <div className="flex flex-col h-full items-center justify-center gap-6">
          <h1 className="text-4xl text-white font-extrabold">
            Monitoria | CCT
          </h1>
          <div>
            <img className="w-[10rem]" src={logoUnifor} alt="Logo Unifor" />
          </div>
          <h1 className="text-4xl text-white font-extrabold">UNIFOR</h1>
        </div>
      </section>
    </main>
  );
}

export default Login;
