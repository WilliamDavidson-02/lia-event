import { useEffect, useState } from "react";
import styles from "./Finder.module.css";
import Nav from "../../components/Nav/Nav";
import UserList from "../../components/UserList/UserList";
import supabase from "../../config/supabaseConfig";
import useUserContext from "../../hooks/useUserContext";

export default function Finder() {
  const { user } = useUserContext();
  const [users, setUsers] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isGettingUsers, setIsGettingUsers] = useState(false);

  const loadLimit = 19;

  useEffect(() => {
    if (!user) return;

    getUsers(offset);
  }, [user]);

  const getSavedUsers = async (ids) => {
    const { data, error } = await supabase
      .from("saved_users")
      .select("saved_id")
      .in("saved_id", ids)
      .eq("user_id", user.id);

    if (error) {
      console.log("error getting saved users", error);
      return [];
    }

    return data.map((u) => u.saved_id);
  };

  const getUsers = async (range) => {
    if (isGettingUsers) return;

    setIsGettingUsers(true);

    const { data, error } = await supabase
      .from("profile")
      .select("name, avatar, href, id")
      .neq("user_type", user.user_metadata.user_type)
      .range(range, range + loadLimit);

    setIsGettingUsers(false);

    if (error) {
      console.error("Error getting users", error);
      return;
    }

    // Filter duplicates
    const newData = data.filter((d) => !users.some((p) => p.id === d.id));

    let newUsers = [...users, ...newData];

    const ids = newUsers.map((u) => u.id);
    const savedUsers = await getSavedUsers(ids);

    if (savedUsers.length) {
      newUsers = newUsers.map((u) => {
        return {
          ...u,
          isSaved: savedUsers.includes(u.id),
        };
      });
    }

    setUsers(newUsers);
  };

  const handleOffset = () => {
    setOffset((prev) => {
      const newOffset = prev + loadLimit + 1;

      getUsers(newOffset);

      return newOffset;
    });
  };

  return (
    <main className={styles.container}>
      <Nav />
      <div>Filter</div>
      <UserList setUsers={setUsers} handleOffset={handleOffset} users={users} />
    </main>
  );
}
