import { useEffect } from "react";
import { useState } from "react";
import { handleDeleteRole, handleGetAllRole } from "../../services/roleService";
import { toast } from "react-toastify";
import { forwardRef } from "react";
import { useImperativeHandle } from "react";

const TableRole = forwardRef((props, ref) => {
  const [listRoles, setListRoles] = useState([]);

  useEffect(() => {
    getAllRole();
  }, []);
  useImperativeHandle(ref, () => ({
    fetchListRole() {
      getAllRole();
    },
  }));

  const getAllRole = async () => {
    let data = await handleGetAllRole();
    if (data && data.EC === 0) {
      setListRoles(data.DT);
    }
  };
  const deleteRole = async (role) => {
    let data = await handleDeleteRole(role);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      await getAllRole();
    } else {
      toast.error(data.EM);
    }
  };
  return (
    <div>
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">URL</th>
            <th scope="col">Description</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {listRoles && listRoles.length > 0 ? (
            listRoles.map((item, index) => (
              <tr key={`row-${index}`}>
                <td>{item.id}</td>
                <td>{item.url}</td>
                <td>{item.description}</td>
                <td>
                  <span
                    title="Edit"
                    className="edit"
                    // onClick={() => handleEditUser(item)}
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </span>
                  <span
                    title="Delete"
                    className="delete"
                    onClick={() => deleteRole(item)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                Not found role!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
});

export default TableRole;
