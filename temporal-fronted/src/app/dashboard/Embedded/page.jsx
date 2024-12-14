"use client";
import { FaXTwitter } from "react-icons/fa6";
import { useState, useEffect } from "react";
import TablaX from "@/app/components/table/TableX";

const apiUrl = process.env.NEXT_PUBLIC_API;
const url = `${apiUrl}/api/twitter`;

const Page = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState([]);
  const [postToken, setPostToken] = useState("");
  const [postName, setPostName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Network response was not ok");
        const postData = await response.json();
        setPosts(postData.data || []);
        console.log("Existing publications");
        console.log(postData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const onSave = async () => {
    if (!postName || !postToken) {
      setAlertMessage(["Error", "Both post name and token are required."]);
      setShowAlert(true);
      return;
    }
    console.log("Token:", postToken);
    console.log("Name:", postName);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre: postName, token: postToken }),
      });
      if (!response.ok) {
        const errorData = await response.json(); // Captura el error del servidor
        console.error("Error details: ", errorData);
        setAlertMessage([
          "Error",
          `Error saving project: ${errorData.message || "Undefined"}`,
        ]);
        setShowAlert(true);
        return;
      }
      const newPost = await response.json();
      setPosts((prevPosts) => [...prevPosts, newPost.data]);
    } catch (error) {
      console.error("Error in request: ", error);
      setAlertMessage([
        "Error",
        `There was a problem with the request: ${error.message}`,
      ]);
      setShowAlert(true);
    }
  };

  const handleDelete = async (post) => {
    try {
      const response = await fetch(`${url}/${post.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setPosts((prevPosts) => prevPosts.filter((p) => p.id !== post.id));
      } else {
        setAlertMessage(["Error", "Error deleting project"]);
        setShowAlert(true);
      }
    } catch (error) {
      console.error("Error al eliminar el proyecto:", error);
      setAlertMessage(["Error", "There was a problem deleting the project"]);
      setShowAlert(true);
    }
  };

  const handleEdit = (post) => {
    console.log("Editando", post);
  };

  return (
    <div className="grid grid-cols-1 justify-center w-full">
      <div className="flex justify-center items-center gap-2 pt-12 pb-8">
        <h1 className="text-3xl font-light">Embedded Post of</h1>
        <FaXTwitter size={27} />
      </div>
      <div className="flex flex-col justify-center items-center h-52 mx-2 md:mx-28 xl:mx-72 px-28">
        <div className="flex flex-col w-full justify-center items-center gap-3 text-lg">
          <input
            type="text"
            placeholder="ID Post"
            value={postToken}
            onChange={(e) => setPostToken(e.target.value)}
            className="mt-1 bg-background2 border-b-2 placeholder-gray-500 block min-h-8 w-full p-2 shadow-sm rounded-sm focus:ring-0 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Name Post"
            value={postName}
            onChange={(e) => setPostName(e.target.value)}
            className="mt-1 bg-background2 border-b-2 placeholder-gray-500 block min-h-8 w-full p-2 shadow-sm rounded-sm focus:ring-0 focus:outline-none"
          />
          <div className="flex justify-end w-full pt-2">
            <div
              className="flex bg-primaryDark hover:bg-primary p-2 rounded-full w-24 justify-center duration-300 cursor-pointer"
              onClick={onSave}
            >
              <p className="text-lg">Add</p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-8">
        <TablaX
          posts={posts}
          handleDelete={handleDelete}
          handleEditClick={handleEdit}
        />
      </div>
    </div>
  );
};

export default Page;
