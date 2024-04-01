import { memo, useEffect, useRef, useState } from "react";
import ReactPaginate from 'react-paginate';
import { addMenusAPI, deleteMenusAPI, getMenusAPI, updateMenusAPI } from "../../../api/menus";
import "./style.css";

const Menus = () => {
     const [menus, setMenus] = useState([]);
     const [idValue, setIdValue] = useState("");
     const [nameValue, setNameValue] = useState("");
     const [isShowValue, setIsShowValue] = useState("true");
     const menuRef = useRef([]);
     const [pageNumber, setPageNumber] = useState(0);
     const [menusPerPage, setMenusPerPage] = useState(2) // Số menu mỗi trang
     const formEdit = document.getElementById("form-edit")
     const [searchQuery, setSearchQuery] = useState("");
     const [filteredMenus, setFilteredMenus] = useState([]);

     useEffect(() => {
          fetchData();
     }, [menus]);

     useEffect(() => {
          // Lọc danh sách menus dựa trên searchQuery
          const filtered = menus.filter(menu =>
               menu.name.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setFilteredMenus(filtered);
     }, [searchQuery, menus]); // Sử dụng menus trong dependency array

     const pageCount = filteredMenus && filteredMenus.length > 0 ? Math.ceil(filteredMenus.length / menusPerPage) : 0;

     const fetchData = async () => {
          const fetchedMenus = await getMenusAPI();
          setMenus(fetchedMenus);
     };

     const handleSearchChange = event => {
          if (pageNumber !== 0) {
               handlePageClick({
                    selected: 0
               })
          }
          setSearchQuery(event.target.value);
     };

     const handlePageClick = ({ selected }) => {
          setPageNumber(selected);
     };

     const handleMenusPerPage = event => {
          setMenusPerPage(event.target.value);
     }

     const displayMenus = filteredMenus && filteredMenus.length > 0 ? (
          filteredMenus
               .slice(pageNumber * menusPerPage, (pageNumber + 1) * menusPerPage)
               .map((item, index) => (
                    <tr key={index}>
                         <td>{item.id}</td>
                         <td>{item.name}</td>
                         <td>
                              <button type="button" className={`btn btn-${item.isShow ? 'success' : 'danger'} btn-lg`}>
                                   {item.isShow ? 'Có hiển thị' : 'Không hiển thị'}
                              </button>
                         </td>
                         <td>
                              <button onClick={() => editMenu(item)} type="button" className="btn btn-info btn-lg me-2" ref={element => menuRef.current[item.id] = element}>
                                   <i className="mdi mdi-tooltip-edit" />
                              </button>
                              <button type="button" className="btn btn-danger btn-lg" onClick={() => deleteMenu(item.id)}>
                                   <i className="mdi mdi-delete-forever"></i>
                              </button>
                         </td>
                    </tr>
               ))
     ) : (
          <tr>
               <td colSpan="4">Menus Loading...</td>
          </tr>
     );


     const editMenu = (item) => {
          formEdit.style.display = ""
          setIdValue(item.id);
          setNameValue(item.name);
          setIsShowValue(item.isShow.toString());
     };

     const updateMenu = async (event) => {
          event.preventDefault();
          if (idValue === "Tự động thêm") {
               await addMenusAPI({
                    name: nameValue,
                    isShow: isShowValue === "true"
               });
               document.getElementById("buttonAddOrEdit").innerHTML = "Cập nhật"
               // Tính toán lại trang cuối cùng
               const newPageCount = Math.ceil((menus.length + 1) / menusPerPage);

               // Cập nhật trang hiện tại
               setPageNumber(newPageCount - 1);
          } else {
               await updateMenusAPI(idValue, {
                    id: idValue,
                    name: nameValue,
                    isShow: isShowValue === "true"
               });
          }
          await fetchData();
          setIdValue("");
          setNameValue("");
          setIsShowValue("true");
          formEdit.style.display = "none";
     };

     const addMenu = async () => {
          setIdValue("Tự động thêm");
          setNameValue("");
          setIsShowValue("true");
          formEdit.style.display = "";
          document.getElementById("buttonAddOrEdit").innerHTML = "Thêm"
     };

     const deleteMenu = async (id) => {
          const confirm = window.confirm("Bạn có chắc muốn xóa menu này?");
          if (confirm) {
               await deleteMenusAPI(id);
               await fetchData();

               // Kiểm tra nếu là phần tử cuối cùng trong trang cuối cùng
               const lastPageIndex = Math.ceil(menus.length / menusPerPage) - 1;
               const isLastItemInLastPage = pageNumber === lastPageIndex && menus.length % menusPerPage === 1;

               if (isLastItemInLastPage) {
                    // Giảm số trang hiện tại đi một đơn vị
                    setPageNumber(pageNumber - 1);
               }
          }
     };

     return (
          <div className="page-wrapper">
               <div className="page-breadcrumb">
                    <div className="row">
                         <div className="col-12 d-flex no-block align-items-center">
                              <h4 className="page-title">Menus</h4>
                              <div className="ms-auto text-end">
                                   <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb">
                                             <li className="breadcrumb-item"><a href="/">Home</a></li>
                                             <li className="breadcrumb-item active" aria-current="page">Menus</li>
                                        </ol>
                                   </nav>
                              </div>
                         </div>
                    </div>
               </div>
               <div className="container-fluid">
                    <div className="row">
                         <div className="col-12">
                              <div className="card">
                                   <div className="card-body">
                                        <div className="table-responsive">
                                             <div className="row">
                                                  <div className="col-md-6 pb-2">
                                                       <h5 className="card-title">Menus Datatable</h5>
                                                  </div>
                                                  <div className="col-md-6">
                                                       {
                                                            menus ? (
                                                                 <button className="btn btn-info" onClick={addMenu}>Thêm menu</button>
                                                            ) : (
                                                                 <div>Connect Database Loading...</div>
                                                            )
                                                       }
                                                  </div>
                                                  <div className="col-md-6 pb-2">
                                                       <div className="input-group" id="zero_config_length">
                                                            <div className="input-group-append">
                                                                 <span className="input-group-text">Show entries</span>
                                                            </div>
                                                            <select
                                                                 value={menusPerPage}
                                                                 onChange={handleMenusPerPage}
                                                                 name="zero_config_length"
                                                                 aria-controls="zero_config"
                                                                 className="form-select form-select-sm" // Thêm lớp CSS cho select
                                                                 style={{ width: '100px' }} // Đặt chiều rộng cho select
                                                            >
                                                                 <option value={2}>2</option>
                                                                 <option value={5}>5</option>
                                                                 <option value={10}>10</option>
                                                                 <option value={20}>20</option>
                                                            </select>

                                                       </div>
                                                  </div>
                                                  <div className="col-md-6 pb-2">
                                                       <div className="input-group">
                                                            <input
                                                                 type="text"
                                                                 value={searchQuery}
                                                                 onChange={handleSearchChange}
                                                                 placeholder="Searching..."
                                                                 className="form-control"
                                                            />
                                                            <div className="input-group-append">
                                                                 <span className="input-group-text"><i className="fas fa-search"></i></span>
                                                            </div>
                                                       </div>
                                                  </div>
                                             </div>
                                             <div className="row">
                                                  <div className="col-md-12">
                                                       <table id="zero_config" className="table table-striped table-bordered">
                                                            <thead>
                                                                 <tr>
                                                                      <th>Id</th>
                                                                      <th>Tên menu</th>
                                                                      <th>Hiển thị trên web</th>
                                                                      <th>Actions</th>
                                                                 </tr>
                                                            </thead>
                                                            <tbody>{displayMenus}</tbody>
                                                       </table>
                                                  </div>
                                             </div>
                                             <div id="form-edit" className="pt-2 pb-4" style={{ display: "none" }}>
                                                  <form onSubmit={updateMenu}>
                                                       <div className="row">
                                                            <div className="col-md-3"><input type="text" value={idValue} onChange={(e) => setIdValue(e.target.value)} className="form-control" id="id" readOnly /></div>
                                                            <div className="col-md-3"><input type="text" value={nameValue} onChange={(e) => setNameValue(e.target.value)} className="form-control" id="name" /></div>
                                                            <div className="col-md-3">
                                                                 <select
                                                                      className="form-select"
                                                                      name="isShow"
                                                                      value={isShowValue}
                                                                      onChange={(e) => setIsShowValue(e.target.value)}
                                                                 >
                                                                      <option value="true">Có</option>
                                                                      <option value="false">Không</option>
                                                                 </select>
                                                            </div>
                                                            <div className="col-md-3"><button type="submit" className="btn btn-success" id="buttonAddOrEdit">Cập nhật</button></div>
                                                       </div>
                                                  </form>
                                             </div>
                                             {
                                                  menus && menus.length > 0 ? (
                                                       <div className="row">
                                                            <div className="col-md-4"></div>
                                                            <div className="col-md-4">
                                                                 <ReactPaginate
                                                                      previousLabel={'Previous'}
                                                                      nextLabel={'Next'}
                                                                      breakLabel={'...'}
                                                                      pageCount={pageCount}
                                                                      onPageChange={handlePageClick}
                                                                      containerClassName={'pagination'}
                                                                      previousLinkClassName={'page-link'}
                                                                      nextLinkClassName={'page-link'}
                                                                      disabledClassName={'page-item disabled'}
                                                                      activeClassName={'active'}
                                                                 />
                                                            </div>
                                                            <div className="col-md-4"></div>
                                                       </div>
                                                  ) : (
                                                       <div>Paginate Loading...</div>
                                                  )
                                             }
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     );
}

export default memo(Menus);
