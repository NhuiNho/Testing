import { memo } from "react";

const Home = () => {
     return (
          <div className="row">
               <div className="text-center pt-5 pb-5">
                    <span className="mau_vang pe-3"><i className="fa fa-trophy fs-3" /></span>
                    <h2 className="d-inline-block">Sản phẩm từ Nhà</h2>
               </div>
               {/* Nav tabs */}
               <ul className="nav tch-category-card-list tch-category-card-list--spacing d-flex justify-content-md-center flex-xl-wrap flex-lg-wrap" id="myTab" role="tablist">
                    <li className="nav-item text-muted" role="presentation">
                         <a className="nav-link nav-link-category " id="a-tab" data-bs-toggle="tab" data-bs-target="#a" role="tab" aria-controls="a" aria-selected>
                              <div className="tch-category-card d-flex flex-column">
                                   <div className="d-flex justify-content-center align-items-center tch-category-card__image tch-category-card--circle">
                                        <img className="rounded-circle" src alt="" />
                                   </div>
                                   <div className="tch-category-card__content">
                                        <h5 className="tch-category-card__title text-center mb-0">
                                        </h5>
                                   </div>
                              </div>
                         </a>
                    </li>
               </ul>
               {/* Tab panes */}
               <div className="tab-content pt-5">
                    <div className="tab-pane " id="a" role="tabpanel" aria-labelledby="a-tab">
                         <div className="row">
                              <div className="col-xl-2 mb-5">
                                   <div className="card mb-3 shadow border-0 rounded-4">
                                        <a href="?action=product&act=product_detail&id=" title>
                                             <img src className="card-img-top p-2 rounded-4" alt="..." />
                                        </a>
                                        <div className="card-body">
                                             <a href="?action=product&act=product_detail&id=" title className="text-decoration-none text-black">
                                                  <h6 className="card-subtitle mb-2 hover_vang" style={{ height: '48px' }}>
                                                  </h6>
                                             </a>
                                             <span className="card-text text-muted">
                                             </span>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     );
}



export default memo(Home)