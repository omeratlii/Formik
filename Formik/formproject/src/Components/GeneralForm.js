import React from "react";
import { useFormik } from "formik";
import { basicSchema } from "../schemas";
import { Link } from "react-router-dom";

const onSubmit = async (values, actions) => {
  // butona tıkladıktan sonra 1 saniyeliğine disabled oluyor. Yani saniyede 1 defa butona tıklamasına izin veriyoruz.
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

  // submit olduktan sonra formu temizledik.
  actions.resetForm();
};

// isSubmitting: butona basıldığında işlem bitene kadar bir daha basılmaması için kullandık.
function GeneralForm() {
  const { values, errors, isSubmitting, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        age: "",
        password: "",
        confirmPassword: "",
      },
      // yup ile oluşturduğumuz schema'yı burada initalValues'tan sonra tanımlıyoruz
      validationSchema: basicSchema,
      onSubmit,
    });
  return (
    <form onSubmit={handleSubmit}>
      <div className="inputDiv">
        <label>Email</label>
        <input
          type="email"
          value={values.email}
          onChange={handleChange}
          id="email"
          placeholder="Mail adresinizi giriniz."
          // eğer errorlerin içindeki emailde bir hata varsa input-error classını atayacağız yani label'ın rengini kırmızıya çekeceğiz.
          className={errors.email ? "input-error" : ""}
        />
        {/* burası sadece hata varsa çalışacak, değilini yazmıyoruz. && bu true ise anlamına gelir */}
        {errors.email && <p className="error">{errors.email}</p>} 
      </div>
      <div className="inputDiv">
        <label>Yaş</label>
        <input
          type="number"
          value={values.age}
          onChange={handleChange}
          id="age"
          placeholder="Yaşınızı giriniz."
          className={errors.age ? "input-error" : ""}
        />
        {errors.age && <p className="error">{errors.age}</p>}
      </div>
      <div className="inputDiv">
        <label>Şifre</label>
        <input
          type="password"
          value={values.password}
          onChange={handleChange}
          id="password"
          placeholder="Şifrenizi giriniz."
          className={errors.password ? "input-error" : ""}
        />
        {errors.password && <p className="error">{errors.password}</p>}
      </div>
      <div className="inputDiv">
        <label>Şifre Tekrar</label>
        <input
          type="password"
          value={values.confirmPassword}
          onChange={handleChange}
          id="confirmPassword"
          placeholder="Lütfen şifrenizi tekrar giriniz."
          className={errors.confirmPassword ? "input-error" : ""}
        />
        {errors.confirmPassword && (
          <p className="error">{errors.confirmPassword}</p>
        )}
      </div>
      <button disabled={isSubmitting} type="submit">
        Kaydet
      </button>
      <Link className="formLink" to="/portal">Portal'a Git</Link>
    </form>
  );
}

export default GeneralForm;
