import { useEffect, useRef, useState } from "react";
import { addTodosAPI, deleteTodosAPI, getTodosAPI, updateTodosAPI } from "../../api/todos";
import "./index.css";
const Todos = () => {
     const [todos, setTodos] = useState([]);
     const [textBtn, setTextBtn] = useState("THÊM MỚI");
     const todoRef = useRef([])

     //icon
     const iconEdit = "fas fa-edit";
     const iconUserEdit = "fas fa-user-edit";
     const iconTrash = "fas fa-trash";
     const iconSuccess = "fas fa-check";

     //input
     const inputId = document.getElementById("id")
     const inputName = document.getElementById("name")

     useEffect(() => {
          fetchData();
     }, []);

     const fetchData = async () => {
          setTodos(await getTodosAPI())
     }

     const deleteTodo = async (id) => {
          const confirm = window.confirm("Nhiệm vụ không thể khôi phục nếu xóa, Bạn có muốn xóa hay không?")
          if (confirm) {
               await deleteTodosAPI(id)
               window.location.reload()
          }
     }

     const addOrEditTodo = async (event) => {
          event.preventDefault()
          const val = event.target[0].value
          const id = event.target[1].value
          if (id) {
               //update
               await updateTodosAPI({
                    name: val,
                    id: id
               })
               inputId.style.display = "none";
               setTextBtn("THÊM MỚI")
          } else {
               //create
               await addTodosAPI({
                    name: val
               })
          }
          await fetchData()
          inputId.value = null
          inputName.value = ""
          todoRef?.current.forEach((item) => item.className = iconEdit)
     }

     const editTodo = async (id) => {
          todoRef?.current.forEach((item) => {
               if (item.getAttribute("data-id") && item.getAttribute("data-id") !== String(id)) {
                    item.className = iconEdit
               }
          })

          if (todoRef?.current[id].className === iconEdit) {
               todoRef.current[id].className = iconUserEdit
               inputId.style.display = "";
               setTextBtn("CẬP NHẬT")
               inputName.value = todoRef.current[id].getAttribute("data-name")
               inputId.value = id
          } else if (todoRef.current[id].className === iconUserEdit) {
               todoRef.current[id].className = iconEdit
               inputId.style.display = "none";
               setTextBtn("THÊM MỚI")
               inputName.value = ""
               inputId.value = null
          }
     }

     const onIsCompleteTodo = async (todo) => {
          const confirm = window.confirm("Bạn có chắc nhiệm vụ này bạn đã làm xong?")
          if (confirm) {
               const update = {
                    ...todo,
                    isComplete: true
               }
               await updateTodosAPI(update)
               await fetchData()
          }
     }

     return (
          <main id="todolist">
               <h1>
                    Danh sách
                    <span>Việc hôm nay không để ngày mai.</span>
               </h1>

               {
                    todos.length > 0 ? (
                         todos?.map((item, key) => (
                              <li className={item.isComplete ? "done" : ""} key={key}>
                                   <span className="label">{item.name}</span>
                                   <div className="actions">

                                        {!item.isComplete &&
                                             <button className="btn-picto" type="button" onClick={() => editTodo(item.id)}>
                                                  <i
                                                       className={iconEdit}
                                                       ref={element => todoRef.current[item.id] = element}
                                                       data-name={item.name}
                                                       data-id={item.id} />
                                             </button>
                                        }

                                        <button className="btn-picto" type="button" aria-label="Delete" title="Delete" onClick={() => deleteTodo(item.id)}>
                                             <i className={iconTrash} />
                                        </button>

                                        {!item.isComplete &&
                                             <button className="btn-picto" type="button" onClick={() => onIsCompleteTodo(item)} >
                                                  <i className={iconSuccess} />
                                             </button>
                                        }
                                   </div>
                              </li>
                         ))
                    ) : (<p>Danh sách nhiệm vụ trống.</p>)
               }

               <form onSubmit={addOrEditTodo}>
                    <label>Thêm nhiệm vụ mới</label>
                    <input type="text" name="name" id="name" />
                    <input type="text" name="id" id="id" readOnly style={{ display: "none" }} />
                    <button type="submit">{textBtn}</button>
               </form>
          </main >
     );
}

export default Todos