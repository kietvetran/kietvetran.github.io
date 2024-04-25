import React from "react";
import { useForm } from 'react-hook-form';
import "./Profile.scss";

export default function Profile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => console.log(data)

  return (
    <div className="profile-wrapper">
      <form noValidate className="form-wrapper" onSubmit={handleSubmit(onSubmit)}>
        <div className="input-wrapper">
          <label htmlFor="name" className="input-label">Name</label>
          <div className="input-holder">
            <input
              className="textfield"
              id="name"
              {...register("name", { required: true, maxLength: 30 })}
            />
          </div>
          {errors.name && errors.name.type === "required" && (
            <div className="input-error">This is required</div>
          )}
          {errors.name && errors.name.type === "maxLength" && (
            <div className="input-error">Max length exceeded</div>
          )}
        </div>
        <input type="submit" className="button -primary" />
      </form>
    </div>
  );
}
