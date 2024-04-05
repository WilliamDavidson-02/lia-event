import { useEffect, useState } from "react";
import styles from "./Finder.module.css";
import Nav from "../../components/Nav/Nav";
import UserList from "../../components/UserList/UserList";
import supabase from "../../config/supabaseConfig";
import useUserContext from "../../hooks/useUserContext";

export default function Finder() {
  const { user } = useUserContext();
  const [companies, setCompanies] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isGettingUsers, setIsGettingUsers] = useState(false);

  const loadLimit = 19;

  useEffect(() => {
    if (!user) return;

    getCompanies(offset);
  }, [user]);

  const getLikedCompanies = async (companies) => {
    if (!user) return;

    const { data, error } = await supabase
      .from("student_like_company")
      .select("company_id")
      .in("company_id", companies)
      .eq("student_id", user.id);

    if (error) {
      console.log("error getting liked companies", error);
      return [];
    }

    return data.map((c) => c.company_id);
  };

  const getCompanies = async (range) => {
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

    // Filter duplicates
    const newData = data.filter((d) => !companies.some((p) => p.id === d.id));

    let newCompanies = [...companies, ...newData];

    const ids = newCompanies.map((c) => c.id);
    const likedCompanies = await getLikedCompanies(ids);

    if (likedCompanies.length) {
      newCompanies = newCompanies.map((c) => {
        return {
          ...c,
          isLiked: likedCompanies.includes(c.id),
        };
      });
    }

    setCompanies(newCompanies);
  };

  const handleOffset = () => {
    setOffset((prev) => {
      const newOffset = prev + loadLimit + 1;

      getCompanies(newOffset);

      return newOffset;
    });
  };

  return (
    <main className={styles.container}>
      <Nav />
      <div>Filter</div>
      <UserList
        setCompanies={setCompanies}
        handleOffset={handleOffset}
        companies={companies}
      />
    </main>
  );
}
