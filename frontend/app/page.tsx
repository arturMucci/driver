"use client";
import ErrorToast from "./components/ErrorToast";
import { useEstimateForm } from "./hooks/useEstimate.context";
import { IFormEvent } from "./interfaces";
// import { redirect } from "next/navigation";

export default function Home() {
  const {
    formData: { customerId, origin, destination },
    setFormData,
    setResData,
    setError,
    setMessage,
  } = useEstimateForm();

  async function handleSubmit(e: IFormEvent) {
    e.preventDefault();

    const response = await fetch("http://localhost:8080/ride/estimate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ customer_id: customerId, origin, destination }),
    });

    const resData = await response.json();

    console.log({ customer_id: customerId, origin, destination });
    console.log(await resData);

    if (resData.status_code === 400) {
      setResData(resData);
      setMessage(resData.error_description);
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }

    // redirect("/confirm");
  }

  return (
    <main className="flex flex-col relative items-center justify-center bg-[#494949] grow">
      <div className="flex flex-col gap-[1rem]">
        <form className="flex flex-col items-center gap-[2rem] w-fit rounded-md py-[0.5rem] px-[1rem] shadow-[0rem_0.3rem_0.5rem_0_rgb(150,150,150)]">
          <div className="flex flex-col gap-[1rem]">
            <label className="w-full self-start text-xs text-[#58bc82] font-[600]">
              <span className="w-full flex flex-col gap-[0.5rem]">
                Id de Usuário:
              </span>
              <input
                type="text"
                className="rounded-md outline-2 outline-[#58bc82] focus:outline-2 w-full pl-[0.3rem] py-[0.2rem] shadow-md shadow-[#969696]"
                onChange={({ target: { value } }) => {
                  setFormData({ customerId: value, origin, destination });
                }}
              />
            </label>
            <label className="w-full self-start text-xs text-[#58bc82] font-[600]">
              <span className="w-full flex flex-col gap-[0.5rem]">
                Local de Origem:
              </span>
              <input
                type="text"
                className="rounded-md focus:outline-[#58bc82] w-full pl-[0.3rem] py-[0.2rem] shadow-md shadow-[#969696]"
                onChange={({ target: { value } }) => {
                  setFormData({ customerId, origin: value, destination });
                }}
              />
            </label>
            <label className="w-full self-start text-xs text-[#58bc82] font-[600]">
              <span className="w-full flex flex-col gap-[0.5rem]">
                Local de destino:
              </span>
              <input
                type="text"
                className="rounded-md focus:outline-[#58bc82] w-full pl-[0.3rem] py-[0.2rem]  shadow-md shadow-[#969696]"
                onChange={({ target: { value } }) => {
                  setFormData({ customerId, origin, destination: value });
                }}
              />
            </label>
          </div>
          <button
            type="submit"
            className="bg-[#07a776] hover:brightness-[1.20] transition-all duration-300 rounded-md px-[1.2rem] py-[0.1rem] font-bold text-white shadow-md shadow-[#969696] text-xs"
            onClick={(e) => handleSubmit(e)}
          >
            Consultar
          </button>
        </form>
        <ErrorToast />
      </div>
    </main>
  );
}
