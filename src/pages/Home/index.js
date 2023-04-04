import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Disclosure } from "@headlessui/react";
import AuthService from "../../services/auth.service";
import {
  PlusIcon,
  Bars3Icon,
  XMarkIcon,
  CalendarDaysIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import ProfileDropdown from "../../components/ProfileDropDown";
import navigation from "../../data/navigation";
import { useNavigate } from "react-router-dom";
import taskService from "../../services/task.service";
import NewTaskForm from "../../components/NewTaskForm";
import EditTaskForm from "../../components/EditTaskForm";
import { toast } from "react-toastify";
import { format, formatISO } from "date-fns";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState("InBox");
  const [taskToEdit, setTaskToEdit] = useState();
  const [tasks, setTasks] = useState({
    all: [],
    done: [],
    unfinished: [],
  });

  const handleEditTask = (todo) => {
    setTaskToEdit(todo);
    setTab("Edit");
  };

  function compareDates(firstObj, nextObj) {
    return new Date(firstObj.expiration) - new Date(nextObj.expiration);
  }

  const getTasks = async () => {
    try {
      const tasksResult = await taskService.tasks(user.access_token);
      const tasksList = tasksResult.data;

      let all = [];

      tasksList.sort(compareDates);

      tasksList.map((i) => {
        i.userId === user.id && all.push(i);
      });

      setTasks({
        ...tasks,
        all,
      });
    } catch (err) {
      toast.error(`Erro: ${err.message}`);
    }
  };

  function formatDate(date) {
    const day = new Date(date);
    day.setDate(day.getDate() + 1);
    return format(day, "dd/MM/yyyy");
  }

  function listDoneTasks() {
    let done = [];
    let unfinished = [];

    tasks.all.map((i) => {
      if (i.completed === true) {
        console.log(i);
        done.push(i);
      } else {
        unfinished.push(i);
      }
    });

    setTasks({
      ...tasks,
      done,
      unfinished,
    });
  }

  const logOut = () => {
    AuthService.logout();
    navigate("/login");
  };

  function handleDeleteTask(id) {
    try {
      taskService.delete(user.access_token, id);
      toast.success("Tarefa excluida com sucesso.");
      navigate(0);
    } catch (err) {
      toast.error(`Erro: ${err.message}`);
    }
  }

  const handleClickMenu = (option) => {
    setTab(option);
    listDoneTasks();
  };

  function isExpired(value) {
    const expDate = new Date(value);
    expDate.setDate(expDate.getDate() + 1);

    if (
      formatISO(expDate, { format: "basic" }) >
      formatISO(Date.now(), { format: "basic" })
    ) {
      return false;
    } else {
      return true;
    }
  }

  const handleTaskIsDone = async (id, status) => {
    const access_token = user.access_token;

    try {
      await taskService.changeStatus(access_token, id, status);
      navigate(0);
    } catch (err) {
      toast.error(`Erro: ${err.message}`);
    }
  };

  user.imageUrl = "https://cdn-icons-png.flaticon.com/512/4837/4837857.png";

  function Inbox(props) {
    return (
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <ul role="list" className="divide-y divide-gray-200">
          {props?.data.map((todo) => (
            <li
              key={todo.title}
              className="flex py-4 grid grid-flow-col gap-x-2"
            >
              <div class="w-[500px]">
                <div className="flex h-6 items-center ml-3">
                  <input
                    id="candidates"
                    aria-describedby="candidates-description"
                    name="candidates"
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() =>
                      handleTaskIsDone(todo.id, todo.completed ? false : true)
                    }
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                </div>
                <div className="ml-3">
                  <p
                    className={`text-lg font-semibold text-gray-${
                      todo.completed ? "500 line-through" : "900"
                    }`}
                  >
                    {todo.title}
                  </p>
                  <p className="text-sm text-gray-500">{todo.description}</p>
                  <div class="flex">
                    <CalendarDaysIcon class="h-6 w-6 text-gray-500" />
                    <p
                      className={`flex items-center text-sm ${
                        isExpired(todo.expiration)
                          ? "text-red-600"
                          : "text-gray-500"
                      } ml-2`}
                    >
                      {`Expira em ${formatDate(todo.expiration)}`}
                    </p>
                  </div>
                </div>
              </div>
              <div class="flex items-center grid grid-flow-col gap-x-1 w-24 ml-7 px-1 py-2">
                <button type="button" onClick={handleEditTask}>
                  <PencilSquareIcon className="h-6 w-6 text-gray-500" />
                </button>
                <button type="button" onClick={() => handleDeleteTask(todo.id)}>
                  <TrashIcon className="h-6 w-6 text-gray-500" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  useEffect(() => {
    getTasks();
    //console.log(tasks)
  }, []);

  return (
    <div className="min-h-full">
      <Disclosure as="nav" className="border-b border-gray-200 bg-white">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 justify-between">
                <div className="flex">
                  <div className="flex flex-shrink-0 items-center">
                    <img
                      className="block h-8 w-auto lg:hidden"
                      src="https://to-do-cdn.microsoft.com/static-assets/c87265a87f887380a04cf21925a56539b29364b51ae53e089c3ee2b2180148c6/icons/logo.png"
                      alt="Your Company"
                    />
                    <img
                      className="hidden h-8 w-auto lg:block"
                      src="https://to-do-cdn.microsoft.com/static-assets/c87265a87f887380a04cf21925a56539b29364b51ae53e089c3ee2b2180148c6/icons/logo.png"
                      alt="Your Company"
                    />
                  </div>
                  <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        onClick={() => {
                          handleClickMenu(item.name);
                        }}
                        className={classNames(
                          tab === item.name
                            ? "border-indigo-500 text-gray-900"
                            : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                          "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:items-center">
                  <button
                    type="button"
                    onClick={() => setTab("Nova Tarefa")}
                    className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <span className="sr-only">Nova tarefa</span>

                    <PlusIcon className="h-6 w-6 text-gray-500" />
                  </button>
                  <ProfileDropdown />
                </div>
                <div className="-mr-2 flex items-center sm:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 pb-3 pt-2">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                        : "border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800",
                      "block border-l-4 py-2 pl-3 pr-4 text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
              <div className="border-t border-gray-200 pb-3 pt-4">
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={user.imageUrl}
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">
                      {user.name}
                    </div>
                    <div className="text-sm font-medium text-gray-500">
                      {user.email}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setTab("Nova Tarefa");
                    }}
                    className="ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <span className="sr-only">Adicionar nova tarefa</span>
                    <PlusIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-3 space-y-1">
                  <Disclosure.Button
                    key="Sair"
                    as="a"
                    onClick={logOut}
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                  >
                    Sair
                  </Disclosure.Button>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <div className="py-10">
        <header>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
              Tarefas
            </h1>
          </div>
        </header>
        <main>
          {tab === "InBox" && <Inbox data={tasks.all} />}
          {tab === "Concluidas" && <Inbox data={tasks.done} />}
          {tab === "Pendentes" && <Inbox data={tasks.unfinished} />}
          {tab === "Nova Tarefa" && <NewTaskForm />}
          {tab === "Edit" && <EditTaskForm todo={taskToEdit} />}
        </main>
      </div>
    </div>
  );
}
