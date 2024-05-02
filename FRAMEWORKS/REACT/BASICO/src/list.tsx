import React from "react";
import { Link, json } from "react-router-dom";
import Pagination from "@mui/material/Pagination";

interface MemberEntity {
  id: string;
  login: string;
  avatar_url: string;
}

interface BusquedaContext {
  text: string;
  setText: (text: string) => void;
}
//Creamos contexto
const MyContext = React.createContext<BusquedaContext>({
  text: "lemoncode",
  setText: (text: string) => {},
}); // Creamos un contexto para el valor del input y la función que lo cambia

//Asignamos valor al contexto
export const MyContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [text, setText] = React.useState<string>("lemoncode"); // Nuevo estado para el valor del input
  return (
    <MyContext.Provider value={{ text, setText }}>
      {children}
    </MyContext.Provider>
  );
};

export const ListPage: React.FC = () => {
  const [members, setMembers] = React.useState<MemberEntity[]>([]);
  //consumimos el contexto
  const { text, setText } = React.useContext(MyContext);
  //pasamos el valor del contexto al input para que si cambiamos de vista se mantenga el valor del input
  const [inputValue, setInputValue] = React.useState<string>(text); // Nuevo estado para el valor del input
  const [triggerFetch, setTriggerFetch] = React.useState<boolean>(false); //controlamos el click para hacer llamada a la API
  const [page, setPage] = React.useState<number>(1);

  // Llamada a la API al montar el componente
  React.useEffect(() => {
    fetch(`https://api.github.com/orgs/${text}/members`)
      .then((response) => response.json())
      .then((json) => setMembers(json));
  }, []);
  // Llamada a la API cuando triggerFetch cambia a true
  React.useEffect(() => {
    if (triggerFetch) {
      fetch(`https://api.github.com/orgs/${text}/members`)
        .then((response) => response.json())
        .then((json) => setMembers(json));
      setTriggerFetch(false); // Restablece triggerFetch a false después de la llamada a la API
    }
  }, [triggerFetch]);
  const llamadaApi = () => {
    setText(inputValue); // Establece el valor del input en el contexto
    setTriggerFetch(true); // Establece triggerFetch a true cuando se hace clic en el botón
  };
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  // Calcula los miembros que se deben mostrar en la página actual
  const membersToShow = members.slice((page - 1) * 10, page * 10);
  return (
    <>
      <h2>Hello from List page</h2>+{" "}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      ></input>
      <button onClick={llamadaApi}>Buscar</button>
      <div className="list-user-list-container">
        <span className="list-header">Avatar</span>
        <span className="list-header">Id</span>
        <span className="list-header">Name</span>
        {Array.isArray(members) &&
          membersToShow.map((member) => (
            <>
              <img src={member.avatar_url} />
              <span>{member.id}</span>
              <Link to={`/detail/${member.login}`}>{member.login}</Link>
            </>
          ))}
      </div>
      <Pagination
        count={Math.ceil(members.length / 10)}
        page={page}
        onChange={handleChange}
      />
      <Link to="/detail">Navigate to detail page</Link>
    </>
  );
};
