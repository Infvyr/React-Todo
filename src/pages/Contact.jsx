import { useState } from "react";
import { useForm } from "react-hook-form";

export const Contact = () => {
	const [data, setData] = useState('');
	
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();


  	const onSubmit = data => {
		  console.log(data)
		  setData(data)
	  }
  

  return (
    <div className="container">
      <h1>Contact</h1>
      <div className="map">
        <iframe
          title="sss"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5439.466786180722!2d28.8304434!3d47.025838!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c97c34984111bb%3A0x871343440f2efd79!2sStephen%20the%20Great%20Monument!5e0!3m2!1sen!2s!4v1630927614324!5m2!1sen!2s"
          allowFullScreen={false}
          loading="lazy"
        ></iframe>
        <div className="contact-form-container">
          <h3>React hook form</h3>

		  <code>{data && JSON.stringify(data, null, 2)}</code>

          <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
            <div className="form-group">
              <input
                type="text"
                className={errors?.Name || errors?.Name?.type === 'minLength' ? 'todo-input input-error' : 'todo-input'}
                placeholder="Name"
                {...register("Name", {
                  required: true,
                  minLength: 3,
                  validate: value => value.trim() !== "",
                })}
              />
              {errors?.Name && <span role="alert">Name is required!</span>}
              {errors?.Name?.type === "minLength" && (
                <span role="alert">Mininum name's length is 3 characters!</span>
              )}
            </div>

            <div className="form-group">
              <input
                type="email"
                className={errors?.Name || errors?.Name?.type === 'minLength' ? 'todo-input input-error' : 'todo-input'}
                placeholder="Email"
                {...register("Email", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
              />
              {errors?.Email && <span role="alert">Email is required </span>}
            </div>

            <input 
				type="submit"
				className="submit-button"
				value="Submit"
			/>
          </form>
        </div>
      </div>
    </div>
  );
};
