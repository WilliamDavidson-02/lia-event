import { useEffect, useState } from "react";
import styles from "./Finder.module.css";
import Nav from "../../components/Nav/Nav";
import UserList from "../../components/UserList/UserList";
import supabase from "../../config/supabaseConfig";
import useUserContext from "../../hooks/useUserContext";
import Filter from "../../components/Filter/Filter";
import { useDebounce } from "@uidotdev/usehooks";

export default function Finder() {
  const { user } = useUserContext();
  const [users, setUsers] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isGettingUsers, setIsGettingUsers] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    wishlist: false,
    keywords: [],
    search: "",
  });
  const searchDebounce = useDebounce(filterOptions.search, 300);

  const loadLimit = 19;

  useEffect(() => {
    if (!user) return;

    filterOptions.wishlist ? getSavedUsers(0, true) : getUsers(0, true);
  }, [user, searchDebounce]);

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

  const filterUsersDuplicates = (data, users) => {
    return data.filter((d) => !users.some((p) => p.id === d.id));
  };

  const setUsersIsSaved = (users, savedUsers) => {
    return users.map((u) => ({ ...u, isSaved: savedUsers.includes(u.id) }));
  };

  const getNewUsersArray = (reset, users, data) => {
    if (reset) return data;

    return [...users, ...data];
  };

  const setFilterOptionParams = (query, referencedTable) => {
    const { keywords, search } = filterOptions;

    if (keywords.length > 1) {
      query.overlaps(
        referencedTable ? `${referencedTable}.keywords` : "keywords",
        keywords
      );
    } else if (keywords.length === 1) {
      query.contains(
        referencedTable ? `${referencedTable}.keywords` : "keywords",
        keywords
      );
    }

    if (search.length > 0) {
      query.ilike(
        referencedTable ? `${referencedTable}.name` : "name",
        `%${search}%`
      );
    }

    return query;
  };

  const sortUsersList = (users) => {
    const sorted = users.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();

      return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
    });

    return sorted;
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
    query = setFilterOptionParams(query);

    // Execute query
    const { data, error } = await query;

    setIsGettingUsers(false);

    if (error) {
      console.error("Error getting users", error);
      return;
    }

    if (!data) return;

    let newData = data;

    if (!reset) newData = filterUsersDuplicates(newData, users);

    let newUsers = getNewUsersArray(reset, users, newData);

    const savedUsers = await getSavedUsersIds(newUsers.map((u) => u.id));

    if (savedUsers.length) newUsers = setUsersIsSaved(newUsers, savedUsers);

    // Sort by the already existing users on the list and the new users
    newUsers = sortUsersList(newUsers);

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
    query = setFilterOptionParams(query, "profile");

    // Execute query
    const { data, error } = await query;

    setIsGettingUsers(false);

    if (error) {
      console.error("Error getting users", error);
      return;
    }

    if (!data) return;

    let newData = data.map((u) => u.profile);

    if (!reset) newData = filterUsersDuplicates(newData, users);

    let newUsers = getNewUsersArray(reset, users, newData);

    newUsers = setUsersIsSaved(
      newUsers,
      newUsers.map((u) => u.id)
    );

    // Sort by the already existing users on the list and the new users
    newUsers = sortUsersList(newUsers);

    setUsers(newUsers);
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
      <UserList
        setUsers={setUsers}
        handleOffset={handleOffset}
        users={users}
        filterOptions={filterOptions}
      />
    </main>
  );
}
