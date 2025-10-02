import { useEffect, useState } from "react";
import { fetchAllUser, handlerDeleteUser } from "../../services/userService";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import ModalDelete from "./ModalDelete";

const User = () => {
  const [listUsers, setListUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(3);
  const [totalPage, setTotalPage] = useState(0);
  const [isShowModalDelete, setShowModalDelete] = useState(false);
  const [dataModal, setDataModal] = useState({});

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const fetchUsers = async () => {
    let res = await fetchAllUser(currentPage, currentLimit);
    if (res && res.data && res.data.EC === 0) {
      setTotalPage(res.data.DT.totalPage);
      setListUsers(res.data.DT.users);
    }
  };

  const handlePageClick = async (event) => {
    setCurrentPage(+event.selected + 1);
  };

  const handleDeleteUser = (user) => {
    setDataModal(user);
    setShowModalDelete(true);
  };

  const handleClose = () => {
    setShowModalDelete(false);
    setDataModal({});
  };

  const handleConfirmUser = async () => {
    let res = await handlerDeleteUser(dataModal);
    if (res && res.data && res.data.EC === 0) {
      toast.success(res.data.EM);
      setShowModalDelete(false);
      fetchUsers();
    } else {
      toast.error(res.data.EM);
    }
  };

  return (
    <>
      <div className="container">
        <div className="manage-user-container">
          <div className="user-header">
            <div className="title">
              <h3 className="text-center mt-2">User Table</h3>
            </div>
            <div className="action">
              <button className="btn btn-success">Refresh</button>
              <button className="btn btn-primary">Add new user</button>
            </div>
          </div>

          <div className="user-body">
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">ID</th>
                  <th scope="col">Email</th>
                  <th scope="col">User name</th>
                  <th scope="col">Phone number</th>
                  <th scope="col">Sex</th>
                  <th scope="col">Group</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {listUsers && listUsers.length > 0 ? (
                  listUsers.map((item, index) => (
                    <tr key={`row-${index}`}>
                      <td>{index + 1}</td>
                      <td>{item.id}</td>
                      <td>{item.email}</td>
                      <td>{item.userName}</td>
                      <td>{item.phoneNumber}</td>
                      <td>{item.sex}</td>
                      <td>{item.Group ? item.Group.name : ""}</td>
                      <td>
                        <button className="btn btn-warning mx-3">Edit</button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDeleteUser(item)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center" }}>
                      Not found user!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {totalPage > 0 && (
            <div className="user-footer">
              <ReactPaginate
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={totalPage}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
              />
            </div>
          )}
        </div>
      </div>
      <ModalDelete
        show={isShowModalDelete}
        handleClose={handleClose}
        handleConfirmUser={handleConfirmUser}
        dataModal={dataModal}
      />
    </>
  );
};

export default User;
