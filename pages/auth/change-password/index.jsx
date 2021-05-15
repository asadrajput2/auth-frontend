import { useRouter } from "next/router";
import React, { useState } from "react";
import api from "../../../apiProvider";
import useAuthentication from "../../../utils/verifyAuth";

export default function Login() {
  useAuthentication(null, "protected");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const router = useRouter();

  async function handleSubmit() {
    const response = await api("users/changePassword", "POST", {
      oldPassword,
      newPassword,
    });

    if (response?.message === "success") {
      router.push("/auth/login");
    }
  }

  return (
    <>
      <div className="header">Change Password</div>

      <div className="card">
        <input
          placeholder="Old password"
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <input
          placeholder="New password"
          type="text"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button
          className="btn login-button"
          type="submit"
          onClick={handleSubmit}
        >
          Change Password
        </button>
      </div>
    </>
  );
}
