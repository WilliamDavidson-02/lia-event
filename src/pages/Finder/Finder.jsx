import { useEffect, useState } from "react";
import styles from "./Finder.module.css";
import Nav from "../../components/Nav/Nav";
import UserList from "../../components/UserList/UserList";
import supabase from "../../config/supabaseConfig";

export default function Finder() {
  const [users, setUsers] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isGettingUsers, setIsGettingUsers] = useState(false);

  const loadLimit = 19;

  useEffect(() => {
    getUsers(offset);
  }, []);

  const getUsers = async (range) => {
    if (isGettingUsers) return;

    setIsGettingUsers(true);

    const { data, error } = await supabase
      .from("company_profile")
      .select("*, profile(*)")
      .range(range, range + loadLimit);

    setIsGettingUsers(false);

    if (error) {
      console.error("Error getting users", error);
      return;
    }

    setUsers((prev) => {
      // Filter duplicates
      const newData = data.filter((d) => !prev.some((p) => p.id === d.id));

      return [...prev, ...newData];
    });
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
      <UserList handleOffset={handleOffset} users={users} />
    </main>
  );
}
