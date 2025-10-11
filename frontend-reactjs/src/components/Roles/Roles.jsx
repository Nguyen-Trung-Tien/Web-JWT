import { useState } from "react";
import _ from "lodash";
import "./Roles.scss";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { handleCreateRole } from "../../services/roleService";

const Roles = () => {
  const dataChildDefault = {
    url: "",
    description: "",
    isUrlValid: true,
  };
  const [listChild, setListChild] = useState({
    child: dataChildDefault,
  });

  const handlerOnChangeInput = (name, value, key) => {
    let _listChild = _.cloneDeep(listChild);
    _listChild[key][name] = value;
    if (value && name === "url") {
      _listChild[key]["isUrlValid"] = true;
    }
    setListChild(_listChild);
  };

  const handleAddNewInput = () => {
    let _listChild = _.cloneDeep(listChild);
    _listChild[`child-${uuidv4()}`] = dataChildDefault;
    setListChild(_listChild);
  };

  const handleDeleteInput = (key) => {
    let _listChild = _.cloneDeep(listChild);
    delete _listChild[key];
    setListChild(_listChild);
  };

  const buildDataToPersist = () => {
    let _listChild = _.cloneDeep(listChild);
    let result = [];
    Object.entries(_listChild).map(([key, child], index) => {
      result.push({ url: child.url, description: child.description });
    });
    return result;
  };

  const handleSave = async () => {
    let invalidObj = Object.entries(listChild).find(([key, child], index) => {
      return child & !child.url;
    });
    if (!invalidObj) {
      let data = buildDataToPersist();
      let res = await handleCreateRole(data);
      if (res && res.EC === 0) {
        toast.success(res.EM);
      }
    } else {
      toast.error("Input URL must not be empty...");
      let _listChild = _.cloneDeep(listChild);
      const key = invalidObj[0];
      _listChild[key]["isUrlValid"] = false;
      setListChild(_listChild);
    }
  };
  return (
    <div className="role-container">
      <div className="container">
        <div className="title-role mt-3">
          <h4>Add a new roles...</h4>
          <div className="role-parent">
            {Object.entries(listChild).map(([key, child], index) => {
              return (
                <div className="row row-child" key={`child-${key}`}>
                  <div className={`col-5 form-group ${key}`}>
                    <label>URL:</label>
                    <input
                      type="text"
                      className={
                        child.isUrlValid
                          ? "form-control"
                          : "is-invalid form-control"
                      }
                      value={child.url}
                      onChange={(event) =>
                        handlerOnChangeInput("url", event.target.value, key)
                      }
                    />
                  </div>
                  <div className="col-5 form-group">
                    <label>Description</label>
                    <input
                      type="text"
                      className="form-control"
                      value={child.description}
                      onChange={(event) =>
                        handlerOnChangeInput(
                          "description",
                          event.target.value,
                          key
                        )
                      }
                    />
                  </div>
                  <div className="col-2 mt-4 action">
                    <i
                      title="Add new"
                      className="fa-solid fa-circle-plus add"
                      onClick={() => handleAddNewInput()}
                    ></i>
                    {index >= 1 && (
                      <i
                        title="Delete"
                        className="fa-solid fa-trash-can trash"
                        onClick={() => handleDeleteInput(key)}
                      ></i>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="btn btn-warning mt-3" onClick={() => handleSave()}>
            Save
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roles;
