import React from "react";
import { Link } from "react-router-dom";

interface MemberEntity {
  id: string;
  login: string;
  avatar_url: string;
}

interface BusquedaContext {
  text: string;
  setText: (text: string) => void;
}

const MyContext = React.createContext<BusquedaContext>({
  text: "lemoncode",
  setText: (text: string) => {},
}); // Creamos un contexto para el valor del input y la función que lo cambia

export const MyContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [text, setText] = React.useState<string>("lemoncode"); // Nuevo estado para el valor del input
  return (
    <MyContext.Provider value={{ text, setText }}>
      {children}
    </MyContext.Provider>
  );
}

export const ListPage: React.FC = () => {
  const [members, setMembers] = React.useState<MemberEntity[]>([]);
  //definimos el contexto
  const { text, setText } = React.useContext(MyContext);
  //pasamos el valor del contexto al input para que si cambiamos de vista se mantenga el valor del input
  const [inputValue, setInputValue] = React.useState<string>(text); // Nuevo estado para el valor del input
  const [triggerFetch, setTriggerFetch] = React.useState<boolean>(false); //controlamos el click para hacer llamada a la API
  
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
    console.log("valor de input", inputValue);
    console.log("valor de text", text);
    setTriggerFetch(true); // Establece triggerFetch a true cuando se hace clic en el botón
    
  };

  return (
    <>
      <h2>Hello from List page</h2>+{" "}
      <input type="text" value={inputValue}  onChange={e =>  setInputValue(e.target.value)} ></input>
      <button onClick={llamadaApi}>Buscar</button>
      <div className="list-user-list-container">
        <span className="list-header">Avatar</span>
        <span className="list-header">Id</span>
        <span className="list-header">Name</span>
        {members.map((member) => (
          <>
            <img src={member.avatar_url} />
            <span>{member.id}</span>
            <Link to={`/detail/${member.login}`}>{member.login}</Link>
          </>
        ))}
      </div>
      <Link to="/detail">Navigate to detail page</Link>
    </>
  );
};
