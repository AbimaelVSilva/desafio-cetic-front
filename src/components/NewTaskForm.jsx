import { useState } from "react";
import formatISO from "date-fns/formatISO";
import TextField from "./TextField";
import Datepicker from "react-tailwindcss-datepicker";
import taskService from "../services/task.service";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function NewTaskForm(edit) {

  console.log(edit);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [dateValue, setDateValue] = useState({
    startDate: null,
    endDate: null,
  });

  const handleDateValueChange = (newDateValue) => {
    setDateValue(newDateValue);
  };

  const handleOnSubmit = async (ev) => {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    const { title, description } = Object.fromEntries(formData);

    const completed = false;
    const userId = user.id;
    const token = user.access_token;

    const date = dateValue.startDate;

    const expiration = formatISO(new Date(date), { formate: "basic" });

    console.log("Expiration: ", expiration);

    try {
      await taskService.create(
        token,
        title,
        description,
        completed,
        expiration,
        userId
      );

      navigate(0);

      toast.success("cadastro realizado com sucesso!");
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 ml-5 mr-5 mt-5">
      <form className="space-y-6" onSubmit={handleOnSubmit}>
        <TextField
          text="Titulo"
          name="title"
          type="text"
          placeholder="Titulo da tarefa"
        />

        <div className="col-span-full">
          <label
            htmlFor="about"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Descrição
          </label>
          <div className="mt-2">
            <textarea
              id="about"
              name="description"
              rows={3}
              className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <Datepicker
            minDate={new Date(Date.now)} 
            primaryColor={"blue"}
            useRange={false}
            asSingle={true}
            value={dateValue}
            onChange={handleDateValueChange}
            displayFormat={"DD/MM/YYYY"}
          />
        </div>
        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          <button
            type="submit"
            className="inline-flex w-full justify-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 sm:ml-3 sm:w-auto"
          >
            Salvar
          </button>
          <button
            type="button"
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
