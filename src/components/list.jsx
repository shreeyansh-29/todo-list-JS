import React, {useState, useEffect} from "react";
import "./list.css";
import ListItems from "./listItems";
import axios from "axios";

function List() {
  const [inputList, setInputList] = useState("");
  const [list, setList] = useState([]);

  useEffect(() => {
    const apiCall = async () => {
      await axios
        .get("http://localhost:8080/todos")
        .then((res) => setList(res.data))
        .catch((e) => console.error(e));
    };
    apiCall();
  }, []);

  function itemEvent(event) {
    setInputList(event.target.value);
  }

  async function addItem() {
    try {
      await axios
        .post("http://localhost:8080/todos", {
          item: inputList,
        })
        .then((res) => setList(res.data));
    } catch (e) {
      console.error(e);
    }
    // setList((prevValue) => {
    //   return [...prevValue, inputList];
    // });
    setInputList("");
  }
  async function removeItem(id) {
    const res = axios.delete(`http://localhost:8080/todos/${id}`);
    res.then((res) => setList(res.data)).catch((e) => console.error(e));
  }

  return (
    <>
      <div className="main_div">
        <div className="center_div">
          <br />
          <h1>ToDo List</h1>
          <br />
          <input
            type="text"
            placeholder="Add a Item"
            onChange={itemEvent}
            value={inputList}
          />
          <button onClick={inputList.length !== 0 ? addItem : null}>+</button>

          <ol>
            {list.map((ele) => {
              return (
                <ListItems
                  key={ele.id}
                  value={ele.item}
                  id={ele.id}
                  onSelect={removeItem}
                />
              );
            })}
          </ol>
        </div>
      </div>
    </>
  );
}

export default List;
