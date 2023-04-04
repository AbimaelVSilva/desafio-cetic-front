
import { toast } from "react-toastify";
import AuthService from "../../services/auth.service"
import { useNavigate } from "react-router-dom";
import TextField from "../../components/TextField";
import Button from "../../components/Button";

export default function Signin() {
  const navigate = useNavigate();

  const handleSignup = ()=>{
    navigate("/signup")
  }

  const handleOnSubmit = async (ev) => {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    const { email, password } = Object.fromEntries(formData);

    try {
      const auth = await AuthService.login(email, password);

      toast.success(`Bem vindo, ${auth?.name}`);

      if(auth.access_token){
        navigate("/Home");
        window.location.reload(true);
      }
      
    } catch (err) {
      console.error(err)
      const msgError = err.response?.data?.message;
      if (msgError === "Email address or password provided is incorrect.") {
        toast.warning("Endereço de email ou senha incorreto.");
      } else toast.error(msgError);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="https://to-do-cdn.microsoft.com/static-assets/c87265a87f887380a04cf21925a56539b29364b51ae53e089c3ee2b2180148c6/icons/logo.png"
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Entrar com sua conta
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
                    onClick={handleSignup}
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Cadastrar uma nova conta
                  </a>
                </div>
              </div>

              <div>
              <Button type="submit" text={"Entrar"} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
