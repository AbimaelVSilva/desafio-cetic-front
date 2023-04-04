import React from "react";
import { toast } from "react-toastify";
import Button from "../../components/Button";
import TextField from "../../components/TextField";
import AuthService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const handleOnSubmit = async (ev) => {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    const { name, email, password } = Object.fromEntries(formData);

    try {
      await AuthService.register(name, email, password);

      toast.success("Cadastro realizado com sucesso!");

      navigate("/login");
    } catch (err) {
      const msgError = err.response?.data?.message;
      if (msgError[0] === "password too weak") {
        toast.warning("Senha fraca");
      } else toast.error(msgError[0]);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="https://to-do-cdn.microsoft.com/static-assets/c87265a87f887380a04cf21925a56539b29364b51ae53e089c3ee2b2180148c6/icons/logo.png"
            alt="Abimael"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Criar uma nova conta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            <a
              href="#"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sistema de tarefas CETIC
            </a>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleOnSubmit}>
              <TextField
                text="Nome"
                name={"name"}
                type="text"
                placeholder="Seu nome"
              />
              <TextField
                text="Email"
                name={"email"}
                type="email"
                placeholder="nome@email.com"
              />
              <TextField
                text="Senha"
                name={"password"}
                type="password"
                placeholder="Senha"
              />

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <a
                    onClick={()=>{navigate("/login")}}
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    ja possui uma conta?
                  </a>
                </div>
              </div>

              <Button type="submit" text={"Cadastrar"} />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
