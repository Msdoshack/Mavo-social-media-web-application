import "./update.scss";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserInfor } from "../../config/api";

const country = [
  {
    id: 1,
    country: "Nigeria",
    state: "Lagos",
  },
  { id: 2, country: "Ghana", state: "Accra" },
  { id: 3, country: "South Africa", state: "CapeTown" },
  { id: 4, country: "Kenya" },
  { id: 5, country: "Senegal" },
  { id: 6, country: "Egypt" },
  { id: 7, country: "Cameroon" },
  { id: 8, country: "Malawi" },
];

const Update = ({ setOpenUpdate, user }) => {
  const [text, setText] = useState({
    username: user.username,
    email: user.email,
    surname: user.surname,
    first_name: user.first_name,
    sex: user.sex,
    country: user.country,
    state: user.state,
    city: user.city,
    facebook: user.facebook,
    twitter: user.twitter,
    instagram: user.instagram,
    pinterest: user.pinterest,
    linkedin: user.linkedin,
    bio: user.bio,
  });

  const handleChange = (e) => {
    setText((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
  };

  console.log(text);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newInfo) => updateUserInfor(newInfo),
    onSuccess: () => queryClient.invalidateQueries(["user", user.id]),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // let coverUrl;
    // let profilePicUrl;

    // coverUrl = cover ? await upload(cover) : user.cover_picture;
    // profilePicUrl = profilePic
    //   ? await upload(profilePic)
    //   : user.profile_picture;

    mutation.mutate({
      ...text,
    });
    setOpenUpdate(false);
  };

  if (mutation.isLoading) return "Loading...";

  return (
    <div className="update">
      <button onClick={() => setOpenUpdate(false)}>Close</button>
      <span>Update Profile</span>
      <form className="form">
        <label htmlFor="username">username</label>
        <input
          type="text"
          name="name"
          id="username"
          onChange={handleChange}
          value={user.username}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder=" e.g Example@123.com"
          onChange={handleChange}
          defaultValue={user.email}
        />

        <label htmlFor="surname">Surname</label>
        <input
          type="text"
          name="surname"
          id="surname"
          placeholder=" surname"
          onChange={handleChange}
          defaultValue={user.surname}
        />
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          name="first_name"
          id="firstName"
          placeholder="First Name"
          onChange={handleChange}
          defaultValue={user.first_name}
        />
        <label htmlFor="country">Country</label>
        <select
          name="country"
          id="country"
          defaultValue={user.country}
          onChange={handleChange}
        >
          {country.map((country) => (
            <option value={country.country} key={country.id}>
              {country.country}
            </option>
          ))}
        </select>

        <label htmlFor="state">State</label>
        <select
          name="state"
          id="state"
          defaultValue={user.state}
          onChange={handleChange}
        >
          {country?.map((country) => (
            <option value={country.state} key={country.id}>
              {country.state}
            </option>
          ))}
        </select>

        <label htmlFor="city">City</label>
        <input
          type="text"
          name="city"
          id="city"
          onChange={handleChange}
          defaultValue={user.city}
          placeholder="city"
        />
        <label htmlFor="facebook">facebook handle</label>
        <input
          type="text"
          name="facebook"
          id="facebook"
          onChange={handleChange}
          defaultValue={user.facebook}
          placeholder="e.g www.facebook.com/user"
        />
        <label htmlFor="city">twitter handle</label>
        <input
          type="text"
          name="country"
          id="twitter"
          onChange={handleChange}
          defaultValue={user.twitter}
          placeholder="e.g wwww.twitter.com/user"
        />
        <label htmlFor="instagram">instagram handle</label>
        <input
          type="text"
          name="instagram"
          id="instagram"
          onChange={handleChange}
          defaultValue={user.instagram}
          placeholder="www.instagram.com/user"
        />
        <label htmlFor="pinterest">Pinterest</label>
        <input
          type="text"
          name="pinterest"
          id="pinterest"
          onChange={handleChange}
          defaultValue={user.pinterest}
          placeholder="e.g www.pinterest.com/user"
        />
        <label htmlFor="Linkedin">LinkedIn</label>
        <input
          type="text"
          name="linkedin"
          id="linkedin"
          onChange={handleChange}
          defaultValue={user.linkedin}
          placeholder=" e.g www.linkedin.com/user/"
        />

        <label htmlFor="bio">Bio</label>
        <textarea
          type="text"
          name="bio"
          id="bio"
          placeholder="A short description of yourself"
          onChange={handleChange}
          defaultValue={user.bio}
          maxLength="90"
        />

        <input
          type="submit"
          value="update"
          onClick={handleSubmit}
          style={{
            backgroundColor: "#5271ff",
            color: "white",
            border: "none",
            fontSize: "20px",
          }}
        />
      </form>
    </div>
  );
};

export default Update;
