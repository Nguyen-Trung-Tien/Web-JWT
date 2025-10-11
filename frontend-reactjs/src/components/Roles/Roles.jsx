import { useState } from "react";
import _ from "lodash";
import "./Roles.scss";
import { v4 as uuidv4 } from "uuid";

const Roles = () => {
  const [listChild, setListChild] = useState({
    child: { id: "", url: "", description: "" },
  });

  const handlerOnChangeInput = (name, value, key) => {
    let _listChild = _.cloneDeep(listChild);
    _listChild[key][name] = value;
    setListChild(_listChild);
  };

  const handleAddNewInput = () => {
    let _listChild = _.cloneDeep(listChild);
    _listChild[`child-${uuidv4()}`] = {
      url: "",
      description: "",
    };
    setListChild(_listChild);
  };

  const handleDeleteInput = (key) => {
    let _listChild = _.cloneDeep(listChild);
    delete _listChild[key];
    setListChild(_listChild);
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
                      className="form-control"
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
                      className="fa-solid fa-circle-plus add"
                      onClick={() => handleAddNewInput()}
                    ></i>
                    {index >= 1 && (
                      <i
                        className="fa-solid fa-trash-can trash"
                        onClick={() => handleDeleteInput(key)}
                      ></i>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="btn btn-warning mt-3">Save</div>
        </div>
      </div>
    </div>
  );
};

export default Roles;
