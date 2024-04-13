import { useEffect, useState } from "react";
import styles from "./Finder.module.css";
import UserList from "../../components/UserList/UserList";
import supabase from "../../config/supabaseConfig";
import useUserContext from "../../hooks/useUserContext";
import Filter from "../../components/Filter/Filter";
import { useDebounce } from "@uidotdev/usehooks";

const initFilterOptions = {
  wishlist: false,
  keywords: [],
  search: "",
};

export default function Finder() {
  const { user } = useUserContext();
  const [users, setUsers] = useState([]);
  const [isGettingUsers, setIsGettingUsers] = useState(false);
  const [filterOptions, setFilterOptions] = useState(initFilterOptions);
  const [showMatches, setShowMatches] = useState([]);
  const [matchAll, setMatchAll] = useState(false);

  const searchDebounce = useDebounce(filterOptions.search, 300);

  useEffect(() => {
    if (!user) return;

    filterOptions.wishlist ? getSavedUsers() : getUsers();
  }, [user, searchDebounce]);

  const getSavedUsersIds = async (ids) => {
    const { data, error } = await supabase
      .from("saved_users")
      .select("saved_id")
      .in("saved_id", ids)
      .eq("user_id", user.id);

    if (error) return [];

    return data.map((u) => u.saved_id);
  };

  const setUsersIsSaved = (users, savedUsers) => {
    return users.map((u) => ({ ...u, isSaved: savedUsers.includes(u.id) }));
  };

  const setFilterOptionParams = (query, referencedTable) => {
    const { keywords, search } = filterOptions;

    const getColumnName = (col) => {
      return referencedTable ? `${referencedTable}.${col}` : col;
    };

    if (keywords.length > 1) {
      query.overlaps(getColumnName("keywords"), keywords);
    } else if (keywords.length === 1) {
      query.contains(getColumnName("keywords"), keywords);
    }

    if (search.length > 0) {
      query.ilike(getColumnName("name")`%${search}%`);
    }

    return query;
  };

  const calcMatchMe = (user, profiles) => {
    /**
     * Calculate matches relative to to students keywords.
     * Due to student only able to select there respective keywords for there program.
     */

    return profiles.map((u) => {
      const { user_type, keywords } = user.user_metadata;

      const student = user_type === "student" ? keywords : u.keywords;
      const company = user_type !== "student" ? keywords : u.keywords;

      const matches = company.reduce((acc, cur) => {
        if (student.includes(cur)) acc += 1;

        return acc;
      }, 0);

      const rating = Math.ceil(
        Math.floor((matches / student.length) * 100) / 20
      );

      return { ...u, rating };
    });
  };

  const sortByMatchRating = (users) => {
    const sorted = users.sort((a, b) => b.rating - a.rating);

    setShowMatches(sorted.map((u) => u.id));
    return sorted;
  };

  const getUsers = async () => {
    if (isGettingUsers) return;

    setIsGettingUsers(true);

    // Default query
    let query = supabase
      .from("profile")
      .select("name, avatar, href, id, keywords")
      .neq("user_type", user.user_metadata.user_type)
      .order("name", { ascending: true });

    // Conditionaly add to query
    query = setFilterOptionParams(query);

    // Execute query
    const { data, error } = await query;

    setIsGettingUsers(false);

    if (error || !data) return;

    let newUsers = data;

    const savedUsers = await getSavedUsersIds(newUsers.map((u) => u.id));

    if (savedUsers.length) {
      newUsers = setUsersIsSaved(newUsers, savedUsers);
    }

    newUsers = calcMatchMe(user, newUsers);

    if (matchAll) {
      newUsers = sortByMatchRating(newUsers);
    }

    setUsers(newUsers);
  };

  const getSavedUsers = async () => {
    if (isGettingUsers) return;

    setIsGettingUsers(true);

    let query = supabase
      .from("saved_users")
      .select("profile(name, avatar, href, id, keywords)")
      .eq("user_id", user.id)
      .not("profile", "is", null)
      .order("profile(name)", { ascending: true });

    // Conditionaly add to query
    query = setFilterOptionParams(query, "profile");

    // Execute query
    const { data, error } = await query;

    setIsGettingUsers(false);

    if (error || !data) return;

    let newUsers = data.map((u) => u.profile);

    newUsers = setUsersIsSaved(
      newUsers,
      newUsers.map((u) => u.id)
    );

    newUsers = calcMatchMe(user, newUsers);

    if (matchAll) {
      newUsers = sortByMatchRating(newUsers);
    }

    setUsers(newUsers);
  };

  const handleShowMatches = (id) => {
    setShowMatches((prev) => {
      if (prev.includes(id)) {
        return prev.filter((p) => p !== id);
      }

      prev = [...prev, id];

      return prev;
    });
  };

  const handleShowAllMatches = () => {
    const show = !matchAll;
    let sorted;

    if (show) {
      sorted = sortByMatchRating(users);
    } else {
      sorted = users.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();

        return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
      });

      setShowMatches([]);
    }

    setUsers(sorted);
    setMatchAll(show);
  };

  return (
    <main className={styles.container}>
      <Filter
        filterOptions={filterOptions}
        setFilterOptions={setFilterOptions}
        getSavedUsers={getSavedUsers}
        getUsers={getUsers}
        handleShowAllMatches={handleShowAllMatches}
      />
      <UserList
        setUsers={setUsers}
        users={users}
        filterOptions={filterOptions}
        handleShowMatches={handleShowMatches}
        showMatches={showMatches}
      />
    </main>
  );
}
