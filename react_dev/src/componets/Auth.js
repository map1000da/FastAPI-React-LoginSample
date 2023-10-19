import React from "react";
import { Navigate, useLocation } from "react-router-dom";

//tokenをlocalStorageに保存する
export const setToken = (token) => {
  localStorage.setItem("cairocodersToken", token);
};

export const fetchToken = (token) => {
  return localStorage.getItem("cairocodersToken");
};

//トークンが存在する場合は子コンポーネントを表示し，存在しない場合はユーザーをrootパスにリダイレクトする
export function RequireToken({ children }) {
  let auth = fetchToken();
  let location = useLocation(); //現在のURLのロケーションを取得

  if (!auth) {
    //tokenであるauthが存在しない場合
    return <Navigate to="/" state={{ from: location }} />;
  }
  //tokenが存在する場合，子コンポーネントをそのまま帰す
  return children;
}
