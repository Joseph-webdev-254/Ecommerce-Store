import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import Loader from "../../../Components/Loader";
import { toast } from "react-toastify";

import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useGetUserDetailsQuery,
} from "../../../App/Api/userApiSlice";
import Message from "./Message";

const UserList = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const [editableUserId, seteditableUserId] = useState(null);
  const [editableUserName, seteditableUserName] = useState("");
  const [editableUserEmail, seteditableUserEmail] = useState("");

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl font-semibold  mb-4">Users</h1>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data.message || error.message}{" "}
          </Message>
        ) : (
          <div className=" flex flex-col md:flex-row">
            {/* { Admin menu  } */}

            <table className="w-full md:w-4/5 mx-auto">
              <thead>
                <tr>
                  <th className="px-4  py-2 text-left">ID</th>
                  <th className="px-4  py-2 text-left">NAME</th>
                  <th className="px-4  py-2 text-left">EMAIL</th>
                  <th className="px-4  py-2 text-left">ADMIN</th>
                </tr>
              </thead>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default UserList;
