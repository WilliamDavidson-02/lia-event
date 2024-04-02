import { useEffect, useState } from "react";
import styles from "./Finder.module.css";
import Nav from "../../components/Nav/Nav";
import UserList from "../../components/UserList/UserList";
import supabase from "../../config/supabaseConfig";
import useUserContext from "../../hooks/useUserContext";

export default function Finder() {
  const [users, setUsers] = useState([]);
  const { user } = useUserContext();

  useEffect(() => {
    getUsers();
  }, [user]);

  const getUsers = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("company_profile")
      .select("*, profile(*)")
      .range(0, 9);

    if (error) {
      console.error("Error getting users", error);
      return;
    }

    console.table(data);

    setUsers(data);
  };

  return (
    <main className={styles.container}>
      <Nav />
      <div>Filter</div>
      <UserList users={users} />
    </main>
  );
}
