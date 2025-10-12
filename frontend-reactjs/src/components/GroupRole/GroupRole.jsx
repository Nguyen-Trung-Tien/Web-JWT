import { useEffect, useState } from "react";
import "./GroupRole.scss";
import { handleGetAllGroup } from "../../services/userService";
import {
  handleAssignRoleToGroup,
  handleGetAllRole,
  handleGetRoleByGroup,
} from "../../services/roleService";
import { toast } from "react-toastify";
import _ from "lodash";

const GroupRole = () => {
  const [userGroups, setUserGroups] = useState([]);
  const [selectGroups, setSelectGroups] = useState("");
  const [listRoles, setListRoles] = useState([]);
  const [assignGroupByRoles, setAssignGroupByRoles] = useState([]);

  useEffect(() => {
    getGroups();
    getAllRole();
  }, []);

  const getAllRole = async () => {
    let data = await handleGetAllRole();
    if (data && data.EC === 0) {
      setListRoles(data.DT);
    }
  };

  const getGroups = async () => {
    let res = await handleGetAllGroup();
    if (res && res.EC === 0) {
      setUserGroups(res.DT);
    } else {
      toast.error(res.EM);
    }
  };

  const handleOnChangeGroup = async (value) => {
    setSelectGroups(value);
    if (value) {
      let data = await handleGetRoleByGroup(value);
      let result = builtDataRoleByGroup(data.DT.Roles, listRoles);
      setAssignGroupByRoles(result);
    }
  };

  const builtDataRoleByGroup = (groupRole, allRole) => {
    let result = [];
    if (allRole && allRole.length > 0) {
      allRole.map((role) => {
        let obj = {};
        obj.url = role.url;
        obj.id = role.id;
        obj.description = role.description;
        obj.isAssigned = false;
        if (groupRole && groupRole.length > 0) {
          obj.isAssigned = groupRole.some((item) => item.url === obj.url);
        }
        result.push(obj);
      });
    }
    return result;
  };

  const handleSelectRole = (value) => {
    const _assignGroupByRoles = _.cloneDeep(assignGroupByRoles);
    let foundIndex = _assignGroupByRoles.findIndex(
      (item) => +item.id === +value
    );

    if (foundIndex > -1) {
      _assignGroupByRoles[foundIndex].isAssigned =
        !_assignGroupByRoles[foundIndex].isAssigned;
    }
    setAssignGroupByRoles(_assignGroupByRoles);
  };

  const buildDataToSave = () => {
    let result = {};
    const _assignGroupByRoles = _.cloneDeep(assignGroupByRoles);
    result.groupId = selectGroups;
    let groupRoleFilter = _assignGroupByRoles.filter(
      (item) => item.isAssigned === true
    );
    let finalGroupRole = groupRoleFilter.map((item) => {
      let data = { groupId: +selectGroups, roleId: +item.id };
      return data;
    });
    result.groupRole = finalGroupRole;
    return result;
  };

  const AssignRoleToGroupSave = async () => {
    let data = buildDataToSave();
    let res = await handleAssignRoleToGroup(data);
    if (res && +res.EC === 0) {
      toast.success(res.EM);
    } else {
      toast.error(res.EM);
    }
  };
  return (
    <>
      <div className="group-role-container">
        <div className="container">
          <div className="container mt-3">
            <h4 className="mt-3">Group Roles</h4>
            <div className="assign-group-role">
              <div className="col-12 col-sm-6 form-group">
                <label>
                  Select Group: (<span className="red">*</span>)
                </label>
                <select
                  className={"form-select"}
                  onChange={(event) => handleOnChangeGroup(event.target.value)}
                >
                  <option value="">Please select your group</option>
                  {userGroups &&
                    userGroups.length > 0 &&
                    userGroups.map((item, index) => {
                      return (
                        <option key={`group-${index}`} value={item.id}>
                          {item.name}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
            <hr />
            {selectGroups && selectGroups.length > 0 && (
              <div className="roles">
                <h5>Assign Roles</h5>
                {assignGroupByRoles &&
                  assignGroupByRoles.length > 0 &&
                  assignGroupByRoles.map((item, index) => {
                    return (
                      <div className="form-check" key={`list-role-${index}`}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={item.id}
                          id={`list-role-${index}`}
                          checked={item.isAssigned}
                          onChange={(event) =>
                            handleSelectRole(event.target.value)
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`list-role-${index}`}
                        >
                          {item.url}
                        </label>
                      </div>
                    );
                  })}
              </div>
            )}
            <div className="mt-3">
              <button
                className="btn btn-warning"
                onClick={() => AssignRoleToGroupSave()}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GroupRole;
