import { useEffect, useState } from "react";
import styles from "./Finder.module.css";
import Nav from "../../components/Nav/Nav";
import UserList from "../../components/UserList/UserList";
import supabase from "../../config/supabaseConfig";
import useUserContext from "../../hooks/useUserContext";
import Filter from "../../components/Filter/Filter";

export default function Finder() {
  const { user } = useUserContext();
  const [users, setUsers] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isGettingUsers, setIsGettingUsers] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    wishlist: false,
    keywords: [],
  });

  const loadLimit = 19;

  useEffect(() => {
    if (!user) return;

    filterOptions.wishlist ? getSavedUsers(offset) : getUsers(offset);
  }, [user]);

  const getSavedUsersIds = async (ids) => {
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

  const getUsers = async (range, reset) => {
    if (isGettingUsers) return;

    setIsGettingUsers(true);

    // Default query
    let query = supabase
      .from("profile")
      .select("name, avatar, href, id")
      .neq("user_type", user.user_metadata.user_type)
      .order("name", { ascending: true })
      .range(range, range + loadLimit);

    // Conditionaly add to query
    const { keywords } = filterOptions;

    if (keywords.length > 1) query.overlaps("keywords", keywords);
    if (keywords.length === 1) query.contains("keywords", keywords);

    // Execute query
    const { data, error } = await query;

    setIsGettingUsers(false);

    if (error) {
      console.error("Error getting users", error);
      return;
    }

    let newData = data;

    // Filter duplicates
    if (!reset) {
      newData = data.filter((d) => !users.some((p) => p.id === d.id));
    }

    let newUsers = [...users, ...newData];

    // if reset remove old users from list
    if (reset) newUsers = newData;

    const ids = newUsers.map((u) => u.id);
    const savedUsers = await getSavedUsersIds(ids);

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

  const getSavedUsers = async (range, reset) => {
    if (isGettingUsers) return;

    setIsGettingUsers(true);

    let query = supabase
      .from("saved_users")
      .select("profile(name, avatar, href, id)")
      .eq("user_id", user.id)
      .not("profile", "is", null)
      .order("profile(name)", { ascending: true })
      .range(range, range + loadLimit);

    // Conditionaly add to query
    const { keywords } = filterOptions;

    if (keywords.length > 1) query.overlaps("profile.keywords", keywords);
    if (keywords.length === 1) query.contains("profile.keywords", keywords);

    // Execute query
    const { data, error } = await query;

    setIsGettingUsers(false);

    if (error) {
      console.error("Error getting users", error);
      return;
    }

    if (!data) return;

    let newData = data.map((u) => u.profile);

    // Filter duplicates
    if (!reset) {
      newData = newData.filter((d) => !users.some((p) => p.id === d.id));
    }

    let newUsers = [...users, ...newData];

    // if reset remove old users from list
    if (reset) newUsers = newData;

    newUsers = newUsers.map((u) => {
      u.isSaved = true;

      return u;
    });

    setUsers(newData);
  };

  const handleOffset = () => {
    setOffset((prev) => {
      const newOffset = prev + loadLimit + 1;

      filterOptions.wishlist ? getSavedUsers(newOffset) : getUsers(newOffset);

      return newOffset;
    });
  };

  const resetOffset = (wishlist) => {
    setOffset(0);

    wishlist ? getSavedUsers(0, true) : getUsers(0, true);
  };

  return (
    <main className={styles.container}>
      <Nav />
      <Filter
        filterOptions={filterOptions}
        setFilterOptions={setFilterOptions}
        resetOffset={resetOffset}
      />
      <UserList setUsers={setUsers} handleOffset={handleOffset} users={users} />
    </main>
  );
}
