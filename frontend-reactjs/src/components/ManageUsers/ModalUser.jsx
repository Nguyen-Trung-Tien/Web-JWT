import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./User.scss";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import _ from "lodash";
import {
  handlerCreateUser,
  handlerUpdateUser,
  handleGetAllGroup,
} from "../../services/userService";

const ModalUser = (props) => {
  const { action, dataModalUser } = props;

  const [userGroups, setUserGroups] = useState([]);
  const defaultUserData = {
    email: "",
    password: "",
    username: "",
    phoneNumber: "",
    address: "",
    sex: "",
    group: "",
  };
  const validInputDefault = {
    email: true,
    password: true,
    username: true,
    phoneNumber: true,
    address: true,
    sex: true,
    group: true,
  };
  const [userData, setUserData] = useState(defaultUserData);
  const [validInput, setValidInput] = useState(validInputDefault);

  useEffect(() => {
    getGroups();
  }, []);

  useEffect(() => {
    if (action === "UPDATE") {
      setUserData({
        ...dataModalUser,
        group: dataModalUser.Group ? dataModalUser.Group.id : "",
      });
    }
  }, [dataModalUser]);

  useEffect(() => {
    if (action === "CREATE") {
      if (userGroups && userGroups.length > 0) {
        setUserData({ ...userData, group: userGroups[0].id });
      }
    }
  }, [action]);

  const getGroups = async () => {
    let res = await handleGetAllGroup();
    if (res && res.EC === 0) {
      setUserGroups(res.DT);
      if (res.DT && res.DT.length > 0) {
        let groups = res.DT;
        setUserData({ ...userData, group: groups[0].id });
      }
    } else {
      toast.error(res.EM);
    }
  };

  const handleOnChangeInput = (value, name) => {
    let _userData = _.cloneDeep(userData);
    _userData[name] = value;
    setUserData(_userData);
  };

  const checkValidInputs = () => {
    if (action === "UPDATE") return true;
    setValidInput(validInputDefault);
    let arr = ["email", "phoneNumber", "password", "group", "username"];
    let check = true;
    for (let i = 0; i < arr.length; i++) {
      if (!userData[arr[i]]) {
        let _validInputs = _.cloneDeep(validInputDefault);
        _validInputs[arr[i]] = false;
        setValidInput(_validInputs);
        toast.error(`Empty input ${arr[i]}`);
        check = false;
        break;
      }
    }
    return check;
  };

  const handleConfirmUser = async () => {
    let check = checkValidInputs();
    if (check === true) {
      let res =
        action === "CREATE"
          ? await handlerCreateUser({
              ...userData,
              groupId: userData["group"],
            })
          : await handlerUpdateUser({
              ...userData,
              groupId: userData["group"],
            });

      if (res && res.EC === 0) {
        props.onHide();
        setUserData({
          ...defaultUserData,
          group: userGroups && userGroups.length > 0 ? userGroups[0].id : "",
        });
        toast.success(res.EM);
      }
      if (res && res.EC !== 0) {
        toast.error(res.EM);
        let _validInputs = _.cloneDeep(validInputDefault);
        _validInputs[res.DT] = false;
        setValidInput(_validInputs);
      }
    }
  };

  const handleCloseUserModal = () => {
    props.onHide();
    setUserData(defaultUserData);
    setValidInput(validInputDefault);
  };

  return (
    <>
      <Modal
        size="lg"
        show={props.show}
        className="modal-user"
        onHide={() => handleCloseUserModal()}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-center">
            <span>
              {props.action === "CREATE"
                ? "Create a new user"
                : "Edit a new user"}
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="content-body row">
            <div className="col-12 col-sm-6 form-group">
              <label>
                Email (<span className="red">*</span>)
              </label>
              <input
                disabled={action === "CREATE" ? false : true}
                type="email"
                className={
                  validInput.email ? "form-control" : "is-invalid form-control "
                }
                value={userData.email || ""}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "email")
                }
              />
            </div>

            <div className="col-12 col-sm-6 form-group">
              <label>
                Phone number (<span className="red">*</span>)
              </label>
              <input
                disabled={action === "CREATE" ? false : true}
                type="text"
                className={
                  validInput.phoneNumber
                    ? "form-control"
                    : "is-invalid form-control "
                }
                value={userData.phoneNumber || ""}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "phoneNumber")
                }
              />
            </div>

            <div className="col-12 col-sm-6 form-group">
              <label>User name</label>
              <input
                type="text"
                className={
                  validInput.username
                    ? "form-control"
                    : "is-invalid form-control "
                }
                value={userData.username || ""}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "username")
                }
              />
            </div>

            <div className="col-12 col-sm-6 form-group">
              {action === "CREATE" && (
                <>
                  <label>
                    Password (<span className="red">*</span>)
                  </label>
                  <input
                    type="password"
                    className={
                      validInput.password
                        ? "form-control"
                        : "is-invalid form-control "
                    }
                    value={userData.password || ""}
                    onChange={(event) =>
                      handleOnChangeInput(event.target.value, "password")
                    }
                  />
                </>
              )}
            </div>

            <div className="col-12 col-sm-12 form-group">
              <label>Address</label>
              <input
                type="text"
                className={
                  validInput.address
                    ? "form-control"
                    : "is-invalid form-control"
                }
                value={userData.address || ""}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "address")
                }
              />
            </div>

            <div className="col-12 col-sm-6 form-group">
              <label>Sex</label>
              <select
                className={
                  validInput.sex ? "form-select" : "is-invalid form-select"
                }
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "sex")
                }
                value={userData.sex || ""}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="col-12 col-sm-6 form-group">
              <label>
                Group (<span className="red">*</span>)
              </label>
              <select
                className={
                  validInput.group ? "form-select" : "is-invalid form-select "
                }
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "group")
                }
                value={userData.group || ""}
              >
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleCloseUserModal()}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleConfirmUser()}>
            {action === "CREATE" ? "Save" : "Update"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUser;
