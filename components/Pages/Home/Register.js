"use client";

import React from "react";

import { useState } from "react";

import {toastError, toastSuccess} from "../../../libs/Notifications"
import { signIn, getSession } from "next-auth/react";

import Input from "../../Forms/Inputs/Default";
import Button from "../../Forms/Buttons/Default";
import { redirect,  useRouter } from "next/navigation";
import Link from "next/link";

const namesAndIds = [
  { name: "Employee", _id: 0 },
  { name: "Boss", _id: 1 },
];

const Register =  ({session}) => {
  const router = useRouter();

  
  
  const [inputs, setInputs] = useState({
    // name: "",
    email: "",
    fullName: "",
    phoneNumber: "",
    password: "",
    code: "",
  });
  const [dropVal, setDropVal] = useState(namesAndIds[1]);
  const dropHandler = (value) => {
    setDropVal({ name: value.name, _id: value._id });
  };
  const [isFound, setIsFound] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  if(session)  return router.push("/")


  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (errorMessages.length > 0) return;
    //POST form values
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...inputs, ...dropVal }),
    });

    const data = await res.json();
    
    setLoading(false);

    if (data.message) {
      
      await signIn("credentials", {
        redirect: false,
        email: inputs.email,
        password: inputs.password,
      });
      router.refresh()

      toastSuccess(data.message)

    }
    //Await for data for any desirable next steps
    if (data[0]) {
      toastError(data[0]);
    }
  
  };

  const inputHandler = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div className="p-10 bg-white rounded-md shadow-2xl">
      <div className="mb-4 text-5xl font-bold text-blue">Регистрация</div>
      {/* <ColorInput
      labelName="Име"
      name="name"
      type="text"
      isBtn={false}
      state={isFound ? "" : "wrong"}
      input={loginInputs.name}
      setInput={inputsHandler}
    /> */}
      <div className="flex flex-col mt-10 gap-y-5">
        {/* <Input
          name="role"
          type="dropdown"
          label="."
          onChange={dropHandler}
          listHandler={dropHandler}
          listValue={dropVal || null}
          list={namesAndIds || []}
        /> */}
        <div className="grid items-center gap-5 md:grid-cols-2">
          <Input
            name="fullName"
            placeholder="Ivan Petrov"
            label="Две имена"
            onChange={inputHandler}
            value={inputs.fullName}
          />
          <Input
            name="phoneNumber"
            placeholder="Телефон"
            label="Телефон"
            onChange={inputHandler}
            value={inputs.phoneNumber}
          />
        </div>
        <div className="">
          <Input
            name="email"
            type="email"
            placeholder="example@gmail.com"
            label="И-мейл"
            onChange={inputHandler}
            value={inputs.email}
          />
          <Input
            name="password"
            type="password"
            placeholder="123456"
            label="Парола"
            className="mt-4"
            onChange={inputHandler}
            value={inputs.password}
          />
        </div>
        {dropVal.name == "Employee" && (
          <Input
            name="code"
            placeholder="32xFg2"
            label="Invitation Code"
            onChange={inputHandler}
            value={inputs.code}
          />
        )}

        <Button
          text="Регистрирай ме"
          className="w-full col-span-1 row-start-4 max-lg:mt-5"
          isLoading={isLoading}
          onClick={submitHandler}
        />
      </div>
      <div className="mt-10">
        Вече имате акаунт?
        <Link href="/">
          <span className="pl-1 underline cursor-pointer">Вход</span>
        </Link>
      </div>
    </div>
  );
};

export default Register;


