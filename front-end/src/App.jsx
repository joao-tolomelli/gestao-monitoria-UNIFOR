import logoUnifor from "./assets/logo-unifor.svg"

function App() {
  return (
    <>
      <div className="bg-blue-800 rounded-b-xl px-[4rem] py-[1rem] flex flex-row justify-between">
        <div>
          <img className="w-[2.5rem]" src={logoUnifor} alt="Logo Unifor" />
        </div>
        <h1>profile</h1>
      </div>
    </>
  );
}

export default App;
