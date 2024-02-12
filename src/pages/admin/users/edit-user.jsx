import { Modal } from "antd";
import axios from "axios";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";

const SeeUser = ({ userData, handleCancel, isModalOpen }) => {
  const userIdAdmin = useSelector((state) => state?.slices?.userIdAdmin);

  //   const { data } = useQuery("admin-user", () => {
  //     return axios.get(`http://localhost:3001/users?id=${userIdAdmin}`);
  //   });

  return (
    <>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

export default SeeUser;
